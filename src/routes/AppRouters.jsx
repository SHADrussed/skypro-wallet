import { Routes, Route } from 'react-router-dom'
import SpendingTablePage from '../pages/SpendingTablePage'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import AnalyticsPage from '../pages/AnalyticsPage'
import AnalyticsPeriodPage from '../pages/AnalyticsPeriodPage'
import NotFoundPage from '../pages/NotFoundPage'
import PrivateRoute from './PrivateRoute'

function AppRoutes() {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<SpendingTablePage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/analytics/period" element={<AnalyticsPeriodPage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default AppRoutes
