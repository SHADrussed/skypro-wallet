import {
  BackButton,
  MobileNewExpense,
  Page,
  PageHeader,
  PageTitle,
  Feedback,
} from './SpendingTable.styled'
import Expenses from '../Expenses/Expenses'
import ExpenseForm from '../ExpenseForm/ExpenseForm'
import { useEffect, useState } from 'react'
import {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from '../../services/transactions'

const SpendingTable = () => {
  const [isForm, setIsForm] = useState(false)
  const [transactions, setTransactions] = useState([])
  const [editingTransaction, setEditingTransaction] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isBusy, setIsBusy] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    getTransactions()
      .then((items) => {
        if (active) setTransactions(items)
      })
      .catch((err) => {
        if (active) setError(err.message)
      })
      .finally(() => {
        if (active) setIsLoading(false)
      })
    return () => { active = false }
  }, [])

  const startEdit = (transaction) => {
    setEditingTransaction(transaction)
    setIsForm(true)
  }

  const handleSave = async (formData) => {
    if (isBusy) return
    const payload = {
      description: formData.description.trim(),
      category: formData.category,
      date: formData.date,
      sum: Number(formData.amount),
    }
    setIsBusy(true)
    setError('')
    try {
      const items = editingTransaction
        ? await updateTransaction(editingTransaction._id ?? editingTransaction.id, payload)
        : await createTransaction(payload)
      setTransactions(items)
      setEditingTransaction(null)
      setIsForm(false)
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setIsBusy(false)
    }
  }

  const deleteTransactions = async (ids) => {
    if (isBusy || ids.length === 0) return
    setIsBusy(true)
    setError('')
    try {
      let items = transactions
      for (const id of ids) {
        items = await deleteTransaction(id)
      }
      setTransactions(items)
    } catch (err) {
      setError(err.message)
      try {
        setTransactions(await getTransactions())
      } catch {
        // Keep the error visible; a later reload can retry.
      }
      throw err
    } finally {
      setIsBusy(false)
    }
  }

  return (
    <Page>
      {error ? (
        <Feedback role="alert">{error}</Feedback>
      ) : isLoading ? (
        <Feedback role="status">Загрузка расходов...</Feedback>
      ) : null}
      <BackButton
        type="button"
        $visible={isForm}
        onClick={() => { setIsForm(false); setEditingTransaction(null) }}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.44425 1.16675H4.55591C2.43258 1.16675 1.16675 2.43258 1.16675 4.55591V9.43841C1.16675 11.5676 2.43258 12.8334 4.55591 12.8334H9.43841C11.5617 12.8334 12.8276 11.5676 12.8276 9.44425V4.55591C12.8334 2.43258 11.5676 1.16675 9.44425 1.16675ZM10.5001 7.43758H4.55591L6.31175 9.19341C6.48091 9.36258 6.48091 9.64258 6.31175 9.81175C6.22425 9.89925 6.11341 9.94008 6.00258 9.94008C5.89175 9.94008 5.78091 9.89925 5.69341 9.81175L3.19091 7.30925C3.10925 7.22758 3.06258 7.11675 3.06258 7.00008C3.06258 6.88341 3.10925 6.77258 3.19091 6.69091L5.69341 4.18841C5.86258 4.01925 6.14258 4.01925 6.31175 4.18841C6.48091 4.35758 6.48091 4.63758 6.31175 4.80675L4.55591 6.56258H10.5001C10.7392 6.56258 10.9376 6.76091 10.9376 7.00008C10.9376 7.23925 10.7392 7.43758 10.5001 7.43758Z"
            fill="#999999"
          />
        </svg>
        <span>Мои расходы</span>
      </BackButton>

      <PageHeader $hiddenMobile={isForm}>
        <PageTitle>Мои расходы</PageTitle>
        <MobileNewExpense type="button" onClick={() => { setIsForm(true); setEditingTransaction(null) }}>
          {!isForm && (
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.99984 1.16663C3.78567 1.16663 1.1665 3.78579 1.1665 6.99996C1.1665 10.2141 3.78567 12.8333 6.99984 12.8333C10.214 12.8333 12.8332 10.2141 12.8332 6.99996C12.8332 3.78579 10.214 1.16663 6.99984 1.16663ZM9.33317 7.43746H7.43734V9.33329C7.43734 9.57246 7.239 9.77079 6.99984 9.77079C6.76067 9.77079 6.56234 9.57246 6.56234 9.33329V7.43746H4.6665C4.42734 7.43746 4.229 7.23913 4.229 6.99996C4.229 6.76079 4.42734 6.56246 4.6665 6.56246H6.56234V4.66663C6.56234 4.42746 6.76067 4.22913 6.99984 4.22913C7.239 4.22913 7.43734 4.42746 7.43734 4.66663V6.56246H9.33317C9.57234 6.56246 9.77067 6.76079 9.77067 6.99996C9.77067 7.23913 9.57234 7.43746 9.33317 7.43746Z"
                fill="black"
              />
            </svg>
          )}
          <p>Новый расход</p>
        </MobileNewExpense>
      </PageHeader>

      <Expenses
        $hiddenMobile={isForm}
        transactions={transactions}
        onDelete={deleteTransactions}
        onEdit={startEdit}
        isBusy={isBusy || isLoading}
      />
      <ExpenseForm
        key={editingTransaction?._id ?? editingTransaction?.id ?? 'new'}
        $hiddenMobile={!isForm}
        initialTransaction={editingTransaction}
        onSave={handleSave}
        isSubmitting={isBusy || isLoading}
      />
    </Page>
  )
}

export default SpendingTable
