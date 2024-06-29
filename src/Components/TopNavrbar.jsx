import React, { useState } from 'react'
import './TopNavrbar.css'
import { useSignOutAccount } from '../lib/react-query/queries'
import { useUserContext, INITIAL_USER } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import Loader2 from '../component/shared/Loader2'

function TopNavrbar() {
  const { mutate: signOut, isLoading: signOutAccountLoading } =
    useSignOutAccount()
  const navigate = useNavigate()
  const { user, setUser, setIsAuthenticated } = useUserContext()
  const [showRightSide, setShowRightSide] = useState(false)

  const handleSignOut = async (e) => {
    e.preventDefault()
    signOut()

    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsAuthenticated(false)
    setUser(INITIAL_USER)
    navigate('/sign-in')
  }

  const toggleRightSide = () => {
    setShowRightSide(!showRightSide)
  }

  return (
    <div className='navbar'>
      <div className='left'>
        <span style={{ fontWeight: 'bold' }}>Admin Dashboard</span>
        <i className='bi bi-search' style={{ marginLeft: '25px' }}></i>
      </div>

      <div className={`right ${showRightSide ? 'show' : ''}`}>
        <div className='user-info'>
          <span className='useremail'>{user.name}</span>
          <img
            width='32'
            height='32'
            style={{
              filter: 'invert(100%) sepia(0%) saturate(0%) hue-rotate(180deg)',
            }}
            src='https://img.icons8.com/windows/32/000000/system-administrator-male.png'
            alt='system-administrator-male'
          />
        </div>
   <button
  type='button'
  className='btn btn-pink'
  onClick={handleSignOut}
  disabled={signOutAccountLoading}
  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
>
  {signOutAccountLoading ? (
    <>
      <Loader2 /> Signing out...
    </>
  ) : (
    'Logout'
  )}
</button>


      </div>
      <div className='toggle-right' onClick={toggleRightSide}>
        <i className={`bi bi-caret-${showRightSide ? 'left' : 'right'}`}></i>
      </div>
    </div>
  )
}

export default TopNavrbar
