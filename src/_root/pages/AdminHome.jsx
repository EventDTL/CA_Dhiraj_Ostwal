import React, { useState } from 'react';
import Banner from './HomePages/Banner';
import AdminProfile from './HomePages/AdminProfile';
import YouTube from './HomePages/YouTube';
import './AdminHome.css';

const AdminHome = () => {
    const [activeSection, setActiveSection] = useState('profile');

    const renderSection = () => {
        switch (activeSection) {
            case 'profile':
                return <AdminProfile />;
            case 'banner':
                return <Banner />;
            case 'youtube':
                return <YouTube />;
            default:
                return <AdminProfile />;
        }
    };

    return (
        <div className="app">
            <div className="adminnav">

                  <button 
                    onClick={() => setActiveSection('profile')}
                    className={activeSection === 'profile' ? 'active' : ''}
                >
                    Profile 
                </button>
                <button 
                    onClick={() => setActiveSection('banner')}
                    className={activeSection === 'banner' ? 'active' : ''}
                >
                    Banner
                </button>
              
                <button 
                    onClick={() => setActiveSection('youtube')}
                    className={activeSection === 'youtube' ? 'active' : ''}
                >
                    YouTube
                </button>
            </div>
            <div className="admincontent">
                {renderSection()}
            </div>
        </div>
    );
};

export default AdminHome;
