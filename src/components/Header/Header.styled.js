import styled from 'styled-components'
import theme from '../../theme'
import { NavLink as RouterNavLink } from 'react-router-dom'

export const HeaderS = styled.header`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;

  padding: 20px 120px;
  background-color: ${theme.colors.surface};
  @media screen and (max-width: 375px) {
    padding: 20px 16px;
    background-color: ${theme.colors.background};
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr auto 1fr;
    padding: 16px;
  }
`

export const Logo = styled.img`
  justify-self: start;

  @media (max-width: 768px) {
    width: 104px;
    max-width: 100%;
  }
`

export const NavBar = styled.nav`
  display: flex;
  gap: ${theme.spacing.xxxl};

  justify-self: center;

  @media (max-width: 768px) {
    justify-self: center;
    gap: 0;
  }
`

export const NavLink = styled(RouterNavLink)`
  font-weight: ${theme.typography.fontWeight.regular};
  font-size: ${theme.typography.fontSize.body};
  height: fit-content;

  text-decoration: none;
  border-bottom: ${({ $active, $isSpending }) =>
    $active
      ? `1px solid ${
          $isSpending ? theme.colors.primary : theme.colors.chart.green
        }`
      : 'none'};

  color: ${({ $active, $isSpending }) =>
    $active
      ? $isSpending
        ? theme.colors.primary
        : theme.colors.chart.green
      : theme.colors.text};

  font-weight: ${({ $active }) =>
    $active
      ? `${theme.typography.fontWeight.bold}`
      : `${theme.typography.fontWeight.regular}`};
  @media (max-width: 768px) {
    display: none;

    &:last-child {
      display: block;
      font-size: 12px;
      white-space: nowrap;
    }
  }
`

export const Exit = styled.a`
  justify-self: end;

  font-weight: ${theme.typography.fontWeight.semibold};
  font-size: ${theme.typography.fontSize.body};
  line-height: ${theme.typography.lineHeight.body};
  text-decoration: none;
  color: ${theme.colors.text};
  cursor: pointer;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`
