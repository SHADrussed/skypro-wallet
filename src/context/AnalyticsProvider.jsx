import { useState } from 'react'
import { AnalyticsContext } from './AnalyticsContext'
import { selectRange } from '../utils/analytics'

export function AnalyticsProvider({ children }) {
  const [periodMode, setPeriodModeState] = useState('month')
  const [draftPeriod, setDraftPeriod] = useState(null)
  const [appliedPeriod, setAppliedPeriod] = useState(null)
  const setPeriodMode = (mode) => {
    setPeriodModeState(mode)
    setDraftPeriod(null)
  }
  const selectPeriod = (start, end = start) => {
    setDraftPeriod((current) => selectRange(current, start, end))
  }
  const applyDraftPeriod = () => {
    if (draftPeriod) {
      const period = { ...draftPeriod, selectingEnd: false }
      setAppliedPeriod(period)
      setDraftPeriod(period)
    }
  }
  const resetDraftPeriod = () => setDraftPeriod(appliedPeriod)
  return (
    <AnalyticsContext.Provider
      value={{
        periodMode,
        setPeriodMode,
        draftPeriod,
        selectPeriod,
        appliedPeriod,
        applyDraftPeriod,
        resetDraftPeriod,
      }}
    >
      {children}
    </AnalyticsContext.Provider>
  )
}
