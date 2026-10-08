import { useState } from 'react'
import { AnalyticsContext } from './AnalyticsContext'

export function AnalyticsProvider({ children }) {
  const initialPeriod = {
    label: '10 июля 2024',
    total: 9581,
    values: [3590, 1835, 0, 1250, 600, 2306],
  }
  const monthPeriod = {
    label: '29 июля 2024 — 4 августа 2024',
    total: 65192,
    values: [21990, 11046, 0, 13050, 0, 19106],
  }
  const yearPeriod = {
    label: 'август 2024 — май 2025',
    total: 1343690,
    values: [328090, 190000, 277500, 127000, 168000, 253100],
  }

  const [periodMode, setPeriodModeState] = useState('month')
  const [draftPeriod, setDraftPeriod] = useState({
    mode: 'month',
    label: monthPeriod.label,
  })
  const [appliedPeriod, setAppliedPeriod] = useState(initialPeriod)

  const setPeriodMode = (mode) => {
    setPeriodModeState(mode)
    setDraftPeriod({
      mode,
      label: mode === 'month' ? monthPeriod.label : yearPeriod.label,
    })
  }

  const updateDraftPeriod = (label) => {
    setDraftPeriod((current) => ({ ...current, label }))
  }

  const applyDraftPeriod = () => {
    setAppliedPeriod(draftPeriod.mode === 'month' ? monthPeriod : yearPeriod)
  }

  return (
    <AnalyticsContext.Provider
      value={{
        periodMode,
        setPeriodMode,
        draftPeriod,
        updateDraftPeriod,
        appliedPeriod,
        applyDraftPeriod,
      }}
    >
      {children}
    </AnalyticsContext.Provider>
  )
}
