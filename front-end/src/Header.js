
/** @jsxImportSource @emotion/react */
import { useContext } from 'react';
// Layout
import { useTheme } from '@mui/styles';
import { Button, IconButton, Link } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Context from './Context';
import {NavLink} from 'react-router-dom'; // In order to create a navbar
import {ReactComponent as Logo} from '../src/icons/logochat.svg'  //import Logo in SVG format
import {ReactComponent as LogoGit} from '../src/icons/GithubLogo.svg'  //import Git Logo in SVG format
import {ReactComponent as LogoTwitter} from '../src/icons/LogoTwitter.svg'
import { border, borderLeft, borderRight, margin } from '@mui/system';
import './Header.css';



const useStyles = (theme) => ({
  header: {
    padding: theme.spacing(1),
    backgroundColor: 'rgba(255,255,255,.3)',
    flexShrink: 0,
  },
  headerLogIn: {
    backgroundColor: 'red',
  },
  headerLogOut: {
    backgroundColor: 'blue',
  },
  menu: {
    [theme.breakpoints.up('sm')]: {
      //display: 'none !important',     
    },
  }
})

export default function Header({
  drawerToggleListener
}) {
  const styles = useStyles(useTheme())
  const {
    oauth, setOauth,
    drawerVisible, setDrawerVisible
  } = useContext(Context)
  const drawerToggle = (e) => {
    setDrawerVisible(!drawerVisible)
  }
  const onClickLogout = (e) => {
    e.stopPropagation()
    setOauth(null)
  }
  const onClickOups = (e) => {
    window.open("http://127.0.0.1:3000/Oups", "_blank")
  }
  const onClickGit = (e) => {
    window.open("https://github.com/AntoineBenar/AntoineBenar", "_blank")
  }
  const onClickTw = (e) => {
    window.open("https://twitter.com/TopDesTwittos?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor", "_blank") // on n'a pas encore de twitter effectivement =)
  }
  return (
    <header css={styles.header}>
       <nav>
        <div className='div-header'>
          <Logo
           style={{ height: 53, width: 36, borderLeft: 5}} 
           onClick={onClickLogout}
           />
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={drawerToggle}
            css={styles.menu}
          >
            <MenuIcon />
          </IconButton>
          {
            oauth ?
              <span style={{ color : 'black'}}> 
                user logged :   
                {oauth.email}
                <Button onClick={onClickLogout}> logout</Button>
              </span>
            :
              <Button onClick={onClickOups} style={{color: 'black'}} > new user</Button>
          }

          <LogoGit
           style={{ height: 35, width: 25 }} 
           onClick={onClickGit}
           />
          
          <LogoTwitter
           style={{ height: 35, width: 25 }} 
           onClick={onClickTw}
           />

          </div>
      </nav>
    </header>
  );
}
