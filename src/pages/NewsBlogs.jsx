import React, { useState } from 'react';
import './NewsBlogs.css'
import NewsCar from './NewsCar';
import NewsData from './NewsData' ;
import { BlogsCard } from './BlogsCard';
const listen = NewsData.map((item)=>{
    return (
        <NewsCar
        img = {item.imgscr}
        heading = {item.nname}
        descri = {item.descri}
        />
    )
})

const listenblo = NewsData.map((item)=>{
    return (
        <BlogsCard
        img = {item.imgscr}
        heading = {item.nname}
        description = {item.descri}
   />
)
})
const News = () => {
    return (
        <>
        
        <div className="main-container">

           {listen}

</div>

        </>
    );
};

const Blogs = () => {
    return (
        <>
          <div className="main-containerblo">

            {listenblo}
        
            </div>
        
        </>
    );
};

const NewsBlogs = () => {
    const [showNews, setShowNews] = useState(true); // Initially hidden
    const [showBlogs, setShowBlogs] = useState(false); // Initially hidden

    return (
        <>
        <div className='togglebar'>
            
                <div className='toggleone'>
                <button onClick={() => setShowNews(!showNews)}>News</button>
                </div>
                <div className='togggletwo'>
                <button onClick={() => setShowBlogs(!showBlogs)}>Blogs</button>
                </div>
            
                </div>
            {showNews && <News />}
            {showBlogs && <Blogs />}
            
        
        </>
    );
};

export default NewsBlogs;