import { Link } from 'react-router-dom'
import { Exit, HeaderS, Logo, NavBar, NavLink } from './Header.styled'
import { useAuth } from '../../context/ContextProvider'

const Header = ({ isSpendingTablePage }) => {
  const { isAuth, logout } = useAuth()
  return (
    <HeaderS>
      <Logo src="/logo.svg" alt="Skypro Wallet" />

      {isAuth && (
        <NavBar>
          <NavLink to="/" $active={isSpendingTablePage} $isSpending={true}>
            Мои расходы
          </NavLink>

          <NavLink to="/analytics" $active={!isSpendingTablePage}>
            Анализ расходов
          </NavLink>
        </NavBar>
      )}

      {isAuth && (
        <Exit onClick={logout}>Выход</Exit>
      )}
    </HeaderS>
  )
}

export default Header
