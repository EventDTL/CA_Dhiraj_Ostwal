import React, {useState} from 'react';
import './ServicePage.css';
import Banner from '../../component/ui/Banner'
import Modal from '../../component/form/Enquery'
import { Link } from 'react-router-dom';

const ApeeLiti = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const taxLogo = '../../assets/services/tax.jpg';
  return (
    <>
        <Banner
        imageUrl={taxLogo}
        breadcrumb={`Home > Appeals and Litigations`}
        headline='Appeals and Litigations'
        />
        <section className='services'>
        <h2>Appeals and Litigations</h2>
        <div className='button-container'>
          <a
            href='https://wa.me/7020045454?text=Hi%20there,%20I%27m%20interested%20in%20your%20services.'
            className='button'
            target='_blank'
            rel='noopener noreferrer'
          >
            <img
              width='25'
              height='25'
              src='https://img.icons8.com/color/48/whatsapp--v1.png'
              alt='whatsapp--v1'
            />
            Connect with WhatsApp
          </a>
          <button className='button' onClick={() => setModalOpen(true)}>
            <img
              width='25'
              height='25'
              src='https://img.icons8.com/color/48/tear-off-calendar--v1.png'
              alt='tear-off-calendar--v1'
            />
            Book an Appointment
          </button>
        </div>
        <div className='service-details'>
            <Link to={'/services/drafAgree/apeeals'} className='service-item'>
              <h3>Appeals</h3>
              <p>Expert assistance in filing and managing tax and legal appeals across various forums.</p>
            </Link>
            <Link to={'/services/drafAgree/litiga'} className='service-item'>
              <h3>Litigations</h3>
              <p>Comprehensive support for legal proceedings related to tax and business matters.</p>
            </Link>
            <Link to={'/services/drafAgree/businDisp'} className='service-item'>
              <h3>Business Dispute Resolution</h3>
              <p>Efficient mediation and resolution services for various business conflicts.</p>
            </Link>
            
        </div>
        {isModalOpen && <Modal closeModal={() => setModalOpen(false)} />}{' '}
      </section>
    </>
  )
}

export default ApeeLiti