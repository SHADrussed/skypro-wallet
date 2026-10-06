import { Exit, HeaderS, NavBar, NavLink } from './Header.styled'

const Header = ({ isSpendingTablePage }) => {
  return (
    <HeaderS>
      <img src="/logo.svg" alt="" />

      <NavBar>
        <NavLink href="" $active={isSpendingTablePage}>
          Мои расходы
        </NavLink>

        <NavLink href="" $active={!isSpendingTablePage}>
          Анализ расходов
        </NavLink>
      </NavBar>

      <Exit>Выход</Exit>
    </HeaderS>
  )
}

export default Header
