import { UIState } from './'

type UIAction = {
  type: 'TOGGLE_SIDEBAR'
}

export const uiReducer = (state: UIState, action: UIAction): UIState => {
  switch (action.type) {
    case 'TOGGLE_SIDEBAR':
      return {
        ...state,
        isSidebarOpen: !state.isSidebarOpen,
      }
    default:
      return state
  }
}
