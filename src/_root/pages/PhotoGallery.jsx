import React, { useState, useEffect } from 'react'
import {
  useSaveGalleryPhoto,
  useGetAllGallery,
} from '../../lib/react-query/queries'
import './PhotoGallery.css' // Assuming you have a CSS file for Gallery styles

const PhotoGallery = () => {
  const {
    data: galleryData,
    isLoading: isLoadingGallery,
    refetch: refetchGallery,
  } = useGetAllGallery()

  const [galleryPhotos, setGalleryPhotos] = useState([])
  const [formData, setFormData] = useState({
    imagetype: '',
    image: null,
  })
  const [imagePreview, setImagePreview] = useState(null)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [error, setError] = useState(null)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    if (galleryData && galleryData.documents) {
      setGalleryPhotos(galleryData.documents)
    }
  }, [galleryData])

  const { mutateAsync: saveGalleryPhoto, isLoading: isSavingPhoto } =
    useSaveGalleryPhoto()

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

    if (!formData.imagetype || !formData.image) {
      setError('All fields are required.')
      return
    }

    try {
      await saveGalleryPhoto(formData)
      setFormData({
        imagetype: '',
        image: null,
      })
      setImagePreview(null)
      setFormSubmitted(true)
      setShowForm(false)
      // Refetch gallery after successful submission
      refetchGallery()
    } catch (error) {
      setError('Failed to save Photo. Please try again.')
    }
  }

  const handleAddPhoto = () => {
    setShowForm(true)
  }

  const handleCancel = () => {
    setShowForm(false)
    setFormData({
      imagetype: '',
      image: null,
    })
    setImagePreview(null)
    setError(null)
  }

  return (
    <div className='gallery-container'>
      <h1>Gallery</h1>
      <div className='add-photo-button-container'>
        <button onClick={handleAddPhoto} className='add-photo-button'>
          Add Photo
        </button>
      </div>
      {showForm && (
        <div className='form-overlay'>
          <form onSubmit={handleSubmit} className='gallery-form'>
            <div className='form-row'>
              <label>Image Type:</label>
              <select
                name='imagetype'
                value={formData.imagetype}
                onChange={handleChange}
                required
              >
                <option value=''>Select Image Type</option>
                <option value='Owner'>Owner</option>
                <option value='Gallery'>Gallery</option>
                <option value='Other'>Other</option>
              </select>
            </div>
            <div className='form-row'>
              <label>Upload Image:</label>
              <input
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
              <button type='submit' disabled={isSavingPhoto}>
                {isSavingPhoto ? 'Saving...' : 'Add Photo'}
              </button>
              <button type='button' onClick={handleCancel}>
                Cancel
              </button>
            </div>
            {error && <p className='error-message'>{error}</p>}
            {formSubmitted && (
              <p className='success-message'>Photo added successfully!</p>
            )}
          </form>
        </div>
      )}
      <div className='gallery-table-container'>
        <table className='gallery-table'>
          <thead>
            <tr>
              <th>Type</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {galleryPhotos.map((photo) => (
              <tr key={photo.$id}>
                <td>{photo.ImageType}</td>
                <td>
                  <img
                    src={photo.ImageUrl} // Assuming imageUrl field exists in your data
                    alt='Gallery Photo'
                    style={{
                      width: '100px',
                      height: 'auto',
                      alignSelf: 'center',
                    }}
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

export default PhotoGallery
