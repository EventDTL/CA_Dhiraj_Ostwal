import React, { useState, useEffect } from 'react'
import {
  useGetAllServices,
  useSaveService,
  useUpdateService,
} from '../../lib/react-query/queries' // Assuming useUpdateService hook for updating existing services
import { useNavigate } from 'react-router-dom'
import './Services.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'

const Services = () => {
  const {
    data: servicesData,
    isLoading: isLoadingService,
    error,
    refetch,
  } = useGetAllServices()

  const { mutateAsync: saveService, isLoading: isLoadingSaveService } =
    useSaveService()
  const { mutateAsync: updateService, isLoading: isLoadingUpdateService } =
    useUpdateService()

  const [showForm, setShowForm] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [formData, setFormData] = useState({
    ServiceName: '',
    ServiceHeadline: '',
  })

  const [selectedService, setSelectedService] = useState(null) // Track selected service for editing

  const navigate = useNavigate()

  const handleAddService = () => {
    setEditMode(false) // Ensure edit mode is off when adding new service
    setShowForm(true)
    setFormData({
      ServiceName: '',
      ServiceHeadline: '',
    })
  }

  const handleEditService = (e, service) => {
    e.stopPropagation()
    setEditMode(true)
    setSelectedService(service) // Store the selected service for editing
    setFormData({
      ServiceName: service.ServiceName,
      ServiceHeadline: service.ServiceHeadline,
    })
    setShowForm(true) // Open the form overlay
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditMode(false)
    setFormData({
      ServiceName: '',
      ServiceHeadline: '',
    })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'ServiceName') {
      // Trim leading and trailing spaces from ServiceName
      const trimmedValue = value.trim()
      setFormData((prevData) => ({
        ...prevData,
        [name]: trimmedValue,
      }))
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editMode) {
        await updateService({
          ...selectedService,
          ServiceName: formData.ServiceName,
          ServiceHeadline: formData.ServiceHeadline,
          ServiceId: selectedService.$id,
        })
      } else {
        await saveService(formData)
      }
      refetch() // Refetch services after saving/updating
      handleCancel()
    } catch (error) {
      console.error('Error saving/updating service:', error)
    }
  }

  if (isLoadingService) {
    return <div style={{ color: 'white' }}>Loading...</div>
  }

  return (
    <div className='services-container'>
      <h1>Services</h1>
      <button onClick={handleAddService} className='add-service-button'>
        Add Service
      </button>
      {error && <p>Error loading services</p>}
      <div className='services-list'>
        {servicesData &&
          Array.isArray(servicesData) &&
          servicesData.map((service) => (
            <div
              key={service.$id}
              className='services-item'
              onClick={() => navigate(`/subservices/${service.$id}`)}
            >
              <div className='service-info'>
                <h2>
                  <strong>Service Name:</strong> {service.ServiceName}
                </h2>
                <p>
                  <strong>Service Headline:</strong> {service.ServiceHeadline}
                </p>
              </div>
              <div
                className='edit-icon'
                onClick={(e) => handleEditService(e, service)}
              >
                <FontAwesomeIcon icon={faEdit} />
                <span className='edit-text pl-1'>Edit</span>
              </div>
            </div>
          ))}
      </div>

      {showForm && (
        <div className='form-overlay'>
          {isLoadingSaveService || isLoadingUpdateService ? (
            <div>Saving...</div>
          ) : (
            <form onSubmit={handleSubmit} className='service-form'>
              <input
                type='text'
                name='ServiceName'
                placeholder='Service Name'
                value={formData.ServiceName}
                onChange={handleChange}
                required
              />
              <input
                type='text'
                name='ServiceHeadline'
                placeholder='Service Headline'
                value={formData.ServiceHeadline}
                onChange={handleChange}
                required
              />
              <div className='button-row'>
                <button type='submit'>{editMode ? 'Update' : 'Submit'}</button>
                <button type='button' onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  )
}

export default Services
