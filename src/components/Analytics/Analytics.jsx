import Calendar from '../Calendar/Calendar'
import Graphs from '../Graphs/Graphs'
import { AnalyticsBlock, Page, Title } from './Analytics.styled'

export default function Analytics() {
  return (
    <Page>
      <Title>Анализ расходов</Title>
      <AnalyticsBlock>
        <Calendar />
        <Graphs />
      </AnalyticsBlock>
    </Page>
  )
}
