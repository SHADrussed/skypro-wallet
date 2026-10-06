import styled from 'styled-components'
import theme from '../../theme'

export const HeaderS = styled.header`
  display: flex;
  padding: 20px 120px;
  flex-direction: row;
  justify-content: space-between;
`

export const NavBar = styled.nav`
  display: flex;
  gap: ${theme.spacing.xxxl};
  flex-direction: row;
`

export const NavLink = styled.a`
  font-weight: ${theme.typography.fontWeight.regular};
  font-size: ${theme.typography.fontSize.body};
  line-height: ${theme.typography.lineHeight.body};

  text-decoration: none;
  border-bottom: ${({ $active }) => ($active ? `1px solid  ${theme.colors.primary}` : 'none')};

  color: ${({ $active }) =>
    $active ? theme.colors.primary : theme.colors.text};
`

export const ExitButton = styled.button`
  border: none;
  background-color: #fff;
  font-weight: ${theme.typography.fontWeight.semibold};
  font-size: ${theme.typography.fontSize.body};
  line-height: ${theme.typography.lineHeight.body};
  & a {
    color: ${theme.colors.text};
    text-decoration: none;
  }
  & a:hover {
    color: ${theme.colors.primary};
  }
`
