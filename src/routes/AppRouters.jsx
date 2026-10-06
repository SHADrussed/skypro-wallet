import { Routes, Route } from 'react-router-dom'
import SpendingTablePage from '../pages/SpendingTablePage'
import AnalyticsPage from '../pages/AnalyticsPage'
import AnalyticsPeriodPage from '../pages/AnalyticsPeriodPage'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SpendingTablePage />} />
      <Route path="/analytics" element={<AnalyticsPage />} />
      <Route path="/analytics/period" element={<AnalyticsPeriodPage />} />
    </Routes>
  )
}

export default AppRoutes
