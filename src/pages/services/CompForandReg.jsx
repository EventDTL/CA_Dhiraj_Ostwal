import React, {useState} from 'react';
import './ServicePage.css';
import Banner from '../../component/ui/Banner'
import Modal from '../../component/form/Enquery'
import { Link } from 'react-router-dom';

const CompForandReg = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const taxLogo = '../../assets/services/tax.jpg';
  return (
    <>
        <Banner
        imageUrl={taxLogo}
        breadcrumb={`Home > Company Formation and Registration`}
        headline='Company Formation and Registration'
        />
        <section className='services'>
        <h2>Company Formation and Registration</h2>
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
            <Link to={'/services/comforReg/comFor'} className='service-item'>
              <h3>Company Formation</h3>
              <p>End-to-end support in incorporating and setting up new companies.</p>
            </Link>
            <Link to={'/services/comforReg/busReg'} className='service-item'>
              <h3>Bussiness Registration</h3>
              <p>Streamlined services for registering various forms of businesses.</p>
            </Link>
            <Link to={'/services/comforReg/shopAct'} className='service-item'>
              <h3>Shop act</h3>
              <p>Assistance in obtaining and maintaining Shop Act licenses.</p>
            </Link>
            <Link to={'/services/comforReg/msme'} className='service-item'>
              <h3>Ministry of Micro, Small & Medium Enterprises</h3>
              <p>Guidance on MSME registration and accessing related benefits.</p>
            </Link>
            <Link to={'/services/comforReg/parReg'} className='service-item'>
              <h3>Partnership Registration</h3>
              <p>Efficient services for registering and formalizing business partnerships.</p>
            </Link>
            <Link to={'/services/comforReg/llp'} className='service-item'>
              <h3>Limited Liability Partnership</h3>
              <p>Specialized support in forming and managing Limited Liability Partnerships.</p>
            </Link>
            <Link to={'/services/comforReg/npc'} className='service-item'>
              <h3>Non-Profit Company</h3>
              <p>Expert assistance in establishing and managing non-profit organizations.</p>
            </Link>
            <Link to={'/services/comforReg/chari'} className='service-item'>
              <h3>Charitable Trust</h3>
              <p>Comprehensive services for setting up and managing charitable trusts.</p>
            </Link>
            <Link to={'/services/comforReg/asso'} className='service-item'>
              <h3>Association</h3>
              <p>Support in forming and registering various types of associations.</p>
            </Link>
        </div>
        {isModalOpen && <Modal closeModal={() => setModalOpen(false)} />}{' '}
      </section>
    </>
  )
}

export default CompForandReg