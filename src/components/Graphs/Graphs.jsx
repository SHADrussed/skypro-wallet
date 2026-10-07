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

const expenses = [
  { name: 'Еда', color: 'purple' },
  { name: 'Транспорт', color: 'orange' },
  { name: 'Жилье', color: 'blue' },
  { name: 'Развлечения', color: 'violet' },
  { name: 'Образование', color: 'lime' },
  { name: 'Другое', color: 'red' },
]

export default function Graphs() {
  const { appliedPeriod } = useAnalytics()
  const chartItems = expenses.map((item, index) => ({
    ...item,
    amount: appliedPeriod.values[index],
  }))
  const maxAmount = Math.max(...chartItems.map((item) => item.amount))
  const formattedTotal = appliedPeriod.total.toLocaleString('ru-RU')

  return (
    <GraphsStyled>
      <AnalyticsHeader>
        <TotalAmount>{formattedTotal} ₽</TotalAmount>
        <PeriodBlock>
          <span>Расходы за</span>
          <Period>{appliedPeriod.label}</Period>
        </PeriodBlock>
      </AnalyticsHeader>
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
