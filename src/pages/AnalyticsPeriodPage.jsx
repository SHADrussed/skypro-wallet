import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Analytics from '../components/Analytics/Analytics'
import Calendar from '../components/Calendar/Calendar'
import Header from '../components/Header/Header'
import theme from '../theme'
import { useAnalytics } from '../context/AnalyticsContext'

const MobilePeriod = styled.main`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    box-sizing: border-box;
    flex-direction: column;
    height: 100svh;
    min-height: 100svh;
    padding: 0;
    overflow: hidden;
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

const MobilePeriodContent = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  min-height: 0;
  overflow-y: auto;
  scrollbar-width: none;
  padding: 8px 16px 0;

  &::-webkit-scrollbar {
    display: none;
  }
`

const PeriodActionArea = styled.div`
  margin-top: auto;
  padding: 24px 16px;
  background: ${theme.colors.background};
`

const ConfirmButton = styled.button`
  width: 100%;
  min-height: 40px;
  border: 0;
  border-radius: 8px;
  background: ${theme.colors.chart.greenText};
  color: ${theme.colors.primaryText};
  font: inherit;
  font-weight: ${theme.typography.fontWeight.semibold};
`

export default function AnalyticsPeriodPage() {
  const navigate = useNavigate()
  const { applyDraftPeriod } = useAnalytics()

  const handleConfirmPeriod = () => {
    applyDraftPeriod()
    navigate('/analytics')
  }

  return (
    <>
      <DesktopPeriod>
        <Header isSpendingTablePage={false} />
        <Analytics />
      </DesktopPeriod>
      <MobilePeriod>
        <Header isSpendingTablePage={false} />
        <MobilePeriodContent>
          <BackLink to="/analytics">← Анализ расходов</BackLink>
          <Calendar mobileTitle="Выбор периода" />
        </MobilePeriodContent>
        <PeriodActionArea>
          <ConfirmButton type="button" onClick={handleConfirmPeriod}>
            Выбрать период
          </ConfirmButton>
        </PeriodActionArea>
      </MobilePeriod>
    </>
  )
}
