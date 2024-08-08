import React, {useState} from 'react';
import './ServicePage.css';
import Banner from '../../component/ui/Banner'
import Modal from '../../component/form/Enquery'
import { Link } from 'react-router-dom';

const TaxServices = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const taxLogo = '../../assets/services/tax.jpg';
  return (
    <>
        <Banner
        imageUrl={taxLogo}
        breadcrumb={`Home > Tax Services`}
        headline='Tax Services'
        />
        <section className='services'>
        <h2>Tax Services</h2>
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
            <Link to={'/services/taxservices/incometax'} className='service-item'>
              <h3>Income Tax</h3>
              <p>Professional assistance in income tax planning, filing, and compliance.</p>
            </Link>
            <Link to={'/services/taxservices/gst'} className='service-item'>
              <h3>Goods and Services Tax</h3>
              <p>Comprehensive GST services including registration, filing, and advisory.</p>
            </Link>
            <Link to={'/services/taxservices/tds'} className='service-item'>
              <h3>Tax Deducted at Source</h3>
              <p>Expert handling of TDS calculations, deductions, and returns.</p>
            </Link>
        </div>
        {isModalOpen && <Modal closeModal={() => setModalOpen(false)} />}{' '}
      </section>
    </>
  )
}

export default TaxServices