
/** @jsxImportSource @emotion/react */
import { useContext } from 'react';
// Layout
import { useTheme } from '@mui/styles';
import { Button, IconButton, Link } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Context from './Context';
import {NavLink} from 'react-router-dom'; // In order to create a navbar
import {ReactComponent as Logo} from '../src/icons/logo_chat.svg'  //import Logo in SVG format
import { border } from '@mui/system';
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
  return (
    <header css={styles.header}>
       <nav>
        <div className='div-header'>

          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={drawerToggle}
            css={styles.menu}
          >
            <MenuIcon />
          </IconButton>
          Header
          {
            oauth ?
              <span>
                {oauth.email}
                <Link onClick={onClickLogout}>logout</Link>
              </span>
            :
              <Button> new user</Button>
          }
              <img
              src={Logo}
              style={{ height: 53, width: 36 }}
              //alt="Chat logo"
            />

          </div>
      </nav>
    </header>
  );
}
