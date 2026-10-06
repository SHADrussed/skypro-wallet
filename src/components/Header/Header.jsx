import { Link } from 'react-router-dom'
import { ExitButton, HeaderS, NavBar, NavLink } from './Header.styled'
import { useAuth } from '../../context/ContextProvider'

const Header = () => {
  const { Auth } = useAuth()
  return (
    <HeaderS>
      <img src="/logo.svg" alt="" />

      {Auth && (
        <NavBar>
          <NavLink href="" $active={true}>
            Мои расходы
          </NavLink>

          <NavLink href="" $active={false}>
            Анализ расходов
          </NavLink>
        </NavBar>
      )}

      {Auth && (
        <ExitButton>
          <Link to={'/login'}>Выход</Link>
        </ExitButton>
      )}
    </HeaderS>
  )
}

export default Header
