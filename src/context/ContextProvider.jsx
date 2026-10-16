import { useContext, useState } from 'react'
import { AuthContext } from './ContextAPI'
import { Login, Register } from '../services/auth'

export const AuthContextProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(() => {
    try {
      return Boolean(JSON.parse(localStorage.getItem('userInfo') || 'null')?.token)
    } catch {
      return false
    }
  })

  const login = async (formData, isLogin) => {
    const data = isLogin
      ? await Login(formData)
      : await Register({
          name: formData.name,
          login: formData.login,
          password: formData.password,
        })

    if (!data?.token) {
      throw new Error('Сервер не вернул токен авторизации')
    }

    localStorage.setItem('userInfo', JSON.stringify({
      token: data.token,
      id: data.id,
      login: data.login,
      name: data.name,
    }))
    setIsAuth(true)
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
