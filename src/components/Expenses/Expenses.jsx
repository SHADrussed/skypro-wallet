import { useState } from 'react'
import Transaction from '../Transaction/Transaction'
import {
  SpendingTable,
  TableHeader,
  TableBody,
  Title,
  TableHeaderP,
  TableHeaderPRight,
  DeletionForm,
  DeleteButton,
} from './Expenses.styled'

const Expenses = ({
  transactions = [],
  onDelete,
  onEdit,
  isBusy = false,
  $hiddenMobile,
}) => {
  const [selectedIds, setSelectedIds] = useState([])

  const toggleSelect = (id) => {
    if (isBusy) return
    setSelectedIds((previous) =>
      previous.includes(id)
        ? previous.filter((selectedId) => selectedId !== id)
        : [...previous, id],
    )
  }

  const handleDelete = async () => {
    if (isBusy || selectedIds.length === 0) return
    try {
      await onDelete(selectedIds)
      setSelectedIds([])
    } catch {
      // The parent displays the API error and resynchronizes the list.
    }
  }

  return (
    <SpendingTable $hiddenMobile={$hiddenMobile}>
      <Title>Таблица расходов</Title>

      <TableHeader>
        <TableHeaderP>Описание</TableHeaderP>
        <TableHeaderP>Категория</TableHeaderP>
        <TableHeaderPRight>Дата</TableHeaderPRight>
        <TableHeaderPRight>Сумма</TableHeaderPRight>
        <span />
      </TableHeader>

      <TableBody $hasBar={selectedIds.length > 0}>
        {transactions.map((transaction) => {
          const id = transaction.id ?? transaction._id
          return (
            <Transaction
              key={id}
              {...transaction}
              isSelected={selectedIds.includes(id)}
              onSelect={() => toggleSelect(id)}
              onEdit={() => onEdit(transaction)}
              isBusy={isBusy}
            />
          )
        })}
      </TableBody>

      <DeletionForm $visible={selectedIds.length > 0}>
        <DeleteButton type="button" onClick={handleDelete} disabled={isBusy}>
          Удалить расход
        </DeleteButton>
      </DeletionForm>
    </SpendingTable>
  )
}

export default Expenses
