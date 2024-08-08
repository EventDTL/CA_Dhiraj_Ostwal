import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import flogo from '../images/footer-logo.png';
import { FaFacebookF, FaLinkedinIn, FaYoutube, FaInstagram } from 'react-icons/fa';
import { useGetAdminProfile } from '../lib/react-query/queries';

const Footer = () => {
  const { data: adminProfile, isLoading: isLoadingAdminProfile, refetch } = useGetAdminProfile();
  const handleButtonClick = () => {
    window.scrollTo(0, 0); 
  };

  if (isLoadingAdminProfile) {
    return <div>Loading...</div>;
  }

  return (
    <footer className="ca-footer">
      <div className="footer-container">
        <div className="footer-row">
          <div className="footer-item fabout">
            <img src={flogo} className="img-responsive" alt="Lohia Jain Group" />
            <ul className="ca-list ca-social-link">
              <li>
                <Link to={adminProfile?.Facebook || '#'} target="_blank" rel="noopener noreferrer">
                  <FaFacebookF className='icons' />
                </Link>
              </li>
              <li>
                <Link to={adminProfile?.LinkedIn || '#'} target="_blank">
                  <FaLinkedinIn className='icons' />
                </Link>
              </li>
              <li>
                <Link to={adminProfile?.Instagram || '#'} target="_blank">
                  <FaInstagram className='icons' />
                </Link>
              </li>
              <li>
                <Link to={adminProfile?.YouTube || '#'} target="_blank">
                  <FaYoutube className='icons' />
                </Link>
              </li>
            </ul>
          </div>
          <div className="footer-item quick-link">
            <h4 className="ca-heading text-uppercase">Quick link</h4>
            <ul className="ca-list ca-quick-link text-capitalize">
              <li><Link to="/Home" onClick={handleButtonClick}>Home</Link></li>
              <li><Link to="/career" onClick={handleButtonClick}>Career</Link></li>
              <li><Link to="/gallary" onClick={handleButtonClick}>Gallery</Link></li>
              <li><Link to="/contact" onClick={handleButtonClick}>Contact</Link></li>
              <li><Link to="/MainAchieve" onClick={handleButtonClick}>Achievements</Link></li>
              <li><Link to="/profile" onClick={handleButtonClick}>Profile</Link></li>
              <li><Link to="/newsblogs" onClick={handleButtonClick}>News & Blogs</Link></li>
            </ul>
          </div>
          <div className="footer-item office">
            <h4 className="ca-heading text-uppercase">Office</h4>
            <ul className="ca-list ca-office">
              <li>{adminProfile?.Address}</li>
              <li><Link to={`mailto:${adminProfile?.Email}`}>{adminProfile?.Email}</Link></li>
              <li>{adminProfile?.WhatsApp}</li>
            </ul>
          </div>
          <div className="footer-item latest-works">
            <h4 className="ca-heading text-uppercase">Locate Us</h4>
            <iframe
              src={adminProfile?.GoogleMap}
              width="100%"
              height="230px"
              frameBorder="0"
              style={{ border: 0 }}
              allowFullScreen
              title="Lohia Jain Group Location"
            ></iframe>
          </div>
        </div>
      </div>
      <div className="footer-bot">
        <div className="footer-container">
          <p className="ca-text">Design by <span className="ca-text-color-yellow-1">EventDTL</span> <span className="ca-text-color-yellow-1">Team</span>. </p>
          <p className="ca-text">All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
