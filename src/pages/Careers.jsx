import './Careers.css'
import Img from '../images/carrer.jpg'
import career from '../images/careers.png'
import Banner from '../component/ui/Banner'
import { useSendResume } from '../lib/react-query/queries'
import { useState } from 'react'

function Careers() {
  const { mutateAsync: sendResume, isLoading: isLoadingResume } =
    useSendResume()
  const [formData, setFormData] = useState({
    name: '',
    tel: '',
    email: '',
    file: null,
    interest: '',
  })
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    const { name, value, files } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    if (
      !formData.name ||
      !formData.tel ||
      !formData.email ||
      !formData.file ||
      !formData.interest
    ) {
      setError('All fields are required.')
      return
    }

    const data = {
      name: formData.name,
      tel: formData.tel,
      email: formData.email,
      file: formData.file,
      interest: formData.interest,
    }

    try {
      await sendResume(data)
      setFormData({
        name: '',
        tel: '',
        email: '',
        interest: '',
        file: null,
      })
      setFormSubmitted(true)
    } catch (error) {
      setError('Failed to send resume. Please try again.')
    }
  }

  return (
    <>
      <Banner imageUrl={Img} breadcrumb='Home > Career' headline='careers' />
      <div className='jobs-section'>
        <div className='job-description'>
          <h2 className='heading-primary'>
            CAREER <span>OPPORTUNITIES</span>
          </h2>
          <p>
            We are proud of our company and the people who work here. They help
            us set new standards for the real estate industry. Our team ensures
            customer satisfaction and construction quality, making us a leading
            real estate company in Pune.
            <br />
            <br />
            We seek work-driven, goal-oriented individuals who can help us
            excel. If you are an explorer looking for opportunities, join us.
          </p>
          <img src={career} alt='Career Opportunities' className='job-image' />
        </div>

        <div className='application-form'>
          <h3 className='form-title'>APPLY ONLINE</h3>
          <div className='form-divider'>
            <form className='applicant-info' onSubmit={handleSubmit}>
              <div className='input-group'>
                <i className='fas fa-user icon'></i>
                <input
                  type='text'
                  name='name'
                  placeholder='Your name *'
                  className='input-field'
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className='input-group'>
                <i className='fas fa-phone icon'></i>
                <input
                  type='tel'
                  name='tel'
                  placeholder='Phone number *'
                  className='input-field'
                  value={formData.tel}
                  onChange={handleChange}
                />
              </div>
              <div className='input-group'>
                <i className='fas fa-envelope-open icon'></i>
                <input
                  type='email'
                  name='email'
                  placeholder='Email address *'
                  className='input-field'
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className='input-group'>
                <i className='fas fa-briefcase icon'></i>
                <select
                  name='interest'
                  className='input-field'
                  value={formData.interest}
                  onChange={handleChange}
                >
                  <option value=''>Select your interest *</option>
                  <option value='Sales'>Sales</option>
                  <option value='Marketing'>Marketing</option>
                  <option value='Development'>Development</option>
                  <option value='Design'>Design</option>
                  <option value='Other'>Other</option>
                </select>
              </div>
              <div className='input-group'>
                <i className='fa fa-file icon'></i>
               <input
                type="file"
                name="file"
                id="file"
                className="file-input"
                accept="application/pdf"
                onChange={handleChange}
              />
                <label htmlFor='file' className='file-label'>
                  <span className='file-text'>
                    {formData.file ? formData.file.name : 'Upload your CV *'}
                  </span>
                  <i className='fa fa-upload'></i>
                </label>
              </div>
              {error && <p style={{ color: 'red' }}>{error}</p>}
              <div className='input-group'>
                <input
                  type='submit'
                  value='Send To Us'
                  className='submit-button'
                  disabled={isLoadingResume}
                />
              </div>
              {formSubmitted && (
                <p style={{ color: 'green' }}>Resume sent successfully!</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Careers
