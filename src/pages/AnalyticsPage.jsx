import Analytics from '../components/Analytics/Analytics'
import Header from '../components/Header/Header'

export default function AnalyticsPage() {
  return (
    <>
      <Header isSpendingTablePage={false} />
      <Analytics />
    </>
  )
}
