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
    min-height: calc(100vh - 56px);
    padding: 8px 16px 24px;

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
  margin-bottom: 20px;
  color: ${theme.colors.textSecondary};
  font-size: 14px;
  text-decoration: none;
`

const PeriodTitle = styled.h1`
  margin: 0 0 24px;
  font-size: 24px;
`

const ConfirmButton = styled.button`
  width: 100%;
  min-height: 52px;
  margin-top: 24px;
  border: 0;
  border-radius: 8px;
  background: ${theme.colors.primary};
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
        <PeriodTitle>Выбор периода</PeriodTitle>
        <Calendar />
        <ConfirmButton type="button" onClick={() => navigate('/analytics')}>
          Выбрать период
        </ConfirmButton>
      </MobilePeriod>
    </>
  )
}
