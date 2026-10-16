import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AnalyticsProvider } from '../src/context/AnalyticsProvider'
import Calendar from '../src/components/Calendar/Calendar'
import Graphs from '../src/components/Graphs/Graphs'
import { getTransactions } from '../src/services/transactions'
vi.mock('../src/services/transactions', () => ({ getTransactions: vi.fn() }))

beforeEach(() => {
  vi.useFakeTimers({ toFake: ['Date'] })
  vi.setSystemTime(new Date(2026, 9, 16))
  vi.clearAllMocks()
  getTransactions.mockResolvedValue([
    { date: '2026-10-01', category: 'food', sum: 100 },
    { date: '2026-10-02', category: 'transport', sum: 50 },
    { date: '2026-10-03', category: 'food', sum: 900 },
  ])
})
afterEach(() => vi.useRealTimers())
function renderAnalytics() {
  return render(
    <AnalyticsProvider>
      <Calendar />
      <Graphs />
    </AnalyticsProvider>,
  )
}
async function chooseDay(user, label) {
  await user.click(screen.getByRole('button', { name: label }))
}

it('starts with no fake total, applies real dates and preserves applied data while drafting', async () => {
  const user = userEvent.setup()
  renderAnalytics()
  expect(
    screen.getByText('Выберите период, чтобы увидеть расходы.'),
  ).toBeTruthy()
  expect(screen.getByRole('button', { name: 'Выбрать период' }).disabled).toBe(
    true,
  )
  await chooseDay(user, '1 октября 2026 г.')
  await chooseDay(user, '2 октября 2026 г.')
  expect(
    screen.getByText('Выберите период, чтобы увидеть расходы.'),
  ).toBeTruthy()
  await user.click(screen.getByRole('button', { name: 'Выбрать период' }))
  expect(await screen.findByText('150 ₽')).toBeTruthy()
  await chooseDay(user, '3 октября 2026 г.')
  expect(screen.getByText('150 ₽')).toBeTruthy()
  await user.click(screen.getByRole('button', { name: 'Выбрать период' }))
  expect(screen.getAllByText('900 ₽').length).toBe(2)
})

it('shows API errors with a working retry and an empty state without invalid bars', async () => {
  getTransactions.mockRejectedValueOnce(new Error('Нет соединения'))
  const user = userEvent.setup()
  const { container } = renderAnalytics()
  await chooseDay(user, '4 октября 2026 г.')
  await user.click(screen.getByRole('button', { name: 'Выбрать период' }))
  expect(await screen.findByRole('alert')).toBeTruthy()
  await user.click(screen.getByRole('button', { name: 'Повторить загрузку' }))
  expect(
    await screen.findByText('За выбранный период расходов нет.'),
  ).toBeTruthy()
  expect(container.innerHTML).not.toContain('NaN')
  expect(getTransactions).toHaveBeenCalledTimes(2)
})

it('navigates months and years and selects a range across December/January', async () => {
  const user = userEvent.setup()
  renderAnalytics()
  await user.click(screen.getByRole('button', { name: 'Год', exact: true }))
  await chooseDay(user, 'декабрь 2026')
  await user.click(screen.getByRole('button', { name: 'Следующий период' }))
  await chooseDay(user, 'январь 2027')
  await user.click(screen.getByRole('button', { name: 'Выбрать период' }))
  await waitFor(() =>
    expect(
      screen.getAllByText('1 декабря 2026 г. — 31 января 2027 г.').length,
    ).toBe(2),
  )
  await user.click(screen.getByRole('button', { name: 'Месяц', exact: true }))
  await user.click(screen.getByRole('button', { name: 'Предыдущий период' }))
  expect(
    screen.getByRole('button', { name: '30 сентября 2027 г.' }),
  ).toBeTruthy()
})
