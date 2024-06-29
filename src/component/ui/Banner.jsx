import React from 'react'
import './Banner.css'

const Banner = ({ imageUrl, breadcrumb, headline }) => {
  return (
    <div
      className='banner-container'
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <div className='banner-content'>
        <h4>{breadcrumb}</h4>
        <h1>{headline}</h1>
      </div>
    </div>
  )
}

export default Banner
