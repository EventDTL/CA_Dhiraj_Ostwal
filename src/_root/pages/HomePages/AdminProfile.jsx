import React, { useState, useEffect } from 'react';
import './AdminProfile.css';
import { useGetAdminProfile, useUpdateAdminProfile, useUpdateAdminProfilePhoto } from '../../../lib/react-query/queries';
import Loader from '../../../component/shared/Loader2';

const AdminProfile = () => {
  const {
    data: adminProfileData,
    isLoading: isLoadingAdminProfile,
    error: iserrorAdmin,
    refetch,
  } = useGetAdminProfile();
  const { mutateAsync: updateAdmin, isLoading: isUpdateLoading } = useUpdateAdminProfile();
  const { mutateAsync: updateAdminPhoto, isLoading: isProfileLoading } = useUpdateAdminProfilePhoto();

  const [photo, setPhoto] = useState('');
  const [editing, setEditing] = useState(false);
  const [newPhoto, setNewPhoto] = useState(null);
  const [officeInfo, setOfficeInfo] = useState({
    address: '',
    email: '',
    phone: '',
    googleMap: ''
  });
  const [socialLinks, setSocialLinks] = useState({
    facebook: '',
    linkedin: '',
    instagram: '',
    youtube: '',
    whatsapp: ''
  });

  const [imageId, setImageId] = useState(null); // State to hold id of banner to delete
  const [imageUrl, setImageUrl] = useState(null);
  const [photoEdited, setPhotoEdited] = useState(false);
  const [officeInfoEdited, setOfficeInfoEdited] = useState(false);
  const [socialLinksEdited, setSocialLinksEdited] = useState(false);

  useEffect(() => {
    if (adminProfileData) {
      setImageId(adminProfileData.ProfilePhotoId);
      setImageUrl(adminProfileData.ImageUrl);
      setPhoto(adminProfileData.ImageUrl);
      setOfficeInfo({
        address: adminProfileData.Address,
        email: adminProfileData.Email,
        phone: adminProfileData.Phone,
        googleMap: adminProfileData.GoogleMap
      });
      setSocialLinks({
        facebook: adminProfileData.Facebook,
        linkedin: adminProfileData.LinkedIn,
        instagram: adminProfileData.Instagram,
        youtube: adminProfileData.YouTube,
        whatsapp: adminProfileData.WhatsApp
      });
    }
  }, [adminProfileData]);

  const handleDelete = () => {
    setPhoto('');
    setPhotoEdited(true);
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = async () => {
    if (photoEdited) {
      await updateAdminPhoto({image:newPhoto,imageId:imageId,imageUrl:imageUrl});
    }
    if (officeInfoEdited || socialLinksEdited) {
      await updateAdmin({ ...officeInfo, ...socialLinks });
    }
    if (!isUpdateLoading) {
      setEditing(false);
      setPhotoEdited(false);
      setOfficeInfoEdited(false);
      setSocialLinksEdited(false);
    }
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewPhoto(file);
      setPhoto(URL.createObjectURL(file));
      setPhotoEdited(true);
    }
  };

  const handleCancel = () => {
    setEditing(false);
    setPhotoEdited(false);
  };

  const handleOfficeInfoChange = (e) => {
    const { name, value } = e.target;
    setOfficeInfo((prevState) => ({
      ...prevState,
      [name]: value
    }));
    setOfficeInfoEdited(true);
  };

  const handleSocialLinksChange = (e) => {
    const { name, value } = e.target;
    setSocialLinks((prevState) => ({
      ...prevState,
      [name]: value
    }));
    setSocialLinksEdited(true);
  };

  const isSaveEnabled = photoEdited || officeInfoEdited || socialLinksEdited;

  if (isLoadingAdminProfile) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader /> Loading...
      </div>
    );
  }

  if (iserrorAdmin) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div>Error loading admin profile</div>
      </div>
    );
  }

  return (
    <>
      <div className="profile-photo-container">
        <div className="profile-section header">
          <h1>Profile Photo</h1>
          {photo ? (
            <img src={photo} alt="Profile" className="profile-photo-admin" />
          ) : (
            <p>No profile photo</p>
          )}
          <div className="buttons">
            <button onClick={handleEdit} className="btn edit-btn">Edit</button>
            <button onClick={handleDelete} className="btn delete-btn">Delete</button>
          </div>
          {isSaveEnabled && (
            <div className="buttons">
              <button onClick={handleSave} className={`btn save-btn ${!isSaveEnabled ? 'disabled' : ''}`} disabled={!isSaveEnabled}>
                {isUpdateLoading ? (
                  <>
                    <Loader /> Saving...
                  </>
                ) : (
                  'Save Changes'
                )}
              </button>
            </div>
          )}
          {editing && (
            <div className="modal">
              <div className="modal-content">
                <span className="close" onClick={handleCancel}>&times;</span>
                <h2>Edit Profile Photo</h2>
                <input type="file" onChange={handleChange} />
                <button onClick={handleSave} disabled={!isSaveEnabled}>Save</button>
              </div>
            </div>
          )}
        </div>
        <div className="info-section header">
          <h1>Office Information</h1>
          <div className="form-group">
            <label><i className="fas fa-map-marker-alt"></i> Address:</label>
            <input type="text" name="address" value={officeInfo.address} onChange={handleOfficeInfoChange} />
          </div>
          <div className="form-group">
            <label><i className="fas fa-envelope"></i> Email:</label>
            <input type="email" name="email" value={officeInfo.email} onChange={handleOfficeInfoChange} />
          </div>
          <div className="form-group">
            <label><i className="fas fa-phone"></i> Phone:</label>
            <input type="text" name="phone" value={officeInfo.phone} onChange={handleOfficeInfoChange} />
          </div>
          <div className="form-group">
            <label><i className="fas fa-map-marked-alt"></i> Google Map Location:</label>
            <input type="text" name="googleMap" value={officeInfo.googleMap} onChange={handleOfficeInfoChange} />
          </div>
          <h1>Social Links</h1>
          <div className="form-group">
            <label><i className="fab fa-facebook"></i> Facebook:</label>
            <input type="text" name="facebook" value={socialLinks.facebook} onChange={handleSocialLinksChange} />
          </div>
          <div className="form-group">
            <label><i className="fab fa-linkedin"></i> LinkedIn:</label>
            <input type="text" name="linkedin" value={socialLinks.linkedin} onChange={handleSocialLinksChange} />
          </div>
          <div className="form-group">
            <label><i className="fab fa-instagram"></i> Instagram:</label>
            <input type="text" name="instagram" value={socialLinks.instagram} onChange={handleSocialLinksChange} />
          </div>
          <div className="form-group">
            <label><i className="fab fa-youtube"></i> YouTube:</label>
            <input type="text" name="youtube" value={socialLinks.youtube} onChange={handleSocialLinksChange} />
          </div>
          <div className="form-group">
            <label><i className="fab fa-whatsapp"></i> WhatsApp:</label>
            <input type="text" name="whatsapp" value={socialLinks.whatsapp} onChange={handleSocialLinksChange} />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminProfile;
