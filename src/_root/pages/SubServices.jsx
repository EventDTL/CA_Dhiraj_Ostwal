import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  useGetSubServices,
  useSubSaveService,
  useUpdateSubService,
} from '../../lib/react-query/queries'
import './SubServices.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'

const SubServices = () => {
  const { serviceId } = useParams()
  const navigate = useNavigate()

  const {
    data: subServicesData,
    isLoading: isLoadingSubService,
    error,
    refetch,
  } = useGetSubServices(serviceId)

  const { mutateAsync: saveSubService, isLoading: isSavingSubService } =
    useSubSaveService()
  const { mutateAsync: updateSubService, isLoading: isUpdatingSubService } =
    useUpdateSubService()

  const [showForm, setShowForm] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [formData, setFormData] = useState({
    Title: '',
    Description: '',
  })
  const [expandedDescription, setExpandedDescription] = useState({})

  const [selectedSubService, setSelectedSubService] = useState(null)

  const handleAddSubService = () => {
    setEditMode(false)
    setShowForm(true)
    setFormData({
      Title: '',
      Description: '',
    })
  }

  const handleEditSubService = (e, subService) => {
    e.stopPropagation()
    setEditMode(true)
    setSelectedSubService(subService)
    setFormData({
      Title: subService.Title,
      Description: subService.Description,
    })
    setShowForm(true)
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditMode(false)
    setFormData({
      Title: '',
      Description: '',
    })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editMode && selectedSubService) {
        await updateSubService({
          ...selectedSubService,
          Title: formData.Title,
          Description: formData.Description,
          ServiceId: selectedSubService.$id,
        })
      } else {
        await saveSubService({ ...formData, serviceId })
      }
      refetch()
      handleCancel()
    } catch (error) {
      console.error('Error saving/updating sub-service:', error)
    }
  }

  const toggleDescription = (id) => {
    setExpandedDescription((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  if (isLoadingSubService) {
    return <div style={{ color: 'white' }}>Loading...</div>
  }

  return (
    <>
      <div
        className='back-button'
        onClick={() => navigate(-1)}
        style={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
          marginBottom: '5px',
        }}
      >
        <img
          width='48'
          height='48'
          style={{
            filter: 'invert(100%) sepia(0%) saturate(0%) hue-rotate(180deg)',
          }}
          src='https://img.icons8.com/color/48/000000/circled-left-2--v1.png'
          alt='Back'
        />
        <span style={{ color: 'white', marginLeft: '10px' }}>Back</span>
      </div>
      <div className='subservices-container'>
        <h2>
          Service Name: <strong>"{subServicesData?.ServiceHeadline}"</strong>
        </h2>

        <button onClick={handleAddSubService} className='add-subservice-button'>
          Add Sub-Service
        </button>
        <h1>Sub-Services:</h1>

        {error && <p>Error loading sub-services</p>}
        <div className='subservices-list'>
          {subServicesData?.subService?.map((subService) => (
            <div key={subService.$id} className='subservice-item'>
              <div className='subservice-header'>
                <h2 style={{ flex: '1 1 auto' }}>
                  <strong>Title:</strong> {subService.Title}
                </h2>
                <div
                  className='edit-icon'
                  style={{ marginLeft: 'auto' }}
                  onClick={(e) => handleEditSubService(e, subService)}
                >
                  <FontAwesomeIcon icon={faEdit} />
                  <span className='edit-text pl-1'>Edit</span>
                </div>
              </div>
              <p>
                <strong>Description:</strong>{' '}
                {expandedDescription[subService.$id]
                  ? subService.Description
                  : `${subService.Description.slice(0, 200)}...`}
                {subService.Description.length > 200 && (
                  <span
                    onClick={() => toggleDescription(subService.$id)}
                    className='read-more'
                  >
                    {expandedDescription[subService.$id]
                      ? ' Read Less'
                      : ' Read More'}
                  </span>
                )}
              </p>
            </div>
          ))}
        </div>

        {showForm && (
          <div className='form-overlay'>
            <form onSubmit={handleSubmit} className='subservice-form'>
              <input
                type='text'
                name='Title'
                placeholder='Title'
                value={formData.Title}
                onChange={handleChange}
                required
              />
              <textarea
                name='Description'
                placeholder='Description'
                value={formData.Description}
                onChange={handleChange}
                required
              />
              <div className='button-row'>
                <button
                  type='submit'
                  disabled={isSavingSubService || isUpdatingSubService}
                >
                  {isSavingSubService || isUpdatingSubService
                    ? 'Saving...'
                    : editMode
                    ? 'Update'
                    : 'Submit'}
                </button>
                <button type='button' onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  )
}

export default SubServices
