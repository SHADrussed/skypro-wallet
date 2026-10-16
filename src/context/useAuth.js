import { useContext } from 'react'
import { AuthContext } from './ContextAPI'

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth должен использоваться внутри AuthContextProvider')
  }

  return context
}
