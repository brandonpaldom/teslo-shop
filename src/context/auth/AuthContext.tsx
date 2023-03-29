import { UserInterface } from '@/interfaces'
import { createContext } from 'react'

interface AuthContextProps {
  isLoggedIn: boolean
  user?: UserInterface
  loginUser: (email: string, password: string) => Promise<boolean>
  registerUser: (name: string, email: string, password: string) => Promise<{ error: boolean; message?: string }>
  logoutUser: () => void
}

export const AuthContext = createContext({} as AuthContextProps)
