import './App.css'
import { Route, Routes } from 'react-router-dom'
import { useEffect, useState } from 'react';

import React from 'react'
// import {BrowserRouter} from "react-router-dom";
// Pages
import Home from './pages/Home'
import Gallary from './pages/Gallary.jsx'
import Contact from './pages/Contact.jsx'
import Cards from './pages/WWDCards.jsx'
import ServicePage from './pages/services/ServicePage'

//Navbar Footer
import Navbar from './component/ui/Navbar'
import Footer from './pages/Footer'
import Careers from './pages/Careers.jsx'
import MainAchieve from './pages/MainAchieve.jsx'
import Profile from './pages/Profile.jsx'
import NewsBlogs from './pages/NewsBlogs.jsx'

// Admin Pages
import AuthLayout from './_auth/AuthLayout.jsx'
import SigninForm from './_auth/forms/SigninForm'
import { useUserContext } from './context/AuthContext'

// Navbar and Footer
import SideNavbar from './Components/SideNavbar'
import TopNavbar from './Components/TopNavrbar'
import Dashboard from './_root/pages/Dashboard'

//DashBoard
import AdminHome from './_root/pages/AdminHome'
import Services from './_root/pages/Services.jsx'
import SubServices from './_root/pages/SubServices.jsx'
import Career from './_root/pages/Career.jsx'
import Contact1 from './_root/pages/Contact.jsx'
import Employee1 from './_root/pages/Employee.jsx'
import Meetings from './_root/pages/Meetings.jsx'
import PhotoGallery from './_root/pages/PhotoGallery.jsx'
import { useGetAdminProfile } from './lib/react-query/queries.js';

function App() {
  const { isAuthenticated, isLoading } = useUserContext();
  const [isAdminAuthenticated, isSetAuthenticated] = useState(false);
  useGetAdminProfile()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if(!isLoading && isAuthenticated ) 
          {
            isSetAuthenticated(true)
          }
          else if(!isAuthenticated && !isLoading)
          {
            isSetAuthenticated(false)
          }
      } catch (error) {
        isSetAuthenticated(false)
        console.error(error);
      } 
    };
    checkAuth()
  }, [isAuthenticated,isLoading]);

  return (
    <>
      {isAdminAuthenticated  ? (
          <>
          <TopNavbar />
          <div className='main-container1'>
            <SideNavbar />
            <div className='content1'>
              <Routes>
                <Route path='/' element={<Dashboard />} />
                <Route path='/adminHome' element={<AdminHome />} />
                <Route path='/adminservices' element={<Services />} />
                <Route path='/career' element={<Career />} />
                <Route path='/Photogallery' element={<PhotoGallery />} />
                <Route path='/meetings' element={<Meetings />} />
                <Route path='/contact' element={<Contact1 />} />
                <Route path='/employee' element={<Employee1 />} />
                <Route path='/subservices/:serviceId' element={<SubServices />} />
              </Routes>
            </div>
          </div>
        </>
       
      ) : (
     <>
          <Navbar />
          <div className='content2'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/gallary' element={<Gallary />} />
              <Route path='/cards' element={<Cards />} />
              <Route path='/contact' element={<Contact />} />
              <Route path='/career' element={<Careers />} />
              <Route path='/mainachieve' element={<MainAchieve />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/newsblogs' element={<NewsBlogs />} />
              <Route path='/services/:serviceName' element={<ServicePage />} />
              
              <Route element={<AuthLayout />}>
                <Route path='/sign-in' element={<SigninForm />} />
              </Route>

            </Routes>
          </div>
          <Footer />
        </>
      )}
    </>
  );
}

export default App;