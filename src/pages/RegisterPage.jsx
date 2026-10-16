import { Navigate } from 'react-router-dom'
import SignForm from '../components/SignForm/SignForm'
import { useAuth } from '../context/useAuth'

const RegisterPage = () => {
  const { isAuth } = useAuth()
  return isAuth ? <Navigate to="/" replace /> : <SignForm isLogin={false} />
}

export default RegisterPage
