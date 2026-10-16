import { describe, expect, it } from 'vitest'
import { aggregateExpenses, dateKey, selectRange } from '../src/utils/analytics'

describe('expense aggregation', () => {
  const rows = [
    { date: '2026-10-01', category: 'food', sum: 100 },
    { date: '2026-10-02T23:59:59.000Z', category: 'food', sum: '25' },
    { date: '2026-10-02', category: 'transport', sum: 50 },
    { date: '2026-10-03', category: 'housing', sum: 900 },
    { date: '2026-09-30', category: 'food', sum: 800 },
    { date: '2026-10-02', category: 'new-category', sum: 10 },
  ]
  it('includes both boundaries, sums categories and excludes other dates', () => {
    expect(
      aggregateExpenses(rows, { start: '2026-10-01', end: '2026-10-02' }),
    ).toEqual({ total: 185, values: [125, 50, 0, 0, 0, 10], count: 4 })
  })
  it('handles one day, an empty period and no chosen period', () => {
    expect(
      aggregateExpenses(rows, { start: '2026-10-01', end: '2026-10-01' }).total,
    ).toBe(100)
    expect(
      aggregateExpenses(rows, { start: '2025-01-01', end: '2025-12-31' }).total,
    ).toBe(0)
    expect(aggregateExpenses(rows, null).count).toBe(0)
  })
  it('does not produce NaN from invalid data and sums fractional rubles in kopecks', () => {
    const period = { start: '2026-10-01', end: '2026-10-01' }
    expect(
      aggregateExpenses(
        [null, undefined].map((sum) => ({ date: period.start, sum })),
        period,
      ).total,
    ).toBe(0)
    expect(
      aggregateExpenses(
        [
          { date: period.start, sum: 'bad' },
          { sum: 100 },
          { date: period.start, sum: 0.1 },
          { date: period.start, sum: 0.2 },
        ],
        period,
      ).total,
    ).toBe(0.3)
  })
  it('uses the latest server list after editing or deleting an expense', () => {
    const period = { start: '2026-10-01', end: '2026-10-02' }
    expect(aggregateExpenses([{ ...rows[0], sum: 200 }], period).total).toBe(
      200,
    )
    expect(aggregateExpenses([], period).total).toBe(0)
  })
})

describe('calendar ranges', () => {
  it('sorts reverse clicks, crosses years and starts a new range on the third click', () => {
    const first = selectRange(null, '2027-01-02')
    const range = selectRange(first, '2026-12-30')
    expect(range).toEqual({
      start: '2026-12-30',
      end: '2027-01-02',
      selectingEnd: false,
    })
    expect(selectRange(range, '2026-11-01').end).toBe('2026-11-01')
  })
  it('selects complete months in either direction, including leap February', () => {
    const feb = selectRange(null, dateKey(2024, 1, 1), dateKey(2024, 1, 29))
    expect(selectRange(feb, '2024-01-01', '2024-01-31')).toEqual({
      start: '2024-01-01',
      end: '2024-02-29',
      selectingEnd: false,
    })
  })
})
