import { Exit, HeaderS, Logo, NavBar, NavLink } from './Header.styled'

const Header = ({ isSpendingTablePage }) => {
  return (
    <HeaderS>
      <Logo src="/logo.svg" alt="Skypro Wallet" />

      <NavBar>
        <NavLink to="/" $active={isSpendingTablePage} $isSpending={true}>
          Мои расходы
        </NavLink>

        <NavLink to="/analytics" $active={!isSpendingTablePage}>
          Анализ расходов
        </NavLink>
      </NavBar>

      <Exit>Выход</Exit>
    </HeaderS>
  )
}

export default Header
