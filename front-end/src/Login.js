
/** @jsxImportSource @emotion/react */
import { useContext, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import crypto from 'crypto'
import qs from 'qs'
import axios from 'axios'
//import Button from 'react-bootstrap/Button' doesn't work
// Layout
import { useTheme } from '@mui/styles';
import { Link } from '@mui/material';
// Local
import Context from './Context'
import Main from './Main'
import {
  useNavigate
} from "react-router-dom";
import { Button, IconButton } from '@mui/material';
import {ReactComponent as Secured} from '../src/icons/secured.svg'  
import {ReactComponent as ECE} from '../src/icons/ECE.svg'  
import {ReactComponent as Access} from '../src/icons/accessibilite.svg'  

import './Login.css';

const base64URLEncode = (str) => {
  return str.toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

const sha256 = (buffer) => {
  return crypto
    .createHash('sha256')
    .update(buffer)
    .digest()
}

const useStyles = (theme) => ({
  root: {
    flex: '1 1 auto',
    background: '#17034F', //17034F
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& > div': {
      margin: `${theme.spacing(1)}`,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    '& fieldset': {
      border: 'none',
      '& label': {
        marginBottom: theme.spacing(.5),
        display: 'block',
      },
    },
  },
})

const useStylesUs = (theme) => ({
  root2: {
    background: '#ffffff',
    display: 'table',
    width: '100%', 
  },
})


const Redirect = ({
  config,
  codeVerifier,
}) => {
  const styles = useStyles(useTheme())
  const redirect = (e) => {
    e.stopPropagation()
    const code_challenge = base64URLEncode(sha256(codeVerifier))
    const url = [
      `${config.authorization_endpoint}?`,
      `client_id=${config.client_id}&`,
      `scope=${config.scope}&`,
      `response_type=code&`,
      `redirect_uri=${config.redirect_uri}&`,
      `code_challenge=${code_challenge}&`,
      `code_challenge_method=S256`,
    ].join('')
    window.location = url
  }
  return (
     <div css={styles.root}>
     <Button onClick={redirect} color="secondary">Login with OpenID Connect and OAuth2</Button>
    </div>
  )
}

const AboutUs = ({
}) => {
  const styles = useStylesUs(useTheme())
  return(
    <div>
    <div class='Row'>
    <div class="Column"> 
      <Secured style={{ height: 53, width: 36, borderLeft: 5}}/>
      <br/>
      <b>Security</b>
      <br/>
      <div>This Application is totally secured with lastest encrypting technology and Oauth2</div>
    </div>
    
    <div class="Column">
      <Access style={{ height: 53, width: 36, borderLeft: 5}}/>
      <br/>
      <b>UX</b>
      <br/>
      <div>This Application is designed to be the most intuitive and easy-to-use as possible</div>
    </div>

    <div class="Column">
      <ECE style={{ height: 53, width: 77, borderLeft: 5}}/>
      <br/>
      <b>Us</b>
      <br/>
      <div>This application resuts from a student's project, from the ECE engineering school</div>
    </div>
    </div>
    <br/>
    </div>
  )
  }

const Tokens = ({
  oauth
}) => {
  const {setOauth} = useContext(Context)
  const styles = useStyles(useTheme())
  const {id_token} = oauth
  const id_payload = id_token.split('.')[1]
  const {email} = JSON.parse(atob(id_payload))
  const logout = (e) => {
    e.stopPropagation()
    setOauth(null)
  }
  return (
    <div css={styles.root}>
      Welcome {email} <Link onClick={logout} color="secondary">logout</Link>
    </div>
  )
}

const LoadToken = ({
  code,
  codeVerifier,
  config,
  removeCookie,
  setOauth
}) => {
  const styles = useStyles(useTheme())
  const navigate = useNavigate();
  useEffect( () => {
    const fetch = async () => {
      try {
        const {data} = await axios.post(
          config.token_endpoint
        , qs.stringify ({
          grant_type: 'authorization_code',
          client_id: `${config.client_id}`,
          code_verifier: `${codeVerifier}`,
          redirect_uri: `${config.redirect_uri}`,
          code: `${code}`,
        }))
        removeCookie('code_verifier')
        setOauth(data)
        navigate('/')
      }catch (err) {
        console.error(err)
      }
    }
    fetch()
  })
  return (
    <Main></Main>
  )
}

export default function Login({
  onUser
}) {
  const styles = useStyles(useTheme());
  // const location = useLocation();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const {oauth, setOauth} = useContext(Context)
  const config = {
    authorization_endpoint: 'http://127.0.0.1:5556/dex/auth',
    token_endpoint: 'http://127.0.0.1:5556/dex/token',
    client_id: 'webtech-frontend',
    redirect_uri: 'http://127.0.0.1:3000',
    scope: 'openid%20email%20offline_access',
  }
  const params = new URLSearchParams(window.location.search)
  const code = params.get('code')
  // is there a code query parameters in the url 
  if(!code){ // no: we are not being redirected from an oauth server
    if(!oauth){
      const codeVerifier = base64URLEncode(crypto.randomBytes(32))
      console.log('set code_verifier', codeVerifier)
      setCookie('code_verifier', codeVerifier)
      return (
        <><Redirect codeVerifier={codeVerifier} config={config} css={styles.root} />
        <AboutUs codeVerifier={codeVerifier} config={config} /></>
        //WWWWWWWWWWWWWWW ICI MODIFS WWWWWWWWWWWWWWWWWWWWW

      )
    }else{ // yes: user is already logged in, great, is is working
      return (
        <Tokens oauth={oauth} css={styles.root} />
      )
    }
  }else{ // yes: we are coming from an oauth server
    console.log('get code_verifier', cookies.code_verifier)
    return (
      <LoadToken
        code={code}
        codeVerifier={cookies.code_verifier}
        config={config}
        setOauth={setOauth}
        removeCookie={removeCookie} />
    )
  }
}
