import Calendar from '../Calendar/Calendar'
import Graphs from '../Graphs/Graphs'
import { Link } from 'react-router-dom'
import {
  AnalyticsBlock,
  CalendarSection,
  Page,
  PeriodActionArea,
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
      <PeriodActionArea>
        <PeriodLink as={Link} to="/analytics/period">
          Выбрать другой период
        </PeriodLink>
      </PeriodActionArea>
    </Page>
  )
}
