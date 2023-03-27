import { UserInterface } from '@/interfaces'
import { AuthState } from './'

type AuthAction = { type: 'LOGIN'; payload: UserInterface } | { type: 'LOGOUT' }

export const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
      }
    case 'LOGOUT':
      return {
        ...state,
        isLoggedIn: false,
        user: undefined,
      }
    default:
      return state
  }
}
