import { Link } from 'react-router-dom'
import styled from 'styled-components'
import theme from '../../theme'

const StyledLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
  min-height: 32px;
  color: ${theme.colors.textSecondary};
  font-size: 14px;
  text-decoration: none;
  &:focus-visible {
    outline: 2px solid ${theme.colors.chart.greenText};
  }
`
export default function BackLink({ to, children, onClick }) {
  return (
    <StyledLink to={to} onClick={onClick}>
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        aria-hidden="true"
      >
        <rect x="1" y="1" width="12" height="12" rx="3" stroke="currentColor" />
        <path
          d="M10 7H4M6.5 4.5 4 7l2.5 2.5"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {children}
    </StyledLink>
  )
}
