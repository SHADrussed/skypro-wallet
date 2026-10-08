import AppRoutes from './routes/AppRouters'
import { AnalyticsProvider } from './context/AnalyticsProvider'

function App() {
  return (
    <AnalyticsProvider>
      <AppRoutes />
    </AnalyticsProvider>
  )
}

export default App
