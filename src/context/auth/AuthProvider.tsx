import { FC, useEffect, useReducer } from 'react'
import { useRouter } from 'next/router'
import { AuthContext, authReducer } from './'
import { UserInterface } from '@/interfaces'
import { tesloApi } from '@/api'
import Cookies from 'js-cookie'
import axios from 'axios'

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
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    if (!Cookies.get('token')) {
      return
    }

    try {
      const { data } = await tesloApi.get('/user/validate-token')
      const { token, user } = data
      Cookies.set('token', token)
      dispatch({ type: 'LOGIN', payload: user })
    } catch (error) {
      Cookies.remove('token')
    }
  }

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
    Cookies.remove('token')
    Cookies.remove('cart')
    router.reload()
  }

  return <AuthContext.Provider value={{ ...state, loginUser, registerUser, logoutUser }}>{children}</AuthContext.Provider>
}
