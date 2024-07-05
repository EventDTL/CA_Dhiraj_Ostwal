import React from 'react';
import aboutimg from '../images/rajesh-pande.png';
import { useGetAdminProfile } from '../lib/react-query/queries';
import './about.css';

function About() {
    const { data: adminProfile, isLoading: isLoadingAdminProfile, error } = useGetAdminProfile();

    const adminImageUrl = adminProfile?.ImageUrl || aboutimg;

    return (
        <>
            <div className='abouthead'>
                <h2><span>Ab</span>out</h2>
            </div>
            <div className='about'>
                <div className='para'>
                    <h2><span>WHO</span> WE ARE</h2>
                    <h3>B. Com, CA, CMA and SET</h3>
                    <p>CA Dhiraj Ostwal is an experienced and professional CA with more than 25 years in Business Coaching, advisory and, strategy planning. He has worked on a global level in countries like America, Australia, New Zealand, and Singapore. With his extraordinary rich core business experience, he has helped various business houses in India by guiding and sharing his entrepreneurial skills.</p>
                </div>
                <div className='aimg'>
                    {isLoadingAdminProfile ? (
                        <p>Loading...</p>
                    ) : (
                        <img src={adminImageUrl} alt="Admin Profile" />
                    )}
                    {error && <p>Error loading image</p>}
                </div>
            </div>
        </>
    );
}

export default About;
