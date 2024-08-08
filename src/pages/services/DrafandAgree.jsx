import React, {useState} from 'react';
import './ServicePage.css';
import Banner from '../../component/ui/Banner'
import Modal from '../../component/form/Enquery'
import { Link } from 'react-router-dom';

const DrafandAgree = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const taxLogo = '../../assets/services/tax.jpg';
  return (
    <>
        <Banner
        imageUrl={taxLogo}
        breadcrumb={`Home > Drafting & Agreement`}
        headline='Drafting & Agreement'
        />
        <section className='services'>
        <h2>Drafting & Agreement</h2>
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
            <Link to={'/services/appLiti/draft'} className='service-item'>
              <h3>Drafting</h3>
              <p>Professional drafting services for various legal and business documents.</p>
            </Link>
            <Link to={'/services/appLiti/partnerdeed'} className='service-item'>
              <h3>Partnership Deed</h3>
              <p>Expert drafting of partnership deeds tailored to your business needs.</p>
            </Link>
            <Link to={'/services/appLiti/aoa'} className='service-item'>
              <h3>Article of Association</h3>
              <p>Precise drafting of Articles of Association for company incorporation.</p>
            </Link>
            <Link to={'/services/appLiti/moa'} className='service-item'>
              <h3>Memorandum of Association</h3>
              <p>Memorandum of Association is a legal document that explains why the organization was founded.</p>
            </Link>
            <Link to={'/services/appLiti/shareagree'} className='service-item'>
              <h3>Shareholders Agreement</h3>
              <p>Crafting comprehensive shareholder agreements to protect all parties' interests.</p>
            </Link>
            <Link to={'/services/appLiti/debenagree'} className='service-item'>
              <h3>Debentures Agreement</h3>
              <p>Specialized drafting of debenture agreements for debt instruments.</p>
            </Link>
            <Link to={'/services/appLiti/hire'} className='service-item'>
              <h3>Hire Purchase</h3>
              <p>Expert drafting of hire purchase agreements for asset acquisition.</p>
            </Link>
            <Link to={'/services/appLiti/lease'} className='service-item'>
              <h3>Lease Deed</h3>
              <p>Professional preparation of lease deeds for property transactions.</p>
            </Link>
            <Link to={'/services/appLiti/contagree'} className='service-item'>
              <h3>Contract and Agreement</h3>
              <p>Comprehensive drafting services for various business contracts and agreements.</p>
            </Link>
        </div>
        {isModalOpen && <Modal closeModal={() => setModalOpen(false)} />}{' '}
      </section>
    </>
  )
}

export default DrafandAgree