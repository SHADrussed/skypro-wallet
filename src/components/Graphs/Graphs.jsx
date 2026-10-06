import {
  AnalyticsHeader,
  CategoryList,
  Chart,
  GraphsStyled,
  Period,
  PeriodBlock,
  TotalAmount,
} from './Graphs.styled'

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
      <TotalAmount>
        <Chart></Chart>
        <CategoryList></CategoryList>
      </TotalAmount>
    </GraphsStyled>
  )
}
