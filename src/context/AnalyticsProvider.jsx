import { useState } from 'react'
import { AnalyticsContext } from './AnalyticsContext'

export function AnalyticsProvider({ children }) {
  const [periodMode, setPeriodMode] = useState('month')
  const [selectedPeriod, setSelectedPeriod] = useState('10 июля 2024')

  return (
    <AnalyticsContext.Provider
      value={{ periodMode, setPeriodMode, selectedPeriod, setSelectedPeriod }}
    >
      {children}
    </AnalyticsContext.Provider>
  )
}
