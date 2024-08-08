import React, {useState} from 'react';
import './ServicePage.css';
import Banner from '../../component/ui/Banner'
import Modal from '../../component/form/Enquery'
import { Link } from 'react-router-dom';

const Advisory = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const taxLogo = '../../assets/services/tax.jpg';
  return (
    <>
        <Banner
        imageUrl={taxLogo}
        breadcrumb={`Home > Advisory Services`}
        headline='Advisory Services'
        />
        <section className='services'>
        <h2>Advisory Services</h2>
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
            <Link to={'/services/advi/loanFund'}  className='service-item'>
              <h3>Loans and Funding for Business</h3>
              <p>We secure optimal financing solutions tailored to your business growth needs.</p>
            </Link>
            <Link to={'/services/advi/prop'} className='service-item'>
              <h3>Property advisory</h3>
              <p>Expert guidance on real estate investments, valuations, and tax implications.</p>
            </Link>
            <Link to={'/services/advi/invest'} className='service-item'>
              <h3>Investment Advisory</h3>
              <p>Personalized investment strategies to maximize returns while managing risk.</p>
            </Link>
            <Link to={'/services/advi/fdadv'} className='service-item'>
              <h3>Fixed Deposite Advisory</h3>
              <p>Navigate the FD landscape for the best rates and terms aligned with your goals.</p>
            </Link>
            <Link to={'/services/advi/bondadv'} className='service-item'>
              <h3>Bond Advisory</h3>
              <p>Expert advice on bond investments to optimize your fixed-income portfolio.</p>
            </Link>
            <Link to={'/services/advi/subsidy'} className='service-item'>
              <h3>Subsidy</h3>
              <p>Guide businesses through government subsidies, from identification to application.</p>
            </Link>
            <Link to={'/services/advi/finanfraud'} className='service-item'>
              <h3>Financial Fraud</h3>
              <p> Implement robust strategies and systems to protect your business from financial fraud.</p>
            </Link>
            <Link to={'/services/advi/ecoOffen'} className='service-item'>
              <h3>Economic Offence Wing</h3>
              <p>Support and representation in matters related to economic offences and investigations.</p>
            </Link>
            <Link to={'/services/advi/lifeGen'} className='service-item'>
              <h3>Life and General Insurence</h3>
              <p>Select the most suitable insurance policies for comprehensive personal and business coverage.</p>
            </Link>
            <Link to={'/services/advi/startUpIndia'} className='service-item'>
              <h3>Startup India Registration</h3>
              <p>Streamline your Startup India registration to access government benefits and incentives.</p>
            </Link>
            <Link to={'/services/advi/impExp'} className='service-item'>
              <h3>Import Export Counsultant</h3>
              <p>Navigate international trade complexities with expert guidance on regulations and strategies.</p>
            </Link>
        </div>
        {isModalOpen && <Modal closeModal={() => setModalOpen(false)} />}{' '}
      </section>
    </>
  )
}

export default Advisory