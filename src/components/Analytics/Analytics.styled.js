import styled from 'styled-components'
import theme from '../../theme'

export const Page = styled.div`
  background-color: ${theme.colors.background};

  padding: 20px 120px;
  min-height: calc(100vh - 64px);
`
export const Title = styled.h1`
  margin-bottom: ${theme.spacing.xxl};
`

export const AnalyticsBlock = styled.div`
  display: grid;
  grid-template-columns: minmax(380px, 1fr) minmax(0, 2fr);
  height: 540px;
  gap: ${theme.spacing.xxl};
`
