import { Exit, HeaderS, NavBar, NavLink } from './Header.styled'

const Header = () => {
  return (
    <HeaderS>
      <img src="/logo.svg" alt="" />

      <NavBar>
        <NavLink href="" $active={true}>
          Мои расходы
        </NavLink>

        <NavLink href="" $active={false}>
          Анализ расходов
        </NavLink>
      </NavBar>

      <Exit>Выход</Exit>
    </HeaderS>
  )
}

export default Header
