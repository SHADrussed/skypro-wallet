import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Calendar from '../components/Calendar/Calendar'
import Header from '../components/Header/Header'
import { useAnalytics } from '../context/AnalyticsContext'
import BackLink from '../components/BackLink/BackLink'

const PeriodPage = styled.main`
  display: flex;
  flex-direction: column;
  height: 100svh;
  min-height: 100svh;
  overflow: hidden;
  > header {
    flex-shrink: 0;
  }
`
const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  width: 100%;
  max-width: 520px;
  margin: 24px auto 0;
  padding: 0 16px;
  > a {
    flex-shrink: 0;
  }
`
export default function AnalyticsPeriodPage() {
  const navigate = useNavigate()
  const { resetDraftPeriod } = useAnalytics()
  return (
    <PeriodPage>
      <Header isSpendingTablePage={false} />
      <Content>
        <BackLink to="/analytics" onClick={resetDraftPeriod}>
          Анализ расходов
        </BackLink>
        <Calendar
          mobileTitle="Выбор периода"
          onConfirm={() => navigate('/analytics')}
        />
      </Content>
    </PeriodPage>
  )
}
