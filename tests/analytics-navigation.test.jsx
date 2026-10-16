import { beforeEach, afterEach, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import App from '../src/App'
import { AuthContextProvider } from '../src/context/ContextProvider'
import { getTransactions } from '../src/services/transactions'
vi.mock('../src/services/transactions', () => ({
  getTransactions: vi.fn(),
  createTransaction: vi.fn(),
  updateTransaction: vi.fn(),
  deleteTransaction: vi.fn(),
}))
beforeEach(() => {
  vi.useFakeTimers({ toFake: ['Date'] })
  vi.setSystemTime(new Date(2026, 9, 16))
  localStorage.setItem('userInfo', JSON.stringify({ token: 'test-token' }))
  getTransactions.mockResolvedValue([
    { date: '2026-10-01', category: 'food', sum: 100 },
  ])
})
afterEach(() => {
  vi.useRealTimers()
  localStorage.clear()
})
function open(path) {
  return render(
    <AuthContextProvider>
      <MemoryRouter initialEntries={[path]}>
        <App />
      </MemoryRouter>
    </AuthContextProvider>,
  )
}
it('returns from a directly opened analytics page to expenses and reloads the latest data', async () => {
  const user = userEvent.setup()
  open('/analytics')
  await user.click(screen.getByRole('button', { name: '1 октября 2026 г.' }))
  await user.click(screen.getByRole('button', { name: 'Выбрать период' }))
  expect((await screen.findAllByText('100 ₽')).length).toBe(2)
  await user.click(screen.getAllByRole('link', { name: 'Мои расходы' }).at(-1))
  expect(
    await screen.findByRole('heading', { name: 'Мои расходы' }),
  ).toBeTruthy()
  getTransactions.mockResolvedValue([])
  await user.click(screen.getByRole('link', { name: 'Анализ расходов' }))
  expect(
    await screen.findByText('За выбранный период расходов нет.'),
  ).toBeTruthy()
})
it('confirms a mobile period, cancels a draft and preserves the applied total', async () => {
  const user = userEvent.setup()
  open('/analytics/period')
  await user.click(screen.getByRole('button', { name: '1 октября 2026 г.' }))
  await user.click(screen.getByRole('button', { name: 'Выбрать период' }))
  expect((await screen.findAllByText('100 ₽')).length).toBe(2)
  await user.click(screen.getByText('Выбрать другой период'))
  await user.click(screen.getByRole('button', { name: '3 октября 2026 г.' }))
  await user.click(
    screen.getAllByRole('link', { name: 'Анализ расходов' }).at(-1),
  )
  expect((await screen.findAllByText('100 ₽')).length).toBe(2)
  await user.click(screen.getByText('Выбрать другой период'))
  expect(
    screen
      .getByRole('button', { name: '1 октября 2026 г.' })
      .getAttribute('aria-pressed'),
  ).toBe('true')
  expect(
    screen
      .getByRole('button', { name: '3 октября 2026 г.' })
      .getAttribute('aria-pressed'),
  ).toBe('false')
})
