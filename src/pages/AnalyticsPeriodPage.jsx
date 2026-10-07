import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Analytics from '../components/Analytics/Analytics'
import Calendar from '../components/Calendar/Calendar'
import { HeaderS } from '../components/Header/Header.styled'
import Header from '../components/Header/Header'
import theme from '../theme'

const MobilePeriod = styled.main`
  display: none;

  @media (max-width: 768px) {
    display: block;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    min-height: 100svh;
    padding: 16px 16px 24px;

    ${HeaderS} {
      display: none;
    }
  }
`

const DesktopPeriod = styled.div`
  display: block;

  @media (max-width: 768px) {
    display: none;
  }
`

const BackLink = styled(Link)`
  display: inline-block;
  margin-bottom: 24px;
  color: ${theme.colors.textSecondary};
  font-size: 14px;
  text-decoration: none;
`

const ConfirmButton = styled.button`
  width: 100%;
  min-height: 52px;
  margin-top: auto;
  flex-shrink: 0;
  border: 0;
  border-radius: 8px;
  background: ${theme.colors.chart.greenText};
  color: ${theme.colors.primaryText};
  font: inherit;
  font-weight: ${theme.typography.fontWeight.semibold};
`

export default function AnalyticsPeriodPage() {
  const navigate = useNavigate()

  return (
    <>
      <DesktopPeriod>
        <Header isSpendingTablePage={false} />
        <Analytics />
      </DesktopPeriod>
      <MobilePeriod>
        <BackLink to="/analytics">← Анализ расходов</BackLink>
        <Calendar mobileTitle="Выбор периода" />
        <ConfirmButton type="button" onClick={() => navigate('/analytics')}>
          Выбрать период
        </ConfirmButton>
      </MobilePeriod>
    </>
  )
}
