
/** @jsxImportSource @emotion/react */
import {useContext, useEffect} from 'react';
import axios from 'axios';
// Layout
import {Link} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
// Local
import Context from './Context'
import {useNavigate} from 'react-router-dom'

const styles = {
  root: {
    '& a': {
      padding: '.2rem .5rem',
      whiteSpace: 'nowrap', 
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      //backgroundColor :'#ffffff',
    }
  },
  background : {
    //backgroundColor: '#ffffff', //Que pour le "bloc" des channels
  },
}

export default function Channels() {
  const {
    oauth,
    channels, setChannels
  } = useContext(Context)
  const naviate = useNavigate();
  useEffect( () => {
    const fetch = async () => {
      try{
        const {data: channels} = await axios.get('http://localhost:3001/channels', {
          headers: {
            'Authorization': `Bearer ${oauth.access_token}`
          }
        })
        setChannels(channels)
      }catch(err){
        console.error(err)
      }
    }
    fetch()
  }, [oauth, setChannels])
  return (
    <div css={styles.background}>
    <ul css={styles.root}>
      <li css={styles.channel}>
        <li/>
        <br/>
        <Link to="/channels" component={RouterLink}>Menu</Link>
      </li>
      <br/>
      { channels.map( (channel, i) => (
        <li key={i} css={styles.channel}>
          <Link
            href={`/channels/${channel.id}`}
            onClick={ (e) => {
              e.preventDefault()
              naviate(`/channels/${channel.id}`)
            }}
          >
            {channel.name}
            <li/>
          </Link>
          <br/>
        </li>
      ))}
    </ul>
    </div>
  );
}
