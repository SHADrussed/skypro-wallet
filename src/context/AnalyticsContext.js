import { createContext, useContext } from 'react'

export const AnalyticsContext = createContext(null)

export function useAnalytics() {
  const context = useContext(AnalyticsContext)

  if (!context) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider')
  }

  return context
}
