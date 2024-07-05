import React, { useState, useEffect } from 'react';
import {
  useSaveYoutubeLink,
  useGetAllYoutube,
  useDeleteYoutube,
  useUpdateYoutubeLink,
} from '../../../lib/react-query/queries';
import './Banner.css';

const Youtube = () => {
  const {
    data: youtubeData,
    isLoading: isLoadingYoutube,
    refetch: refetchYoutubes,
  } = useGetAllYoutube();

  const [youtubes, setYoutubes] = useState([]);
  const [formData, setFormData] = useState({ Title: '', YoutubeUrl: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null); // State to hold id of youtube link to edit
  const [deleteId, setDeleteId] = useState(null); // State to hold id of youtube link to delete

  useEffect(() => {
    if (youtubeData && youtubeData.documents) {
      setYoutubes(youtubeData.documents);
    }
  }, [youtubeData]);

  const { mutateAsync: saveYoutubeLink, isLoading: isSavingYoutube } = useSaveYoutubeLink();
  const { mutateAsync: updateYoutubeLink, isLoading: isUpdatingYoutube } = useUpdateYoutubeLink();
  const { mutateAsync: deleteYoutube, isLoading: isDeletingYoutube } = useDeleteYoutube();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.Title || !formData.YoutubeUrl) {
      setError('All fields are required.');
      return;
    }

    try {
      if (editId) {
        await updateYoutubeLink({ id: editId, ...formData });
      } else {
        await saveYoutubeLink(formData);
      }
      setFormData({ Title: '', YoutubeUrl: '' });
      setFormSubmitted(true);
      setShowForm(false);
      refetchYoutubes();
    } catch (error) {
      setError('Failed to save YouTube link. Please try again.');
    }
  };

  const handleAddYoutube = () => {
    setShowForm(true);
    setEditId(null);
    setFormData({ Title: '', YoutubeUrl: '' });
  };

  const handleCancel = () => {
    setShowForm(false);
    setFormData({ Title: '', YoutubeUrl: '' });
    setError(null);
  };

  const confirmDelete = async (youtubeId) => {
    try {
      await deleteYoutube({ id: youtubeId });
      refetchYoutubes();
    } catch (error) {
      console.error('Failed to delete YouTube link:', error);
    }
    setDeleteId(null);
  };

  const handleEdit = (youtubeId) => {
    const youtube = youtubes.find((yt) => yt.$id === youtubeId);
    if (youtube) {
      setFormData({ Title: youtube.Title, YoutubeUrl: youtube.YoutubeUrl });
      setEditId(youtubeId);
      setShowForm(true);
    }
  };

  return (
    <div className='banner1-container'>
      <h1>YouTube Links</h1>
      <div className='add-banner-button-container'>
        <button onClick={handleAddYoutube} className='add-banner-button'>
          Add YouTube Link
        </button>
      </div>
      {showForm && (
        <div className='form-overlay'>
          <form onSubmit={handleSubmit} className='banner-form'>
            <div className='form-row'>
              <label>Title:</label>
              <input
                type='text'
                name='Title'
                value={formData.Title}
                onChange={handleChange}
                required
              />
            </div>
            <div className='form-row'>
              <label>YouTube URL:</label>
              <input
                type='text'
                name='YoutubeUrl'
                value={formData.YoutubeUrl}
                onChange={handleChange}
                required
              />
            </div>
            <div className='button-row'>
              <button type='submit' disabled={isSavingYoutube || isUpdatingYoutube}>
                {isSavingYoutube || isUpdatingYoutube ? 'Saving...' : 'Add'}
              </button>
              <button type='button' onClick={handleCancel}>
                Cancel
              </button>
            </div>
            {error && <p className='error-message'>{error}</p>}
            {formSubmitted && (
              <p className='success-message'>YouTube link added successfully!</p>
            )}
          </form>
        </div>
      )}
      <div className='banner-table-container'>
        <table className='banner-table'>
          <thead>
            <tr>
              <th>Title</th>
              <th>YouTube URL</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {youtubes.map((youtube) => (
              <tr key={youtube.$id}>
                <td>{youtube.Title}</td>
                <td>{youtube.YoutubeUrl}</td>
                <td>
                  <button
                    onClick={() => handleEdit(youtube.$id)}
                    className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2'
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setDeleteId(youtube.$id)}
                    className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded'
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {deleteId && (
        <div className='delete-modal'>
          <div className='delete-modal-content'>
            <p>Are you sure you want to delete this YouTube link?</p>
            <div>
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Youtube;
