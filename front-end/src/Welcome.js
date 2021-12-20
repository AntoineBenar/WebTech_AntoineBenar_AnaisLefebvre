// Layout
import { Grid, Typography } from '@mui/material';
import { ReactComponent as ChannelIcon } from './icons/channel.svg';
import { ReactComponent as FriendsIcon } from './icons/friends.svg';
import { ReactComponent as SettingsIcon } from './icons/settings.svg';
import Popup from 'reactjs-popup';
import { Formik, Form, Field, ErrorMessage } from "formik";
import 'reactjs-popup/dist/index.css';
/** @jsxImportSource @emotion/react */
import {useContext, useRef, useState, useEffect} from 'react';
import axios from 'axios';
// Local
import Context from './Context'
import { useNavigate, useParams } from 'react-router-dom'
//import { channels } from '../../back-end/lib/db';

//import "../back-end/lib/db.js" Seems i can't import back end that easily, i have to use exports from b-e

const styles = {
  root: {
    height: '100%',
    flex: '1 1 auto',
    display: 'flex',
  },
  card: {
    textAlign: 'center',
  },
  icon: {
    width: '30%',
    fill: '#fff',
    //border: black,
    //display:block, doesn't work
    //insert border
  }
}

const contentStyle = {
  maxWidth: '600px',
  width: '90%',
};

const ChannelForm = () => (
  <>
    <h1>New channel</h1>
    <Formik

      initialValues={{ name: "", email: "", acceptedTerms: false }}
      validate={(values) => {
        const errors = {};
        if (!values.name) {
          errors.name = "Required";
        }

        if (!values.acceptedTerms) {
          errors.acceptedTerms =
            "You must accept the terms and conditions before you proceed.";
        }

        if (!values.email) {
          errors.email = "Required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = "Invalid email address";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        // post data to server

        //id=Math.floor(Math.random() * 256); once again, db dosn'isn't in /src so it dosn't work properly
        //channels.create();


        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, dirty, handleReset }) => (
        <Form>
          <div>
            <label>
              Channel Name <></>
              <Field type="text" name="name" />
            </label>
            <ErrorMessage name="name" component="span" />
          </div>
          <br/>
          <div>
            <label htmlFor="email">Members email </label>
            <Field type="email" name="email" />
            <ErrorMessage name="email" component="span" />
          </div>
          <br/>
          <div>
            <label>Accept terms</label>
            <Field type="checkbox" name="acceptedTerms" />
            <ErrorMessage name="acceptedTerms" component="span" />
          </div>
          <br/>
          <button
            type="button"
            onClick={handleReset}
            disabled={!dirty || isSubmitting}
          >
            Reset
          </button>
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  </>
);

const CreateChannelPopup = () => (
  <Popup
    trigger={
      <div css={styles.root}>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={5}
      >
        <Grid item xs>
          <div css={styles.card}>
            <ChannelIcon css={styles.icon} />
            <Typography color="textPrimary">
              Create channels
            </Typography>
          </div>
        </Grid>
      </Grid>
    </div>
    }
    modal
    lockScroll={true}
    contentStyle={contentStyle}
    nested
  >
    {close => (
      <div className="modal">
        <button className="close" onClick={close}>
          &times;
        </button>
        <div className="header"></div>
        <div className="content">
          <ChannelForm/>
          WARNING, all changes will directly affect the database
        </div>
        <div className="actions">
          <button
            type="button"
            className="button"
            onClick={() => {
              console.log('modal closed ');
              close();
            }}
          >
            close modal
          </button>
        </div>
      </div>
    )}
  </Popup>
);

const InviteFriendsPopup = () => (
  <Popup
    trigger={
      <div css={styles.root}>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={5}
      >
        <Grid item xs>
          <div css={styles.card}>
            <FriendsIcon css={styles.icon} />
            <Typography color="textPrimary">
              Invite friends
            </Typography>
          </div>
        </Grid>
      </Grid>
    </div>
    }
    modal
    lockScroll={true}
    contentStyle={contentStyle}
    nested
  >
    {close => (
      <div className="modal">
        <button className="close" onClick={close}>
          &times;
        </button>
        <div className="header"> Modal Title </div>
        <div className="content">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, a
          nostrum. Dolorem, repellat quidem ut, minima sint vel eveniet
          quibusdam voluptates delectus doloremque, explicabo tempore dicta
          adipisci fugit amet dignissimos?
          <br />
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur
          sit commodi beatae optio voluptatum sed eius cumque, delectus saepe
          repudiandae explicabo nemo nam libero ad, doloribus, voluptas rem
          alias. Vitae?
        </div>
        <div className="actions">
          <Popup
            trigger={
              <button type="button" className="button">
                Menu Demo
              </button>
            }
            position="top center"
            closeOnDocumentClick
            contentStyle={{ padding: '0px' }}
            nested
            keepTooltipInside
          >
            <div className="popup-menu">
              <div className="menu-item"> Menu item 1</div>
              <div className="menu-item"> Menu item 2</div>
              <div className="menu-item"> Menu item 3</div>
              <Popup
                trigger={<div className="menu-item"> Sup Menu </div>}
                position="right top"
                on="hover"
                closeOnDocumentClick
                mouseLeaveDelay={300}
                mouseEnterDelay={0}
                contentStyle={{ padding: '0px', border: 'none' }}
                arrow={false}
                keepTooltipInside
              >
                <div className="popup-menu">
                  <div className="menu-item"> item 1</div>
                  <div className="menu-item"> item 2</div>
                  <div className="menu-item"> item 3</div>
                </div>
              </Popup>
              <div className="menu-item"> Menu item 4</div>
            </div>
          </Popup>
          <button
            type="button"
            className="button"
            onClick={() => {
              console.log('modal closed ');
              close();
            }}
          >
            close modal
          </button>
        </div>
      </div>
    )}
  </Popup>
);

const SettingsPopup = () => (
  <Popup
    trigger={

      <div css={styles.root}>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={5}
      >
        <Grid item xs>
          <div css={styles.card}>
            <SettingsIcon css={styles.icon} />
            <Typography color="textPrimary">
              Settings
            </Typography>
          </div>
        </Grid>
      </Grid>
    </div>
    }
    modal
    lockScroll={true}
    contentStyle={contentStyle}
    nested
  >
    {close => (
      <div className="modal">
        <button className="close" onClick={close}>
          &times;
        </button>
        <div className="header"> Modal Title </div>
        <div className="content">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, a
          nostrum. Dolorem, repellat quidem ut, minima sint vel eveniet
          quibusdam voluptates delectus doloremque, explicabo tempore dicta
          adipisci fugit amet dignissimos?
          <br />
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur
          sit commodi beatae optio voluptatum sed eius cumque, delectus saepe
          repudiandae explicabo nemo nam libero ad, doloribus, voluptas rem
          alias. Vitae?
        </div>
        <div className="actions">
          <Popup
            trigger={
              <button type="button" className="button">
                Menu Demo
              </button>
            }
            position="top center"
            closeOnDocumentClick
            contentStyle={{ padding: '0px' }}
            nested
            keepTooltipInside
          >
            <div className="popup-menu">
              <div className="menu-item"> Menu item 1</div>
              <div className="menu-item"> Menu item 2</div>
              <div className="menu-item"> Menu item 3</div>
              <Popup
                trigger={<div className="menu-item"> Sup Menu </div>}
                position="right top"
                on="hover"
                closeOnDocumentClick
                mouseLeaveDelay={300}
                mouseEnterDelay={0}
                contentStyle={{ padding: '0px', border: 'none' }}
                arrow={false}
                keepTooltipInside
              >
                <div className="popup-menu">
                  <div className="menu-item"> item 1</div>
                  <div className="menu-item"> item 2</div>
                  <div className="menu-item"> item 3</div>
                </div>
              </Popup>
              <div className="menu-item"> Menu item 4</div>
            </div>
          </Popup>
          <button
            type="button"
            className="button"
            onClick={() => {
              console.log('modal closed ');
              close();
            }}
          >
            close modal
          </button>
        </div>
      </div>
    )}
  </Popup>
);


export default function Welcome() {

/*

  const navigate = useNavigate()
  const { id } = Math.floor(Math.random() * 256);
  //const {ids} = useParams();
  const {channels, oauth} = useContext(Context)
  const channel = channels.find( channel => channel.id === id)
  const listRef = useRef()
  const [scrollDown, setScrollDown] = useState(false)

  useEffect( () => {
   
    const n=0;
    while (ids.includes(id)) {
      id = Math.floor(Math.random() * 256);
      n = n +1;
      if(n==1024){
        navigate('oups');
      }
    }
    const fetch = async () => {
      try{
        
     //   this.post('/channels', async (req, res) => {
      //    const channel = await this.db.channels.create(req.body)
      //    res.status(201).json(channel)
        })


        const {data: messages} = await axios.set(`http://localhost:3001/channels/${id}/messages`, {
          headers: {
            // TODO: secure the request
          }
        })
        if(listRef.current){
          listRef.current.scroll()
        }
      }catch(err){
        navigate('/oups')
      }
    }
    fetch()
  }, [id, oauth, navigate])
  const onScrollDown = (scrollDown) => {
    setScrollDown(scrollDown)
  }
  const onClickScroll = () => {
    listRef.current.scroll()
  }
  // On refresh, context.channel is not yet initialized
  if(!channel){
    return (<div>loading</div>)
  }

  TRIES TO CREATE A NEW CHANNEL (doesn't work yet)
*/
  return (
    
    <div css={styles.root}>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={5}
      >
        <CreateChannelPopup/>
        <InviteFriendsPopup/>
        <SettingsPopup/>
      </Grid>
    </div>
  // <CustomModal/>
  );
}
