import React, { useState, useEffect } from 'react';
import './Cards.css'; // Adjust the path as needed
import { useGetAllYoutube } from '../../lib/react-query/queries';
import leftArrowIcon from './assets/left.png'; // Adjust path as needed
import rightArrowIcon from './assets/right.png'; // Adjust path as needed

const CardSlider = () => {
    const { data: youtubeData, isLoading: isLoadingYoutube } = useGetAllYoutube();
    const [videos, setVideos] = useState([]);
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

    useEffect(() => {
        if (youtubeData) {
            setVideos(youtubeData.documents);
        }
    }, [youtubeData]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentVideoIndex(prevIndex => (prevIndex + 1) % videos.length);
        }, 15000);

        return () => clearInterval(interval);
    }, [videos]);

    const nextVideo = () => {
        setCurrentVideoIndex(prevIndex => (prevIndex + 1) % videos.length);
    };

    const prevVideo = () => {
        setCurrentVideoIndex(prevIndex => (prevIndex - 1 + videos.length) % videos.length);
    };

    if (isLoadingYoutube) {
        return <div>Loading...</div>;
    }

    if (!videos || videos.length === 0) {
        return <div>No videos available</div>;
    }

    const currentVideo = videos[currentVideoIndex];

    return (
        <div className="card-slider">
            <h2>My YouTube Channels</h2>
            <div className="video-wrapper">
                <iframe
                    width="100%"
                    height="315"
                    src={currentVideo.YoutubeUrl}
                    title={currentVideo.Title}
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                />
            </div>
            <div className="video-label">
                <h3>{currentVideo.Title}</h3>
            </div>
            <div className="navigation-buttons">
                <img
                    src={leftArrowIcon}
                    alt="Previous"
                    className="nav-arrow right"
                    onClick={prevVideo}
                />
                <img
                    src={rightArrowIcon}
                    alt="Next"
                    className="nav-arrow right"
                    onClick={nextVideo}
                />
            </div>
        </div>
    );
};

export default CardSlider;
