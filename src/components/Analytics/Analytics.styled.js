import styled from 'styled-components'
import theme from '../../theme'

export const Page = styled.div`
  background-color: ${theme.colors.background};

  padding: 20px 120px;
  height: 100vh;
`
export const Title = styled.h1`
  margin-bottom: ${theme.spacing.xxl};
`

export const AnalyticsBlock = styled.div`
  height: 540px;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: ${theme.spacing.xxl};
`
