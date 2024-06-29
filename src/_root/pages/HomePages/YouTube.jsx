import React, { useState } from 'react';
import './YouTube.css';

const YouTube = () => {
    const [links, setLinks] = useState([
        'https://www.youtube.com/watch?v=3JZ_D3ELwOQ',
        'https://www.youtube.com/watch?v=VYOjWnS4cMY',
        'https://www.youtube.com/watch?v=LXb3EKWsInQ',
        'https://www.youtube.com/watch?v=FTQbiNvZqaY'
    ]);
    const [newLink, setNewLink] = useState('');
    const [editing, setEditing] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);

    const extractVideoId = (url) => {
        const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        const match = url.match(regex);
        return match ? match[1] : null;
    };

    const handleAdd = () => {
        if (editing) {
            const updatedLinks = links.map((link, index) => (index === editingIndex ? newLink : link));
            setLinks(updatedLinks);
            setEditing(false);
            setEditingIndex(null);
        } else {
            setLinks([...links, newLink]);
        }
        setNewLink('');
    };

    const handleChange = (e) => {
        setNewLink(e.target.value);
    };

    const handleAddClick = () => {
        setNewLink('');
        setEditing(false);
        setEditingIndex(null);
    };

    const handleEdit = (index) => {
        setNewLink(links[index]);
        setEditing(true);
        setEditingIndex(index);
    };

    const handleDelete = (index) => {
        const updatedLinks = links.filter((_, i) => i !== index);
        setLinks(updatedLinks);
    };

    const handleCancel = () => {
        setEditing(false);
        setEditingIndex(null);
        setNewLink('');
    };

    return (
        <div className="youtube-container">
            <button onClick={handleAddClick} className="add-button">Add Link</button>
            <h1>YouTube Links</h1>
            <div className="links">
                {links.map((link, index) => {
                    const videoId = extractVideoId(link);
                    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
                    return (
                        <div key={index} className="link-item">
                            <div className="thumbnail">
                                <a href={videoUrl} target="_blank" rel="noopener noreferrer">
                                    <img src={thumbnailUrl} alt="Thumbnail" />
                                </a>
                            </div>
                            <div className="details">
                                <a href={videoUrl} target="_blank" rel="noopener noreferrer">{videoUrl}</a>
                                <button onClick={() => handleEdit(index)} className="edit-button">Edit</button>
                                <button onClick={() => handleDelete(index)} className="delete-button">Delete</button>
                            </div>
                        </div>
                    );
                })}
            </div>
            {(editing || newLink !== '') && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={handleCancel}>&times;</span>
                        <h2>{editing ? 'Edit YouTube Link' : 'Add YouTube Link'}</h2>
                        <input 
                            type="text" 
                            value={newLink} 
                            onChange={handleChange} 
                            placeholder="Enter YouTube URL" 
                        />
                        <button onClick={handleAdd}>{editing ? 'Save' : 'Add'}</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default YouTube;
