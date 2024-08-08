import React, {useState} from 'react';
import './ServicePage.css';
import Banner from '../../component/ui/Banner'
import Modal from '../../component/form/Enquery'
import { Link } from 'react-router-dom';

const AuditService = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const taxLogo = '../../assets/services/tax.jpg';
  return (
    <>
        <Banner
        imageUrl={taxLogo}
        breadcrumb={`Home > Audit Services`}
        headline='Audit Services'
        />
        <section className='services'>
        <h2>Audit Services</h2>
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
            <Link to={'/services/auditServices/statu'} className='service-item'>
              <h3>Statutory audit</h3>
              <p>Ensuring compliance with all statutory requirements for businesses.</p>
            </Link>
            <Link to={'/services/auditServices/taxaudit'} className='service-item'>
              <h3>Tax Audit</h3>
              <p>Thorough tax audit services to ensure compliance and identify opportunities.</p>
            </Link>
            <Link to={'/services/auditServices/complience'} className='service-item'>
              <h3>Complience Audit</h3>
              <p>Comprehensive assistance in meeting all regulatory compliance requirements.</p>
            </Link>
            <Link to={'/services/auditServices/internal'} className='service-item'>
              <h3>Internal Audit</h3>
              <p>Detailed internal audit services to improve operational efficiency and control.</p>
            </Link>
        </div>
        {isModalOpen && <Modal closeModal={() => setModalOpen(false)} />}{' '}
      </section>
    </>
  )
}

export default AuditService