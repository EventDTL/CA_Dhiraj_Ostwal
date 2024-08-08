import React from 'react'
import Cards from '../component/ui/Cards'
import ImgSlider from '../component/ui/ImgSlider'
import Award from './Award'
import CardSlider from '../component/ui/Cards'
import FollowUs from './FollowUs'
import Achievements from './Achievements'
import About from './About'
import Employee from './Employee'
import Eventgallary from './Eventgallary'
import Followcard from './Followcard'

function Home() {
  return (
  
    <>
    <ImgSlider/>
    <About/>
    <Achievements/>
    <Cards/>
    <Employee/>
    <Award/>
    <Eventgallary/>
    <FollowUs/>
    {/* <Followcard/> */}
    </>
  )
}

export default Home;