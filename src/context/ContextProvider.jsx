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

  const login = () => {
    setIsAuth(true)
    localStorage.setItem('userInfo', JSON.stringify({}))
  }

  return (
    <AuthContext.Provider value={{ isAuth, login, logout }}>
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
