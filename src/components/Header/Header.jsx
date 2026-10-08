import { Link } from 'react-router-dom'
import { ExitButton, HeaderS, NavBar, NavLink } from './Header.styled'
import { useAuth } from '../../context/ContextProvider'

const Header = () => {
  const { isAuth, logout } = useAuth()
  return (
    <HeaderS>
      <img src="/logo.svg" alt="" />

      {isAuth && (
        <NavBar>
          <NavLink href="" $active={true}>
            Мои расходы
          </NavLink>

          <NavLink href="" $active={false}>
            Анализ расходов
          </NavLink>
        </NavBar>
      )}

      {isAuth && (
        <ExitButton>
          <Link onClick={logout}>
            Выход
          </Link>
        </ExitButton>
      )}
    </HeaderS>
  )
}

export default Header
