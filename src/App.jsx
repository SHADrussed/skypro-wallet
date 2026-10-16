import AppRoutes from './routes/AppRouters'
import { AnalyticsProvider } from './context/AnalyticsProvider'
import { useAuth } from './context/useAuth'

function App() {
  const { isAuth } = useAuth()
  return (
    <AnalyticsProvider key={String(isAuth)}>
      <AppRoutes />
    </AnalyticsProvider>
  )
}

export default App
