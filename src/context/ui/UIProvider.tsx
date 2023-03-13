import { FC, useReducer } from 'react'
import { UIContext, uiReducer } from './'

interface Props {
  children: React.ReactNode
}

export interface UIState {
  isSidebarOpen: boolean
}

const UI_INITIAL_STATE: UIState = {
  isSidebarOpen: false,
}

export const UIProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE)

  const toggleSidebar = () => {
    dispatch({ type: 'TOGGLE_SIDEBAR' })
  }

  return <UIContext.Provider value={{ ...state, toggleSidebar }}>{children}</UIContext.Provider>
}
