import React, { useState } from 'react'
import './Enquery.css'
import { useSaveMeeting } from '../../lib/react-query/queries'

const Enquery = ({ closeModal }) => {
  const { mutateAsync: saveMeeting, isLoading: isLoadingMeeting } =
    useSaveMeeting()

  const [formData, setFormData] = useState({
    whatsappNumber: '',
    subject: '',
    datetime: '',
  })
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    if (!formData.whatsappNumber || !formData.subject || !formData.datetime) {
      setError('All fields are required.')
      return
    }

    const data = {
      whatsappNumber: formData.whatsappNumber,
      subject: formData.subject,
      datetime: formData.datetime,
    }

    try {
      await saveMeeting(data)
      setFormData({
        whatsappNumber: '',
        subject: '',
        datetime: '',
      })
      setFormSubmitted(true)
    } catch (error) {
      setError('Failed to send message. Please try again.')
    }
  }

  return (
    <div className='form-overlay'>
      <div className='form-content'>
        <button className='close-button' onClick={closeModal}>
          &times;
        </button>
        <h2>Book an Appointment</h2>
        {formSubmitted && !error && (
          <div className='success-message' style={{ color: 'green' }}>
            Meeting scheduled successfully!
          </div>
        )}
        <form onSubmit={handleSubmit} className='appointment-form'>
          <label htmlFor='whatsappNumber'>WhatsApp Number:</label>
          <input
            type='text'
            id='whatsappNumber'
            name='whatsappNumber'
            value={formData.whatsappNumber}
            onChange={handleChange}
            required
          />

          <label htmlFor='subject'>Subject:</label>
          <input
            type='text'
            id='subject'
            name='subject'
            value={formData.subject}
            onChange={handleChange}
            required
          />

          <label htmlFor='datetime'>Date and Time:</label>
          <input
            type='datetime-local'
            id='datetime'
            name='datetime'
            value={formData.datetime}
            onChange={handleChange}
            required
          />

          {error && <div className='error-message'>{error}</div>}

          <button
            type='submit'
            className='submit-button'
            disabled={isLoadingMeeting}
          >
            {isLoadingMeeting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Enquery
