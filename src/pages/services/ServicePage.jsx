import React, { useState } from 'react'
import { useParams } from 'react-router-dom' // Import useParams
import ServiceData from './ServiceData'
import './ServicePage.css'
import Banner from '../../component/ui/Banner'
import Modal from '../../component/form/Enquery' // Import the modal component
import { useGetSubServices } from '../../lib/react-query/queries'

function ServicePage() {
  const { serviceName } = useParams()

  const {
    data: subServicesData,
    isLoading: isLoadingSubService,
    error,
    refetch,
  } = useGetSubServices(serviceName)


  const service = ServiceData[serviceName]
  const [isModalOpen, setModalOpen] = useState(false)


    if (isLoadingSubService) {
    return <div style={{ color: 'Black' }} className='mt-5'>Loading...</div>
  }

  const serviceLogo = `/src/assets/services/${subServicesData.ServiceName}.jpg`

  return (
    <>
      <Banner
        imageUrl={serviceLogo}
        breadcrumb={`Home > ${subServicesData.ServiceHeadline}`}
        headline={subServicesData.ServiceHeadline}
      />

      <section className='services'>
        <h2>{subServicesData.ServiceHeadline}</h2>
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
          {subServicesData?.subService?.map((subService)=> (
            <div className='service-item'>
              <h3>{subService.Title}</h3>
              <p>{subService.Description}</p>
            </div>
          ))}
        </div>
        {isModalOpen && <Modal closeModal={() => setModalOpen(false)} />}{' '}
      </section>
    </>
  )
}

export default ServicePage
