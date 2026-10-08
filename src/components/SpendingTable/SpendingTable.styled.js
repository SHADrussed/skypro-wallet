import styled from 'styled-components'
import theme from '../../theme'

export const Page = styled.div`
  background-color: ${theme.colors.background};
  height: calc(100vh - 64px);
  padding: 36px 120px;
  gap: 32px;

  display: grid;

  grid-template-rows: 48px auto;
  grid-template-columns: repeat(12, 1fr);

  @media (max-width: 768px) {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    padding: 20px 16px 0;
    min-height: 0;
    background: ${theme.colors.surface};
    gap: 0;
  }
`

export const PageTitle = styled.h1`
  grid-column: span 12;
  margin-bottom: ${theme.spacing.xxl};
  align-self: center;

  @media (max-width: 768px) {
    margin: 0 0 24px;
    font-size: 24px;
    width: stretch;
  }
`
