import styled from 'styled-components'
import theme from '../../theme'

export const Page = styled.div`
  background-color: ${theme.colors.background};

  padding: 20px 120px;
  min-height: calc(100vh - 64px);

  @media (max-width: 768px) {
    box-sizing: border-box;
    display: flex;
    flex: 1;
    flex-direction: column;
    padding: 20px 16px 0;
    min-height: 0;
    background: ${theme.colors.surface};
  }
`

export const Title = styled.h1`
  margin-bottom: ${theme.spacing.xxl};

  @media (max-width: 768px) {
    margin: 0 0 24px;
    font-size: 24px;
  }
`

export const AnalyticsBlock = styled.div`
  display: grid;
  grid-template-columns: minmax(380px, 1fr) minmax(0, 2fr);
  height: 540px;
  gap: ${theme.spacing.xxl};

  @media (max-width: 768px) {
    display: flex;
    flex: 1;
    flex-direction: column;
    height: auto;
    min-height: 0;
  }
`

export const CalendarSection = styled.div`
  min-width: 0;

  @media (max-width: 768px) {
    display: none;
  }
`

export const PeriodActionArea = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    flex-shrink: 0;
    margin: auto -16px 0;
    padding: 24px 16px;
    background: ${theme.colors.background};
  }
`

export const PeriodLink = styled.a`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    width: 100%;
    min-height: 40px;
    align-items: center;
    justify-content: center;
    margin-top: 0;
    border-radius: 8px;
    background: ${theme.colors.chart.greenText};
    color: ${theme.colors.primaryText};
    font-weight: ${theme.typography.fontWeight.semibold};
    text-decoration: none;
    flex-shrink: 0;
  }
`
