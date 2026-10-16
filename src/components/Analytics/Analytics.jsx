import Calendar from '../Calendar/Calendar'
import Graphs from '../Graphs/Graphs'
import { Link } from 'react-router-dom'
import BackLink from '../BackLink/BackLink'
import { useAnalytics } from '../../context/AnalyticsContext'
import {
  AnalyticsBlock,
  CalendarSection,
  Page,
  PeriodActionArea,
  PeriodLink,
  Title,
} from './Analytics.styled'

export default function Analytics({ showCalendar = true }) {
  const { resetDraftPeriod } = useAnalytics()
  return (
    <Page>
      <BackLink to="/">Мои расходы</BackLink>
      <Title>Анализ расходов</Title>
      <AnalyticsBlock>
        {showCalendar && (
          <CalendarSection>
            <Calendar />
          </CalendarSection>
        )}
        <Graphs />
      </AnalyticsBlock>
      <PeriodActionArea>
        <PeriodLink as={Link} to="/analytics/period" onClick={resetDraftPeriod}>
          Выбрать другой период
        </PeriodLink>
      </PeriodActionArea>
    </Page>
  )
}
