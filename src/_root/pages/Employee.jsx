import React, { useState, useEffect } from 'react'
import './Employee.css'
import {
  useSaveEmployee,
  useGetAllEmployee,
} from '../../lib/react-query/queries'
import Loader2 from '../../component/shared/Loader'

const Employee = () => {
  const {
    data: employeeData,
    isLoading: isLoadingEmp,
    refetch,
  } = useGetAllEmployee()

  const [employees, setEmployees] = useState([])
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    position: '',
    address: '',
    gender: '',
    birthDate: '',
    image: null,
  })
  const [imagePreview, setImagePreview] = useState(null)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [error, setError] = useState(null)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    if (employeeData && employeeData.documents) {
      setEmployees(employeeData.documents)
    }
  }, [employeeData])

  const { mutateAsync: saveEmployee, isLoading: isLoadingEmployee } =
    useSaveEmployee()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const previewUrl = URL.createObjectURL(file)
      setImagePreview(previewUrl)
      setFormData((prevData) => ({
        ...prevData,
        image: file,
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    if (
      !formData.firstname ||
      !formData.lastname ||
      !formData.email ||
      !formData.phone ||
      !formData.address ||
      !formData.position ||
      !formData.gender ||
      !formData.birthDate ||
      !formData.image
    ) {
      setError('All fields are required.')
      return
    }

    try {
      const formDataWithImage = new FormData()
      formDataWithImage.append('firstname', formData.firstname)
      formDataWithImage.append('lastname', formData.lastname)
      formDataWithImage.append('email', formData.email)
      formDataWithImage.append('phone', formData.phone)
      formDataWithImage.append('address', formData.address)
      formDataWithImage.append('position', formData.position)
      formDataWithImage.append('gender', formData.gender)
      formDataWithImage.append('birthDate', formData.birthDate)
      formDataWithImage.append('image', formData.image)

      await saveEmployee(formData)
      setFormData({
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        address: '',
        gender: '',
        position : '',
        birthDate: '',
        image: null,
      })
      setImagePreview(null)
      setFormSubmitted(true)
      setShowForm(false)
    } catch (error) {
      setError('Failed to save employee. Please try again.')
    }
  }

  const handleAddEmployee = () => {
    setShowForm(true)
  }

  const handleCancel = () => {
    setShowForm(false)
    setFormData({
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
      address: '',
      position : '',
      gender: '',
      birthDate: '',
      image: null,
    })
    setImagePreview(null)
    setError(null)
  }

  return (
    <div className='employee-container'>
      <h1>Employee List</h1>
      <div className='add-employee-button-container'>
        <button onClick={handleAddEmployee} className='add-employee-button'>
          Add Employee
        </button>
      </div>
      {showForm && (
        <div className='form-overlay'>
          <form onSubmit={handleSubmit} className='employee-form'>
            <div className='form-row'>
              <div className='input-group'>
                <input
                  type='text'
                  name='firstname'
                  placeholder='First Name'
                  value={formData.firstname}
                  onChange={handleChange}
                  required
                />
                <input
                  type='text'
                  name='lastname'
                  placeholder='Last Name'
                  value={formData.lastname}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className='form-row'>
              <div className='input-group'>
                <input
                  type='email'
                  name='email'
                  placeholder='Email'
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <input
                  type='text'
                  name='phone'
                  placeholder='Phone'
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className='form-row'>
              <div className='input-group'>
                <input
                  type='text'
                  name='address'
                  placeholder='Address'
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
                <input
                  type='date'
                  name='birthDate'
                  placeholder='Date of Birth'
                  value={formData.birthDate}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className='form-row'>
             <div className='input-group'>
               <input
                  type='text'
                  name='position'
                  placeholder='Position'
                  value={formData.position}
                  onChange={handleChange}
                  required
                />
              <select 
                name='gender'
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value=''>Select Gender</option>
                <option value='Male'>Male</option>
                <option value='Female'>Female</option>
                <option value='Other'>Other</option>
              </select>
             </div>
            </div>
            <div className='form-row'>
              <label>Upload Image:</label>
              <input className='ml-5'
                type='file'
                accept='image/*'
                onChange={handleImageChange}
                required
              />
            </div>
            {imagePreview && (
              <div className='image-preview'>
                <img src={imagePreview} alt='Image Preview' />
              </div>
            )}
            <div className='button-row'>
              <button type='submit' disabled={isLoadingEmployee}>
                {isLoadingEmployee ? `Saving...` : 'Submit'}
              </button>
              <button type='button' onClick={handleCancel}>
                Cancel
              </button>
            </div>
            {error && <p className='error-message'>{error}</p>}
            {formSubmitted && (
              <p className='success-message'>Employee saved successfully!</p>
            )}
          </form>
        </div>
      )}
      <div className='employee-table-container'>
        <table className='employee-table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Position</th>
              <th>Address</th>
              <th>Gender</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.$id}>
                <td>
                  {employee.FirstName} {employee.LastName}
                </td>
                <td>{employee.Email}</td>
                <td>{employee.Position}</td>
                <td>{employee.Address}</td>
                <td>{employee.Gender}</td>
                <td>
                  <img
                    src={employee.ImageUrl}
                    alt='Employee'
                    style={{ width: '100px', height: 'auto' }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Employee
