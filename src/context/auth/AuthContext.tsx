import { createContext } from 'react'
import { UserInterface } from '@/interfaces'

interface AuthContextProps {
  isLoggedIn: boolean
  user?: UserInterface
  loginUser: (email: string, password: string) => Promise<boolean>
  registerUser: (name: string, email: string, password: string) => Promise<{ error: boolean; message?: string }>
}

export const AuthContext = createContext({} as AuthContextProps)
