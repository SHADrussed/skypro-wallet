import Analytics from '../components/Analytics/Analytics'
import Header from '../components/Header/Header'
import styled from 'styled-components'

const AnalyticsLayout = styled.main`
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    min-height: 100svh;
  }
`

export default function AnalyticsPage() {
  return (
    <AnalyticsLayout>
      <Header isSpendingTablePage={false} />
      <Analytics />
    </AnalyticsLayout>
  )
}
