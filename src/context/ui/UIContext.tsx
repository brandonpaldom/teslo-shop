import { createContext } from 'react'

interface UIContextProps {
  isSidebarOpen: boolean
  toggleSidebar: () => void
}

export const UIContext = createContext({} as UIContextProps)
