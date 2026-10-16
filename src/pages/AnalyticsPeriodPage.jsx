import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Calendar from '../components/Calendar/Calendar'
import Header from '../components/Header/Header'
import { useAnalytics } from '../context/AnalyticsContext'

const PeriodPage = styled.main`
  min-height: 100svh;
`
const Content = styled.div`
  max-width: 520px;
  margin: 24px auto;
  padding: 0 16px 24px;
`
export default function AnalyticsPeriodPage() {
  const navigate = useNavigate()
  const { resetDraftPeriod } = useAnalytics()
  return (
    <PeriodPage>
      <Header isSpendingTablePage={false} />
      <Content>
        <Link to="/analytics" onClick={resetDraftPeriod}>
          ← Анализ расходов
        </Link>
        <Calendar
          mobileTitle="Выбор периода"
          onConfirm={() => navigate('/analytics')}
        />
      </Content>
    </PeriodPage>
  )
}
