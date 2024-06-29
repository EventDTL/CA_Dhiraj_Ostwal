import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import { useNavigate } from 'react-router-dom';
import flogo from '../images/footer-logo.png';
import { FaFacebookF, FaLinkedinIn, FaYoutube, FaInstagram, } from 'react-icons/fa';

const Footer = () => {
    const navigate = useNavigate();

    const handleButtonClick = () => {
      navigate('/new-page');
      window.scrollTo(0, 0); 
    };
    return (
        <footer className="ca-footer">
            <div className="footer-container">
                <div className="footer-row">
                    <div className="footer-item fabout">
                        <img src={flogo} className="img-responsive" alt="Lohia Jain Group" />
                        <ul className="ca-list ca-social-link">

                            <li><Link href="https://www.facebook.com/cadhirajostwal" target="_blank"  rel="noopener noreferrer"><FaFacebookF className='icons' /></Link></li>
                            <li><Link href="https://www.linkedin.com/in/event-dtl-191997314/"><FaLinkedinIn className='icons' /></Link></li>
                            <li><Link href="https://www.instagram.com/cadhirajostwal/"><FaInstagram className='icons' /></Link></li>
                            <li><Link href="https://www.youtube.com/@CADhirajOstwal"><FaYoutube className='icons' /></Link></li>

                            {/* <li><a href="mailto:[email&#160;protected]"><i className="fa fa-envelope"></i></a></li> */}
                        </ul>
                    </div>
                    <div className="footer-item quick-link">
                        <h4 className="ca-heading text-uppercase">Quick link</h4>
                        <ul className="ca-list ca-quick-link text-capitalize">
                            <li><Link to="Home" onClick={handleButtonClick}>Home</Link></li>
                            <li><Link to="career" onClick={handleButtonClick}>Career</Link></li>
                            <li><Link to="gallary" onClick={handleButtonClick}>Gallary</Link></li>
                            <li><Link to="contact" onClick={handleButtonClick}>Contact</Link></li>
                            <li><Link to="MainAchieve" onClick={handleButtonClick}>Achievements</Link></li>
                            <li><Link to="profile" onClick={handleButtonClick}>Profile</Link></li>
                            <li><Link to="newsblogs" onClick={handleButtonClick}>News&Blogs</Link></li>
                        </ul>
                    </div>
                    <div className="footer-item office">
                        <h4 className="ca-heading text-uppercase">Office</h4>
                        <ul className="ca-list ca-office">
                            <li><i className="fa fa-map"></i>2nd Floor, Shree Krishna, 7, Opp Kiosk Koffee, Shirole Road, off Fergusson College Road, Pune, Maharashtra 411004</li>
                            <li><i className="fa fa-envelope"></i><Link to="mailto: cadhirajostwal@gmail.com">[email]</Link></li>
                            <li><i className="fa fa-phone"></i><Link to="https://wa.me/+917020045454">+91 7020045454</Link></li>
                            <li><i className="fa fa-mobile"></i>+91 7020045454</li>
                        </ul>
                    </div>
                    <div className="footer-item latest-works">
                        <h4 className="ca-heading text-uppercase">Locate Us</h4>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.1359398956106!2d73.83913731120742!3d18.52275808249856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bff534505583%3A0x49b15410f40cd6e2!2sCA%20Dhiraj%20Ostwal%20%7C%20Chartered%20Accountant%20%7C%20Strategy%20Coach!5e0!3m2!1sen!2sin!4v1718954796268!5m2!1sen!2sin"
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
                    <p className="ca-text">Design by<span className="ca-text-color-yellow-1">EventDTL</span> <span className="ca-text-color-yellow-1">Pune</span>. </p>
                    <p className="ca-text"> All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
