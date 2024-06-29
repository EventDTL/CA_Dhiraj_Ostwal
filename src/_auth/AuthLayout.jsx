import { useUserContext } from '../context/AuthContext'
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const AuthLayout = () => {
  const isAuthenticated = useUserContext()
  console.log(`User Authentication : ${isAuthenticated.isAuthenticated}`)

  return (
    <div className='w-full md:flex'>
      {isAuthenticated.isAuthenticated ? (
        <Navigate to='/' />
      ) : (
        <section className='flex items-center justify-center flex-1'>
          <Outlet />
        </section>
      )}
    </div>
  )
}

export default AuthLayout
