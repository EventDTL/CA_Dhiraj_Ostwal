import React, { useState, useEffect } from 'react';
import './Employee.css';
import {
  useSaveEmployee,
  useGetAllEmployee,
  useDeleteEmployee,
  useUpdateEmployee,
} from '../../lib/react-query/queries';

const Employee = () => {
  const {
    data: employeeData,
    isLoading: isLoadingEmp,
    refetch,
  } = useGetAllEmployee();

  console.log(employeeData);

  const [employees, setEmployees] = useState([]);
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
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingEmployeeId, setEditingEmployeeId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    if (employeeData) {
      setEmployees(employeeData);
    }
  }, [employeeData]);

  const { mutateAsync: saveEmployee, isLoading: isLoadingEmployee } = useSaveEmployee();
  const { mutateAsync: deleteEmployee, isLoading: isDeletingEmployee } = useDeleteEmployee();
  const { mutateAsync: updateEmployee, isLoading: isUpdatingEmployee } = useUpdateEmployee();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      setFormData((prevData) => ({
        ...prevData,
        image: file,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (
      !formData.firstname ||
      !formData.lastname ||
      !formData.email ||
      !formData.phone ||
      !formData.address ||
      !formData.position ||
      !formData.gender ||
      !formData.birthDate ||
      (!formData.image && !editingEmployeeId) // Only required if not editing
    ) {
      setError('All fields are required.');
      return;
    }

    try {
      const formDataWithImage = new FormData();
      formDataWithImage.append('firstname', formData.firstname);
      formDataWithImage.append('lastname', formData.lastname);
      formDataWithImage.append('email', formData.email);
      formDataWithImage.append('phone', formData.phone);
      formDataWithImage.append('address', formData.address);
      formDataWithImage.append('position', formData.position);
      formDataWithImage.append('gender', formData.gender);
      formDataWithImage.append('birthDate', formData.birthDate);

      if (formData.image) {
        formDataWithImage.append('image', formData.image);
      }

      if (editingEmployeeId) {
        console.log(formData);
        await updateEmployee({...formData,deleteId});

      } else {
        await saveEmployee(formData);
      }

      setFormData({
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        address: '',
        position: '',
        gender: '',
        birthDate: '',
        image: null,
      });
      setImagePreview(null);
      setFormSubmitted(true);
      setShowForm(false);
      setEditingEmployeeId(null);
      setDeleteId(null);

      refetch();
    } catch (error) {
      setError('Failed to save employee. Please try again.');
    }
  };

  const handleAddEmployee = () => {
    setShowForm(true);
    setEditingEmployeeId(null);
  };

  const handleEditEmployee = (employee) => {
    setFormData({
      firstname: employee.FirstName,
      lastname: employee.LastName,
      email: employee.Email,
      phone: employee.Phone,
      address: employee.Address,
      position: employee.Position,
      gender: employee.Gender,
      birthDate: new Date(employee.BirthDate).toISOString().split('T')[0],
      image: null,
    });
    setImagePreview(employee.ImageUrl);
    setShowForm(true);
    setDeleteId(employee)
    setEditingEmployeeId(employee.$id);
  };

  const confirmDelete = async (employeeId) => {
    try {
      await deleteEmployee(employeeId);
      refetch();
    } catch (error) {
      console.error('Failed to delete Employee:', error);
    } finally {
      setDeleteId(null);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setFormData({
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
      address: '',
      position: '',
      gender: '',
      birthDate: '',
      image: null,
    });
    setImagePreview(null);
    setError(null);
    setEditingEmployeeId(null);
    setDeleteId(null);
  };

  return (
    <div className='employee-container'>
      <h1>Employee List</h1>
      <div className='add-employee-button-container'>
        <button onClick={handleAddEmployee} className='add-employee-button'>
          Add Employee
        </button>
      </div>
       {error && <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  {error}
</div>}
            {formSubmitted && (
              <div class="p-4  mt-2 text-sm text-green-500 rounded-lg bg-green-50 dark:bg-gray-700 dark:text-green-400" role="alert">
  Employee saved successfully!
</div>
            )}
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
                required={!editingEmployeeId} // Required only if not editing
              />
            </div>
            {imagePreview && (
              <div className='image-preview'>
                <img src={imagePreview} alt='Image Preview' />
              </div>
            )}
            <div className='button-row'>
              <button type='submit' disabled={isLoadingEmployee || isUpdatingEmployee}>
                {isLoadingEmployee || isUpdatingEmployee ? `Saving...` : 'Submit'}
              </button>
              <button type='button' onClick={handleCancel}>
                Cancel
              </button>
            </div>
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr
 key={employee.$id}>
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
                <td>
                  <button   className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2'
                   onClick={() => handleEditEmployee(employee)}>Edit</button>
                  <button className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded' onClick={() => setDeleteId(employee)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
       {deleteId && (
  <div className='delete-modal'>
    <div className='delete-modal-content'>
      <p>Are you sure you want to delete this Employee?</p>
      <div>
        {!isDeletingEmployee ? (
          <>
            <button
              onClick={() => confirmDelete(deleteId)}
              className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-2'
            >
              Yes
            </button>
            <button
              onClick={() => setDeleteId(null)}
              className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded'
            >
              No
            </button>
          </>
        ) : (
          <button className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded'>
            Deleting...
          </button>
        )}
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default Employee;
