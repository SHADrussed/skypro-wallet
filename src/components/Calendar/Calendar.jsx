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

const days = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30, 31,
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
        <MonthWrapper>
          <MonthTitle>Июль 2024</MonthTitle>

          <DaysGrid>
            {days.map((day, index) => (
              <Day key={index}>{day}</Day>
            ))}
          </DaysGrid>
        </MonthWrapper>
      </CalendarFooter>
    </CalendarCard>
  )
}
