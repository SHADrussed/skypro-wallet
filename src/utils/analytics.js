export const categories = [
  { id: 'food', name: 'Еда', color: 'purple' },
  { id: 'transport', name: 'Транспорт', color: 'orange' },
  { id: 'housing', name: 'Жилье', color: 'blue' },
  { id: 'joy', name: 'Развлечения', color: 'violet' },
  { id: 'education', name: 'Образование', color: 'lime' },
  { id: 'others', name: 'Другое', color: 'red' },
]

// Keep calendar dates as strings: UTC conversion can shift the selected day.
export function dateKey(year, month, day) {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

export function selectRange(current, start, end = start) {
  if (!current || !current.selectingEnd)
    return { start, end, selectingEnd: true }
  return {
    start: start < current.start ? start : current.start,
    end: end > current.end ? end : current.end,
    selectingEnd: false,
  }
}

export function formatPeriod(period) {
  if (!period) return ''
  const format = (key) => {
    const [year, month, day] = key.split('-').map(Number)
    return new Date(year, month - 1, day).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }
  return period.start === period.end
    ? format(period.start)
    : `${format(period.start)} — ${format(period.end)}`
}

export function aggregateExpenses(transactions, period) {
  const values = categories.map(() => 0)
  let count = 0
  if (period) {
    for (const transaction of transactions) {
      const date =
        typeof transaction.date === 'string'
          ? transaction.date.slice(0, 10)
          : ''
      const amount = Number(transaction.sum)
      if (
        !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
        date < period.start ||
        date > period.end ||
        !Number.isFinite(amount) ||
        amount <= 0
      )
        continue
      const index = categories.findIndex(
        (category) => category.id === transaction.category,
      )
      // Keep the total correct if the API adds a category unknown to this client.
      values[index < 0 ? values.length - 1 : index] += Math.round(amount * 100)
      count += 1
    }
  }
  return {
    values: values.map((value) => value / 100),
    total: values.reduce((a, b) => a + b, 0) / 100,
    count,
  }
}
