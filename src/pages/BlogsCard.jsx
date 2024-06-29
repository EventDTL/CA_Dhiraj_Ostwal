import React from 'react'
import './NewsBlogs.css';
import './BlogsCard.css' ;
export const BlogsCard = (props) => {
  return (
    <div className="boxtwo">
    <div className="imageboxtwo">
        <img src={props.img} alt="" className='imagebox2' />
    </div>
    <div className="headingtwo" >
    <h2>{props.heading}</h2>
    </div>
    <div className="descriptionwe">
    <p> {props.description} </p>
    </div>
    <div className="readmore">
    <button>पुढे वाचा</button>
    </div>

</div>
  )
};
BlogsCard.defaultProps = {
    img: './src/images/pmmodi.jpeg',
    heading: 'यूपी में BJP की हार के बाद सामने आई पहली गड़बड़ी, समर्थकों को ही लगा दिया किनारे',
    description: 'मनस्वीस्वागत ! देशाचे कर्तव्यदक्ष पंतप्रधान मा.श्री.नरेंद्र मोदीजींच्या शुभहस्ते पुण्यनगरीत विविध विकास प्रकल्पांचे उद्घाटन आणि लोकार्पण आज संपन्न झाले. त्याचप्रमाणे लोकमान्य'
  };
export default BlogsCard ;