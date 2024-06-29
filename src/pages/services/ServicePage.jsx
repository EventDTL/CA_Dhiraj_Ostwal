import React, { useState } from 'react'
import { useParams } from 'react-router-dom' // Import useParams
import ServiceData from './ServiceData'
import './ServicePage.css'
import Banner from '../../component/ui/Banner'
import Modal from '../../component/form/Enquery' // Import the modal component

function ServicePage() {
  const { serviceName } = useParams()
  const service = ServiceData[serviceName]
  const [isModalOpen, setModalOpen] = useState(false)

  if (!service) {
    return <div>Service not found</div>
  }

  const serviceLogo = `/src/assets/services/${serviceName}.jpg`

  return (
    <>
      <Banner
        imageUrl={serviceLogo}
        breadcrumb={`Home > ${service.headline}`}
        headline={service.headline}
      />

      <section className='services'>
        <h2>{service.headline}</h2>
        <div className='button-container'>
          <a
            href='https://wa.me/9518994028?text=Hi%20there,%20I%27m%20interested%20in%20your%20services.'
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
          {service.content.map((item, index) => (
            <div key={index} className='service-item'>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
        {isModalOpen && <Modal closeModal={() => setModalOpen(false)} />}{' '}
        {/* Render modal if open */}
      </section>
    </>
  )
}

export default ServicePage
