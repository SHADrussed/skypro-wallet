import styled from 'styled-components'
import theme from '../../theme'
import { NavLink as RouterNavLink } from 'react-router-dom'

export const HeaderS = styled.header`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
  align-items: center;
  gap: 16px;
  min-height: 64px;
  padding: 20px clamp(24px, 8.333vw, 120px);
  background: ${theme.colors.surface};
  @media (max-width: 768px) {
    grid-template-columns: auto minmax(0, 1fr) auto;
    gap: 8px;
    min-height: 54px;
    padding: 16px;
    background: ${theme.colors.background};
  }
`
export const Logo = styled.img`
  justify-self: start;
  width: 174px;
  max-width: 100%;
  @media (max-width: 768px) {
    width: clamp(96px, 29.4vw, 110px);
  }
`
export const NavBar = styled.nav`
  display: flex;
  gap: ${theme.spacing.xxxl};
  justify-self: center;
  @media (max-width: 768px) {
    display: none;
  }
`
export const NavLink = styled(RouterNavLink)`
  font-size: ${theme.typography.fontSize.body};
  text-decoration: none;
  white-space: nowrap;
  border-bottom: ${({ $active }) => ($active ? `1px solid ${theme.colors.primary}` : 'none')};
  color: ${({ $active }) => ($active ? theme.colors.primary : theme.colors.text)};
  font-weight: ${({ $active }) => ($active ? theme.typography.fontWeight.semibold : theme.typography.fontWeight.regular)};
`
export const MobileNavigation = styled.div`
  display: none;
  min-width: 0;
  position: relative;
  @media (max-width: 768px) {
    display: block;
    justify-self: center;
    max-width: 100%;
  }
`
export const MenuButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  max-width: 100%;
  padding: 0;
  border: 0;
  background: transparent;
  font: inherit;
  font-size: 12px;
  font-weight: 600;
  color: ${theme.colors.primary};
  cursor: pointer;
  span:first-child {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-bottom: 1px solid;
  }
  span:last-child {
    color: ${theme.colors.text};
  }
  @media (max-width: 350px) {
    font-size: 11px;
    gap: 4px;
  }
`
export const MenuPanel = styled.nav`
  position: absolute;
  top: calc(100% + 12px);
  right: 0;
  z-index: 30;
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 148px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  background: ${theme.colors.surface};
`
export const MenuLink = styled(RouterNavLink)`
  display: block;
  padding: 7px 6px;
  border-radius: 20px;
  background: ${({ $active }) => ($active ? theme.colors.inputFocus : theme.colors.background)};
  color: ${({ $active }) => ($active ? theme.colors.primary : theme.colors.text)};
  font-size: 10px;
  text-align: center;
  text-decoration: none;
  white-space: nowrap;
`
export const Exit = styled.button`
  background: transparent;
  border: 0;
  padding: 0;
  justify-self: end;
  font: inherit;
  font-weight: ${theme.typography.fontWeight.semibold};
  font-size: ${theme.typography.fontSize.body};
  color: ${theme.colors.text};
  cursor: pointer;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`
