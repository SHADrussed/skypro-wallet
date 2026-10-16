import { useState } from 'react'
import { useAnalytics } from '../../context/AnalyticsContext'
import { dateKey, formatPeriod } from '../../utils/analytics'
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
  CalendarControls,
  ConfirmPeriod,
} from './Calendar.styled'

const weekdays = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс']
const monthNames = Array.from({ length: 12 }, (_, month) =>
  new Date(2024, month, 1).toLocaleDateString('ru-RU', { month: 'long' }),
)

export default function Calendar({ mobileTitle, onConfirm }) {
  const {
    periodMode,
    setPeriodMode,
    draftPeriod,
    appliedPeriod,
    selectPeriod,
    applyDraftPeriod,
  } = useAnalytics()
  const [view, setView] = useState(() => {
    const today = new Date()
    const [year, month] = (
      draftPeriod?.start ||
      appliedPeriod?.start ||
      dateKey(today.getFullYear(), today.getMonth(), 1)
    )
      .split('-')
      .map(Number)
    return { year, month: month - 1 }
  })
  const move = (offset) => {
    const next = new Date(
      view.year + (periodMode === 'year' ? offset : 0),
      view.month + (periodMode === 'month' ? offset : 0),
      1,
    )
    setView({ year: next.getFullYear(), month: next.getMonth() })
  }
  const selected = (start, end = start) =>
    Boolean(draftPeriod && start <= draftPeriod.end && end >= draftPeriod.start)
  const confirm = () => {
    applyDraftPeriod()
    onConfirm?.()
  }
  return (
    <CalendarCard>
      <CalendarHeader $periodMode={periodMode}>
        <CalendarHeaderTitle
          as={mobileTitle ? 'h1' : 'h2'}
          $mobileTitle={Boolean(mobileTitle)}
        >
          {mobileTitle || 'Период'}
        </CalendarHeaderTitle>
        <CalendarHeaderPeriods>
          <PeriodVariant
            type="button"
            $active={periodMode === 'month'}
            aria-pressed={periodMode === 'month'}
            onClick={() => setPeriodMode('month')}
          >
            Месяц
          </PeriodVariant>
          <PeriodVariant
            type="button"
            $active={periodMode === 'year'}
            aria-pressed={periodMode === 'year'}
            onClick={() => setPeriodMode('year')}
          >
            Год
          </PeriodVariant>
        </CalendarHeaderPeriods>
      </CalendarHeader>
      <CalendarControls>
        <button
          type="button"
          aria-label="Предыдущий период"
          onClick={() => move(-1)}
        >
          ←
        </button>
        <span>
          {periodMode === 'year'
            ? view.year
            : new Date(view.year, view.month, 1).toLocaleDateString('ru-RU', {
                month: 'long',
                year: 'numeric',
              })}
        </span>
        <button
          type="button"
          aria-label="Следующий период"
          onClick={() => move(1)}
        >
          →
        </button>
      </CalendarControls>
      {periodMode === 'month' && (
        <Weekdays>
          {weekdays.map((day) => (
            <Weekday key={day}>{day}</Weekday>
          ))}
        </Weekdays>
      )}
      <CalendarFooter $periodMode={periodMode}>
        {periodMode === 'month' ? (
          [0, 1].map((offset) => {
            const date = new Date(view.year, view.month + offset, 1)
            const year = date.getFullYear()
            const month = date.getMonth()
            return (
              <MonthWrapper key={`${year}-${month}`}>
                <MonthTitle>
                  {date.toLocaleDateString('ru-RU', {
                    month: 'long',
                    year: 'numeric',
                  })}
                </MonthTitle>
                <DaysGrid>
                  {Array.from(
                    { length: new Date(year, month + 1, 0).getDate() },
                    (_, index) => {
                      const day = index + 1
                      const key = dateKey(year, month, day)
                      return (
                        <Day
                          key={key}
                          type="button"
                          aria-label={formatPeriod({ start: key, end: key })}
                          aria-pressed={selected(key)}
                          $first={day === 1}
                          $startColumn={((date.getDay() + 6) % 7) + 1}
                          $selected={selected(key)}
                          onClick={() => selectPeriod(key)}
                        >
                          {day}
                        </Day>
                      )
                    },
                  )}
                </DaysGrid>
              </MonthWrapper>
            )
          })
        ) : (
          <YearBlock>
            <YearTitle>{view.year}</YearTitle>
            <MonthsGrid>
              {monthNames.map((name, month) => {
                const start = dateKey(view.year, month, 1)
                const end = dateKey(
                  view.year,
                  month,
                  new Date(view.year, month + 1, 0).getDate(),
                )
                return (
                  <MonthButton
                    key={name}
                    type="button"
                    aria-label={`${name} ${view.year}`}
                    aria-pressed={selected(start, end)}
                    $selected={selected(start, end)}
                    onClick={() => selectPeriod(start, end)}
                  >
                    {name}
                  </MonthButton>
                )
              })}
            </MonthsGrid>
          </YearBlock>
        )}
      </CalendarFooter>
      <ConfirmPeriod>
        <p aria-live="polite">
          {draftPeriod ? formatPeriod(draftPeriod) : 'Выберите начало периода'}
        </p>
        <p>Нажмите один раз для дня или месяца, два раза — для диапазона.</p>
        <button type="button" disabled={!draftPeriod} onClick={confirm}>
          Выбрать период
        </button>
      </ConfirmPeriod>
    </CalendarCard>
  )
}
