import {
  CalendarCard,
  CalendarFooter,
  CalendarHeader,
  CalendarHeaderPeriods,
  CalendarHeaderTitle,
  Day,
  DaysGrid,
  MonthTitle,
  MonthWrapper,
  PeriodVariant,
  Weekday,
  Weekdays,
} from './Calendar.styled'
const weekdays = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс']
const months = [
  {
    name: 'Июль 2024',
    firstDay: 1,
    days: 31,
  },
  {
    name: 'Август 2024',
    firstDay: 4,
    days: 31,
  },
]
export default function Calendar() {
  return (
    <CalendarCard>
      <CalendarHeader>
        <CalendarHeaderTitle>Период</CalendarHeaderTitle>

        <CalendarHeaderPeriods>
          <PeriodVariant $active={true}>Месяц</PeriodVariant>
          <PeriodVariant $active={false}>Год</PeriodVariant>
        </CalendarHeaderPeriods>
      </CalendarHeader>

      <Weekdays>
        {weekdays.map((day) => (
          <Weekday key={day}>{day}</Weekday>
        ))}
      </Weekdays>
      <CalendarFooter>
        {months.map((month) => (
          <MonthWrapper key={month.name}>
            <MonthTitle>{month.name}</MonthTitle>

            <DaysGrid>
              {Array.from({ length: month.days }, (_, index) => {
                const day = index + 1

                return (
                  <Day
                    key={day}
                    $first={day === 1}
                    $startColumn={month.firstDay}
                  >
                    {day}
                  </Day>
                )
              })}
            </DaysGrid>
          </MonthWrapper>
        ))}
      </CalendarFooter>
    </CalendarCard>
  )
}
