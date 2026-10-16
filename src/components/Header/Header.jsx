import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import {
  Exit,
  HeaderS,
  Logo,
  NavBar,
  NavLink,
  MobileNavigation,
  MenuButton,
  MenuPanel,
  MenuLink,
} from './Header.styled'
import { useAuth } from '../../context/useAuth'

const Header = ({ isSpendingTablePage }) => {
  const { isAuth, logout } = useAuth()
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef(null)
  const isAnalytics = location.pathname.startsWith('/analytics')
  const isNewExpense =
    new URLSearchParams(location.search).get('expense') === 'new'
  const currentLabel = isAnalytics
    ? 'Анализ расходов'
    : isNewExpense
      ? 'Новый расход'
      : 'Мои расходы'
  useEffect(() => {
    if (!isOpen) return
    const dismiss = (event) => {
      if (event.type === 'keydown' && event.key === 'Escape') {
        setIsOpen(false)
        menuRef.current?.querySelector('button')?.focus()
      } else if (
        event.type === 'pointerdown' &&
        !menuRef.current?.contains(event.target)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener('pointerdown', dismiss)
    document.addEventListener('keydown', dismiss)
    return () => {
      document.removeEventListener('pointerdown', dismiss)
      document.removeEventListener('keydown', dismiss)
    }
  }, [isOpen])
  const closeMenu = () => setIsOpen(false)
  return (
    <HeaderS>
      <Logo src="/logo.svg" alt="Skypro Wallet" />
      {isAuth && (
        <>
          <NavBar aria-label="Основная навигация">
            <NavLink to="/" $active={isSpendingTablePage}>
              Мои расходы
            </NavLink>
            <NavLink to="/analytics" $active={isAnalytics}>
              Анализ расходов
            </NavLink>
          </NavBar>
          <MobileNavigation ref={menuRef}>
            <MenuButton
              type="button"
              aria-label={`Навигация: ${currentLabel}`}
              aria-expanded={isOpen}
              aria-controls="wallet-mobile-navigation"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span>{currentLabel}</span>
              <span aria-hidden="true">▾</span>
            </MenuButton>
            {isOpen && (
              <MenuPanel
                id="wallet-mobile-navigation"
                aria-label="Мобильная навигация"
              >
                <MenuLink
                  to="/"
                  $active={!isAnalytics && !isNewExpense}
                  onClick={closeMenu}
                >
                  Мои расходы
                </MenuLink>
                <MenuLink
                  to="/?expense=new"
                  $active={isNewExpense}
                  onClick={closeMenu}
                >
                  Новый расход
                </MenuLink>
                <MenuLink
                  to="/analytics"
                  $active={isAnalytics}
                  onClick={closeMenu}
                >
                  Анализ расходов
                </MenuLink>
              </MenuPanel>
            )}
          </MobileNavigation>
        </>
      )}
      {isAuth && <Exit onClick={logout}>Выйти</Exit>}
    </HeaderS>
  )
}
export default Header
