import Calendar from '../Calendar/Calendar'
import Graphs from '../Graphs/Graphs'
import { Link } from 'react-router-dom'
import {
  AnalyticsBlock,
  CalendarSection,
  Page,
  PeriodLink,
  Title,
} from './Analytics.styled'

export default function Analytics({ showCalendar = true }) {
  return (
    <Page>
      <Title>Анализ расходов</Title>
      <AnalyticsBlock>
        {showCalendar && (
          <CalendarSection>
            <Calendar />
          </CalendarSection>
        )}
        <Graphs />
      </AnalyticsBlock>
      <PeriodLink as={Link} to="/analytics/period">
        Выбрать другой период
      </PeriodLink>
    </Page>
  )
}
