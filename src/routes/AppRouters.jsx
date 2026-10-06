import { Routes, Route } from 'react-router-dom'
import SpendingTablePage from '../pages/SpendingTablePage'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SpendingTablePage />} />
      <Route path="/analytics" element={<SpendingTablePage />} />
    </Routes>
  )
}

export default AppRoutes
