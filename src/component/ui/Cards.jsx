import React, { useState, useEffect, useRef } from 'react'
import './Cards.css' // Make sure to adjust the path if necessary

const CardSlider = () => {
  const videos = [
    {
      url: 'https://www.youtube.com/embed/BGKH1FJ2YkQ?si=vNtD6NTCukvhXJ0u',
      title: 'YouTube video player 1',
    },
    {
      url: 'https://www.youtube.com/embed/L-U8XJAzJak?si=O5LehgZDrmSy_cSJ',
      title: 'YouTube video player 2',
    },
    {
      url: 'https://www.youtube.com/embed/EIQOLf5KpYc?si=3mYvXOXus1dYUh0B',
      title: 'YouTube video player 3',
    },
    {
      url: 'https://www.youtube.com/embed/EIQOLf5KpYc?si=3mYvXOXus1dYUh0B',
      title: 'YouTube video player 4',
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const totalSlides = videos.length
  const intervalRef = useRef(null)
  const autoScrollDelay = 3000

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % (totalSlides * 2))
  }

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + totalSlides * 2) % (totalSlides * 2)
    )
  }

  useEffect(() => {
    intervalRef.current = setInterval(nextSlide, autoScrollDelay)

    return () => {
      clearInterval(intervalRef.current)
    }
  }, [])

  useEffect(() => {
    if (currentIndex === totalSlides) {
      setTimeout(() => {
        setCurrentIndex(0)
      }, 500) // Adjust this timeout to match the transition duration
    }
  }, [currentIndex, totalSlides])

  const handleMouseEnter = () => {
    clearInterval(intervalRef.current)
  }

  const handleMouseLeave = () => {
    intervalRef.current = setInterval(nextSlide, autoScrollDelay)
  }

  return (
    <>
    <div className='youtebe'><h2><span>Our</span> Youtube channel</h2></div>
    <div className='slide-container'>
      <div
        className='slide-content'
        style={{
          transform: `translateX(-${(currentIndex % totalSlides) * 100}%)`,
          transition:
            currentIndex === totalSlides ? 'none' : 'transform 0.5s ease',
        }}
      >
        {[...videos, ...videos].map((video, index) => (
          <div
            className='card'
            key={index}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className='card-content-wrapper'>
              <div className='image-content'>
                <iframe
                  width='560'
                  height='315'
                  src={video.url}
                  title={video.title}
                  frameBorder='0'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                  referrerPolicy='strict-origin-when-cross-origin'
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className='navBtn left' onClick={prevSlide}>
        &lt;
      </div>
      <div className='navBtn right' onClick={nextSlide}>
        &gt;
      </div>
    </div>
    </>
  )
}

export default CardSlider
