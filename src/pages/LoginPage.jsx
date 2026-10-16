import { Navigate } from 'react-router-dom'
import SignForm from '../components/SignForm/SignForm'
import { useAuth } from '../context/useAuth'

const LoginPage = () => {
  const { isAuth } = useAuth()
  return isAuth ? <Navigate to="/" replace /> : <SignForm isLogin={true} />
}

export default LoginPage
