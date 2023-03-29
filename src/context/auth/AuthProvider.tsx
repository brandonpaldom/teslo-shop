import { tesloApi } from '@/api'
import { UserInterface } from '@/interfaces'
import axios from 'axios'
import Cookies from 'js-cookie'
import { signOut, useSession } from 'next-auth/react'
// import { useRouter } from 'next/router'
import { FC, useEffect, useReducer } from 'react'

import { AuthContext, authReducer } from './'

interface Props {
  children: React.ReactNode
}

export interface AuthState {
  isLoggedIn: boolean
  user?: UserInterface
}

const AUTH_INITIAL_STATE: AuthState = {
  isLoggedIn: false,
  user: undefined,
}

export const AuthProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE)
  const { data: session, status } = useSession()
  // const router = useRouter()

  useEffect(() => {
    if (status === 'authenticated') {
      dispatch({ type: 'LOGIN', payload: session.user as UserInterface })
    }
  }, [status, session])

  // const checkAuth = async () => {
  //   if (!Cookies.get('token')) {
  //     return
  //   }

  //   try {
  //     const { data } = await tesloApi.get('/user/validate-token')
  //     const { token, user } = data
  //     Cookies.set('token', token)
  //     dispatch({ type: 'LOGIN', payload: user })
  //   } catch (error) {
  //     Cookies.remove('token')
  //   }
  // }

  const loginUser = async (email: string, password: string): Promise<boolean> => {
    try {
      const { data } = await tesloApi.post('/user/login', { email, password })
      const { token, user } = data
      Cookies.set('token', token)
      dispatch({ type: 'LOGIN', payload: user })
      return true
    } catch (error) {
      return false
    }
  }

  const registerUser = async (name: string, email: string, password: string): Promise<{ error: boolean; message?: string }> => {
    try {
      const { data } = await tesloApi.post('/user/register', { name, email, password })
      const { token, user } = data
      Cookies.set('token', token)
      dispatch({ type: 'LOGIN', payload: user })

      return {
        error: false,
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          error: true,
          message: error.response?.data.message,
        }
      }

      return {
        error: true,
        message: 'Something went wrong',
      }
    }
  }

  const logoutUser = () => {
    Cookies.remove('cart')
    Cookies.remove('firstName')
    Cookies.remove('lastName')
    Cookies.remove('address')
    Cookies.remove('addressLine2')
    Cookies.remove('zipCode')
    Cookies.remove('city')
    Cookies.remove('state')
    Cookies.remove('phone')
    signOut()
  }

  return <AuthContext.Provider value={{ ...state, loginUser, registerUser, logoutUser }}>{children}</AuthContext.Provider>
}
