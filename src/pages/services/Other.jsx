import React, {useState} from 'react';
import './ServicePage.css';
import Banner from '../../component/ui/Banner'
import Modal from '../../component/form/Enquery'

const Other = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const taxLogo = '../../assets/services/tax.jpg';
  return (
    <>
        <Banner
        imageUrl={taxLogo}
        breadcrumb={`Home > Other`}
        headline='Other'
        />
        <section className='services'>
        <h2>Other</h2>
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
            <div className='service-item'>
              <h3>Co-operative trust</h3>
              <p>Specialized guidance in forming and managing co-operative trusts.</p>
            </div>
        </div>
        {isModalOpen && <Modal closeModal={() => setModalOpen(false)} />}{' '}
      </section>
    </>
  )
}

export default Other