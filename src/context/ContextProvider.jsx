import { useContext, useState } from 'react'
import { AuthContext } from './ContextAPI'
import { Login, Register } from '../services/auth'

export const AuthContextProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(() =>
    Boolean(localStorage.getItem('userInfo')),
  )

  const login = async (formData, isLogin) => {
    const data = isLogin
      ? await Login(formData)
      : await Register({
          name: formData.name,
          login: formData.login,
          password: formData.password,
        })

    if (data) {
      setIsAuth(true)
      localStorage.setItem('userInfo', JSON.stringify(data))
    }
  }

  const logout = () => {
    setIsAuth(false)
    localStorage.removeItem('userInfo')
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
