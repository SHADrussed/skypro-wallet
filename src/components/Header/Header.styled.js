import styled from 'styled-components'
import theme from '../../theme'
import { NavLink as RouterNavLink } from 'react-router-dom'

export const HeaderS = styled.header`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;

  padding: 20px 120px;
`

export const Logo = styled.img`
  justify-self: start;
`

export const NavBar = styled.nav`
  display: flex;
  gap: ${theme.spacing.xxxl};

  justify-self: center;
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
`

export const Exit = styled.a`
  justify-self: end;

  font-weight: ${theme.typography.fontWeight.semibold};
  font-size: ${theme.typography.fontSize.body};
  line-height: ${theme.typography.lineHeight.body};
  text-decoration: none;
  color: ${theme.colors.text};
`
