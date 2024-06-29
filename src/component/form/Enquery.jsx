import React, { useState } from 'react'
import './Enquery.css'

const Enquery = ({ closeModal }) => {
  const [formData, setFormData] = useState({
    whatsappNumber: '',
    date: '',
    time: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission, e.g., send the data to a server or display a confirmation message
    console.log(formData)
    closeModal()
  }

  return (
    <div className='form-overlay'>
      <div className='form-content'>
        <button className='close-button' onClick={closeModal}>
          &times;
        </button>
        <h2>Book an Appointment</h2>
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

          <label htmlFor='date'>Date:</label>
          <input
            type='date'
            id='date'
            name='date'
            value={formData.date}
            onChange={handleChange}
            required
          />

          <label htmlFor='time'>Time:</label>
          <input
            type='time'
            id='time'
            name='time'
            value={formData.time}
            onChange={handleChange}
            required
          />

          <button type='submit' className='submit-button'>
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default Enquery
