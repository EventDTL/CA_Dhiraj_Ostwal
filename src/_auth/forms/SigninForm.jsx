import React from 'react'
import { useState } from 'react'

import { useNavigate } from 'react-router-dom'
import { useUserContext } from '../../context/AuthContext'
import {
  useSignInAccount,
  useCreatAdminAccount,
} from '../../lib/react-query/queries'
import './SigninForm.css'
import Loader2 from '../../component/shared/Loader2'

const SigninForm = () => {
  const navigate = useNavigate()
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext()
  const { mutateAsync: signInAccount, isLoading } = useSignInAccount()
  const { mutateAsync: createAccount, isAccountLoading } =
    useCreatAdminAccount()

  const [user, setUser] = useState({
    email: 'dhirajostwal@gmail.com',
    password: 'dhiraj@123',
    name: 'Dhiraj Ostwal',
    username: 'cadhirajostwal',
  })
  const handleSignin = async (event) => {
    event.preventDefault()
    const data = new FormData(event.target)
    const formData = Object.fromEntries(data.entries())

    const session = await signInAccount(formData)

    if (!session) {
      console.log('Login Failed')
      return
    }

    const isLoggedIn = await checkAuthUser()
    if (isLoggedIn) {
      event.target.reset()
      navigate('/')
    } else {
      toast({ title: 'Login failed. Please try again.' })
    }
  }

  const handleDemoLogin = async () => {
    const demoCredentials = {
      email: 'dhirajostwal@gmail.com',
      password: 'dhiraj@123',
    }
    // const result = await createAccount(user)
    // console.log(result)

    const session = await signInAccount(demoCredentials)

    if (!session) {
      console.log('Demo Login Failed')
      return
    }

    const isLoggedIn = await checkAuthUser()
    if (isLoggedIn) {
      navigate('/')
    } else {
      console.log('Login Failed')
    }
  }

  return (
    <div className='containerform py-10'>
      <h3>Admin Login</h3>
      <form onSubmit={handleSignin} className='w-100'>
        <div className='mb-3'>
          <label htmlFor='email' className='form-label'>
            Email
          </label>
          <input
            type='email'
            id='email'
            name='email'
            className='form-control'
            placeholder='Enter email'
          />
        </div>

        <div className='mb-3'>
          <label htmlFor='password' className='form-label'>
            Password
          </label>
          <input
            type='password'
            id='password'
            name='password'
            className='form-control'
            placeholder='Password'
          />
        </div>
 <button onClick={handleDemoLogin} className='signin-btn btn btn-primary' style={{ position: 'relative' }}>
      {isLoading ? (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Loader2 />
          <span style={{ marginLeft: '50px', position: 'absolute', top: '50%', transform: 'translateY(-50%)' }}>Loading...</span> 
        </div>
      ) : (
        'Log in'
      )}
    </button>

        {/* <button
          type='button'
          className='btn btn-secondary mb-3 ms-2'
          onClick={handleDemoLogin}
        >
          Demo Login
        </button> */}
      </form>
    </div>
  )
}

export default SigninForm
