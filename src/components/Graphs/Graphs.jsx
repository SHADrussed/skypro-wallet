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

const expenses = [
  { name: 'Еда', amount: 3590, color: 'purple' },
  { name: 'Транспорт', amount: 1835, color: 'orange' },
  { name: 'Жилье', amount: 0, color: 'blue' },
  { name: 'Развлечения', amount: 1250, color: 'violet' },
  { name: 'Образование', amount: 600, color: 'green' },
  { name: 'Другое', amount: 2306, color: 'red' },
]

const maxAmount = Math.max(...expenses.map((item) => item.amount))

export default function Graphs() {
  return (
    <GraphsStyled>
      <AnalyticsHeader>
        <TotalAmount>9 581 ₽</TotalAmount>
        <PeriodBlock>
          <span>Расходы за</span>
          <Period>10 июля 2024</Period>
        </PeriodBlock>
      </AnalyticsHeader>
      <GraphContent>
        <Chart>
          {expenses.map((item) => {
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
