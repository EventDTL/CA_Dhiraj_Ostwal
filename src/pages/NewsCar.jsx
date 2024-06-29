import React from 'react'
import './NewsBlogs.css' ;
import './Newscar.css'
const NewsCar = (props) => {
  return (
    <>
   <div className="boxone">
                <div className="image-banner">
                    <img src={props.img} alt="" className='imageone'/>
                </div>
                <div className="head-banner">
                    <div className="heading">
                        <h1>{props.heading}</h1>
                    </div>
                    <div className="description">
                        <h6>{props.descri}</h6>
                    </div>
                    
                </div>

            </div>
   </>
  )
  
}

export default NewsCar ;