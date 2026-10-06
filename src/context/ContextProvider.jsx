import { useContext, useState } from 'react'
import { AuthContext } from './ContextAPI'

export const AuthContextProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(() =>
    Boolean(localStorage.getItem('userInfo')),
  )

  const logout = () => {
    setIsAuth(false)
    localStorage.removeItem('userInfo')
  }

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth должен использоваться внутри AuthProvider')
  }
  return context
}
