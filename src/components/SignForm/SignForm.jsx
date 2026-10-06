import { useAuth } from '../../context/ContextProvider'
import Header from '../Header/Header'
import {
  AuthPage,
  Form,
  FormCard,
  FormTitle,
  FormDescription,
  FormLink,
  FormButton,
  ErrorText,
  DisabledButton,
} from './SignForm.styled'
import BaseInput from './BaseInput'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

const SignForm = ({ isLogin = false }) => {
  const { login } = useAuth()
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    login: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    login: "",
    password: "",
  });

  const [error, setError] = useState("");

  const validateForm = () => {
    const newErrors = { name: "", login: "", password: "" };
    let isValid = true;

    if (!isLogin && !formData.name.trim()) {
      newErrors.name = true;
      setError("Заполните все поля");
      isValid = false;
    }

    if (!formData.login.trim()) {
      newErrors.login = true;
      setError("Заполните все поля");
      isValid = false;
    }

    if (!formData.password.trim()) {
      newErrors.password = true;
      setError("Заполните все поля");
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({ ...errors, [name]: false });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      login();
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };
  
  return (
    <div>
      <Header />
      <AuthPage>
        <FormCard>
          <FormTitle>{isLogin ? 'Вход' : 'Регистрация'}</FormTitle>
          <Form onSubmit={handleSubmit}>
            {!isLogin && (
              <BaseInput
                error={errors.name}
                type="text"
                name="name"
                id="formname"
                placeholder="Имя"
                value={formData.name}
                onChange={handleChange}
              />
            )}
            <BaseInput
              error={errors.login}
              type="text"
              name="login"
              id="formemail"
              placeholder="Эл. почта"
              value={formData.login}
              onChange={handleChange}
            />
            <BaseInput
              error={errors.password}
              type="password"
              name="password"
              id="formpassword"
              placeholder="Пароль"
              value={formData.password}
              onChange={handleChange}
            />
            {error && <ErrorText>{error}</ErrorText>}
            {!error ? <FormButton type="submit">
              {isLogin ? "Войти" : "Зарегистрироваться"}
            </FormButton> : 
            <DisabledButton>
              {isLogin ? "Войти" : "Зарегистрироваться"}
            </DisabledButton>}
            <FormDescription>
              {isLogin ? "Нужно зарегистрироваться?" : "Уже есть аккаунт?"}{" "}
              <FormLink as={Link} to={isLogin ? "/register" : "/login"}>
                {isLogin ? "Регистрируйтесь здесь" : "Войдите здесь"}
              </FormLink>
            </FormDescription>
          </Form>
        </FormCard>
      </AuthPage>
    </div>
  )
}

export default SignForm
