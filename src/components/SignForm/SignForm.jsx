import { useAuth } from '../../context/ContextProvider'
import Header from '../Header/Header'
import {
  AuthPage,
  Form,
  FormCard,
  FormInput,
  FormTitle,
} from './SignForm.styled'

const SignForm = ({ isLogin = false, isRegister = false }) => {
  const { Auth, setAuth } = useAuth()
  return (
    <div>
      <Header />
      <AuthPage>
        <FormCard>
          <FormTitle>{isLogin ? 'Вход' : 'Регистрация'}</FormTitle>
          <Form>
            <FormInput></FormInput>
            <FormInput></FormInput>
          </Form>
        </FormCard>
      </AuthPage>
    </div>
  )
}

export default SignForm
