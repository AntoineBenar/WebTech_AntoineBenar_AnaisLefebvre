
/** @jsxImportSource @emotion/react */
import { NavLink } from 'react-router-dom';
import './Footer.css'

const styles = {
  footer: {
    backgroundColor: 'rgba(255,255,255,.3)',
    flexShrink: 0,
  },
}

export default function Footer() {
  return (
    <footer css={styles.footer} class="site-footer"> 
       <div class="container">
        <div class="row">
          <div class="col-xs-6 col-md-3">
            <ul class="footer-links">
              <nav>
              <a href="http://127.0.0.1:3000/Oups">About Us </a>
              <a href="http://127.0.0.1:3000/Oups">Contact Us </a>
              <a href="http://127.0.0.1:3000/Oups">Contribute </a>
              <a href="http://127.0.0.1:3000/Oups">Privacy Policy </a>
            </nav>
            </ul>
          </div>
        </div>
      </div>
      <div class="container">
          <div class="col-md-8 col-sm-6 col-xs-12">
            <br/>
            <p class="copyright-text">Copyright &copy; 2021 All Rights Reserved by Antoine (dab)
            </p>
          </div>
      </div>
    </footer>
  );
}

