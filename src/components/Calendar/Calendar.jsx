import { useState } from 'react'
import {
  CalendarCard,
  CalendarFooter,
  CalendarHeader,
  CalendarHeaderPeriods,
  CalendarHeaderTitle,
  Day,
  DaysGrid,
  MonthButton,
  MonthsGrid,
  MonthTitle,
  MonthWrapper,
  PeriodVariant,
  Weekday,
  Weekdays,
  YearBlock,
  YearTitle,
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

const years = [
  {
    year: 2024,
    months: [
      'Январь',
      'Февраль',
      'Март',
      'Апрель',
      'Май',
      'Июнь',
      'Июль',
      'Август',
      'Сентябрь',
      'Октябрь',
      'Ноябрь',
      'Декабрь',
    ],
  },
  {
    year: 2025,
    months: [
      'Январь',
      'Февраль',
      'Март',
      'Апрель',
      'Май',
      'Июнь',
      'Июль',
      'Август',
      'Сентябрь',
      'Октябрь',
      'Ноябрь',
      'Декабрь',
    ],
  },
]
export default function Calendar() {
  const [periodMode, setPeriodMode] = useState('month')

  return (
    <CalendarCard>
      <CalendarHeader>
        <CalendarHeaderTitle>Период</CalendarHeaderTitle>

        <CalendarHeaderPeriods>
          <PeriodVariant
            $active={periodMode === 'month'}
            onClick={() => setPeriodMode('month')}
          >
            Месяц
          </PeriodVariant>

          <PeriodVariant
            $active={periodMode === 'year'}
            onClick={() => setPeriodMode('year')}
          >
            Год
          </PeriodVariant>
        </CalendarHeaderPeriods>
      </CalendarHeader>
      {periodMode === 'month' ? (
        <>
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
        </>
      ) : (
        <CalendarFooter>
          {years.map((item) => (
            <YearBlock key={item.year}>
              <YearTitle>{item.year}</YearTitle>

              <MonthsGrid>
                {item.months.map((month) => (
                  <MonthButton key={month}>{month}</MonthButton>
                ))}
              </MonthsGrid>
            </YearBlock>
          ))}
        </CalendarFooter>
      )}
    </CalendarCard>
  )
}
