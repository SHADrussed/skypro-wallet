import { Routes, Route } from 'react-router-dom'
import SpendingTablePage from '../pages/SpendingTablePage'
import AnalyticsPage from '../pages/AnalyticsPage'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SpendingTablePage />} />
      <Route path="/analytics" element={<AnalyticsPage />} />
    </Routes>
  )
}

export default AppRoutes
