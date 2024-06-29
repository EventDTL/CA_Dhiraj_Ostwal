import React, { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IUser } from '../types/index'
import { getCurrentUser } from '../lib/appwrite/api'

export const INITIAL_USER: typeof IUser = {
  id: '',
  username: '',
  name: '',
  email: '',
}

interface IAuthContext {
  user: typeof IUser
  isLoading: boolean
  isAuthenticated: boolean
  setUser: React.Dispatch<React.SetStateAction<typeof IUser>>
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  checkAuthUser: () => Promise<boolean>
}

const INITIAL_STATE: IAuthContext = {
  user: INITIAL_USER,
  isLoading: false,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => false,
}

const AuthContext = createContext<IAuthContext>(INITIAL_STATE)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate()
  const [user, setUser] = useState<typeof IUser>(INITIAL_USER)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const checkAuthUser = async () => {
    setIsLoading(true)
    try {
      const currentAccount = await getCurrentUser()

      if (currentAccount) {
        setUser({
          id: currentAccount.$id,
          username: currentAccount.UserName,
          name: currentAccount.Name,
          email: currentAccount.Email,
        })
        setIsAuthenticated(true)
        return true
      }

      return false
    } catch (error) {
      console.error(error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const cookieFallback = localStorage.getItem('cookieFallback')
    checkAuthUser()
    if (!cookieFallback || cookieFallback === '[]') {
      // navigate('/')
    }
  }, [navigate])

  const value: IAuthContext = {
    user,
    setUser,
    isLoading,
    isAuthenticated,
    setIsAuthenticated,
    checkAuthUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useUserContext = () => useContext(AuthContext)
