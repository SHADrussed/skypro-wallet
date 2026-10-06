import styled from 'styled-components'
import theme from '../../theme'

export const Page = styled.div`
  background-color: ${theme.colors.background};

  padding: 20px 120px;
  min-height: calc(100vh - 64px);

  @media (max-width: 768px) {
    padding: 24px 16px;
    min-height: calc(100vh - 56px);
  }
`

export const Title = styled.h1`
  margin-bottom: ${theme.spacing.xxl};

  @media (max-width: 768px) {
    display: none;
  }
`

export const AnalyticsBlock = styled.div`
  display: grid;
  grid-template-columns: minmax(380px, 1fr) minmax(0, 2fr);
  height: 540px;
  gap: ${theme.spacing.xxl};

  @media (max-width: 768px) {
    display: block;
    height: auto;
  }
`

export const CalendarSection = styled.div`
  min-width: 0;

  @media (max-width: 768px) {
    display: none;
  }
`

export const PeriodLink = styled.a`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    width: 100%;
    min-height: 52px;
    align-items: center;
    justify-content: center;
    margin-top: 24px;
    border-radius: 8px;
    background: ${theme.colors.primary};
    color: ${theme.colors.primaryText};
    font-weight: ${theme.typography.fontWeight.semibold};
    text-decoration: none;
  }
`
