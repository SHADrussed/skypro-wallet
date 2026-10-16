const API_URL = 'https://wedev-api.sky.pro/api/transactions'

// This backend reads request bodies with JSON.parse(req.body), so send them as text.
function getToken() {
  try {
    const user = JSON.parse(localStorage.getItem('userInfo') || 'null')
    if (user?.token) return user.token
  } catch {
    // The stored session is invalid.
  }
  throw new Error('Сессия не найдена. Войдите в аккаунт заново.')
}

async function request(path = '', options = {}) {
  const token = getToken()
  let response

  try {
    response = await fetch(API_URL + path, {
      method: options.method || 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        ...(options.body === undefined
          ? {}
          : { 'Content-Type': 'text/plain;charset=UTF-8' }),
      },
      ...(options.body === undefined
        ? {}
        : { body: JSON.stringify(options.body) }),
    })
  } catch {
    throw new Error('Нет соединения с сервером. Попробуйте ещё раз.')
  }

  const data = await response.json().catch(() => null)

  if (!response.ok) {
    throw new Error(
      data?.error ||
        data?.message ||
        (response.status === 401
          ? 'Сессия истекла. Войдите заново.'
          : `Ошибка сервера: ${response.status}`),
    )
  }

  return data
}

export async function getTransactions() {
  const data = await request()
  if (!Array.isArray(data))
    throw new Error('Сервер вернул неверный список расходов')
  return data
}

export async function createTransaction(transaction) {
  const data = await request('', { method: 'POST', body: transaction })
  return data.transactions
}

export async function updateTransaction(id, transaction) {
  const data = await request('/' + encodeURIComponent(id), {
    method: 'PATCH',
    body: transaction,
  })
  return data.transactions
}

export async function deleteTransaction(id) {
  const data = await request('/' + encodeURIComponent(id), {
    method: 'DELETE',
  })
  return data.transactions
}
