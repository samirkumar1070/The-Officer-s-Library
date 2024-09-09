import React from 'react';
import '../styles/footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div>
          <h3>Contact Us</h3>
          <p>Email: samirkumar1070@gmail.com</p>
          <p>Phone: +91 8804178071</p>
        </div>
        <div>
          <h3>Office Address</h3>
          <p>Pantnagar Colony</p>
          <p>Gaya,Bihar,823001</p>
          <p>India</p>
        </div>
        <div>
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="https://www.facebook.com/profile.php?id=100006155320925" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faFacebook} size="2x" />
            </a>
            <a href="https://x.com/Samir43998050" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faTwitter} size="2x" />
            </a>
            <a href="https://www.instagram.com/samirkumar1070/" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} size="2x" />
            </a>
            <a href="https://www.linkedin.com/in/samir-5292ab222/" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faLinkedin} size="2x" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
