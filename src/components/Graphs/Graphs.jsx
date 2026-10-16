import {
  Amount,
  AnalyticsHeader,
  Bar,
  BarArea,
  Category,
  Chart,
  Column,
  GraphContent,
  GraphsStyled,
  Period,
  PeriodBlock,
  TotalAmount,
} from './Graphs.styled'
import { useAnalytics } from '../../context/AnalyticsContext'
import { useEffect, useState } from 'react'
import { getTransactions } from '../../services/transactions'
import {
  aggregateExpenses,
  categories,
  formatPeriod,
} from '../../utils/analytics'

export default function Graphs() {
  const { appliedPeriod } = useAnalytics()
  const [result, setResult] = useState({ loading: true, items: [], error: '' })
  const [attempt, setAttempt] = useState(0)
  useEffect(() => {
    let active = true
    getTransactions()
      .then((items) => {
        if (active) setResult({ loading: false, items, error: '' })
      })
      .catch((error) => {
        if (active)
          setResult({ loading: false, items: [], error: error.message })
      })
    return () => {
      active = false
    }
  }, [attempt])
  const summary = aggregateExpenses(result.items, appliedPeriod)
  const chartItems = categories.map((item, index) => ({
    ...item,
    amount: summary.values[index],
  }))
  const maxAmount = Math.max(1, ...summary.values)
  const formattedTotal = summary.total.toLocaleString('ru-RU')

  if (!appliedPeriod)
    return (
      <GraphsStyled>
        <p role="status">Выберите период, чтобы увидеть расходы.</p>
      </GraphsStyled>
    )
  if (result.loading)
    return (
      <GraphsStyled>
        <p role="status">Загрузка расходов...</p>
      </GraphsStyled>
    )
  if (result.error)
    return (
      <GraphsStyled>
        <p role="alert">{result.error}</p>
        <button
          type="button"
          onClick={() => {
            setResult({ loading: true, items: [], error: '' })
            setAttempt((value) => value + 1)
          }}
        >
          Повторить загрузку
        </button>
      </GraphsStyled>
    )

  return (
    <GraphsStyled>
      <AnalyticsHeader>
        <TotalAmount>{formattedTotal} ₽</TotalAmount>
        <PeriodBlock>
          <span>Расходы за</span>
          <Period>{formatPeriod(appliedPeriod)}</Period>
        </PeriodBlock>
      </AnalyticsHeader>
      {summary.count === 0 && (
        <p role="status">За выбранный период расходов нет.</p>
      )}
      <GraphContent>
        <Chart>
          {chartItems.map((item) => {
            const height = (item.amount / maxAmount) * 100

            return (
              <Column key={item.name}>
                <BarArea>
                  <Amount>{item.amount.toLocaleString('ru-RU')} ₽</Amount>

                  <Bar
                    $height={height}
                    $color={item.color}
                    $empty={item.amount === 0}
                  />
                </BarArea>

                <Category>{item.name}</Category>
              </Column>
            )
          })}
        </Chart>
      </GraphContent>
    </GraphsStyled>
  )
}
