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

const Expenses = ({ transactions = [], onDelete, $hiddenMobile }) => {
  const [selectedIds, setSelectedIds] = useState([])

  const toggleSelect = (id) => {
    $hiddenMobile && setSelectedIds(id)
  }

  const handleDelete = () => {
    if (selectedIds.length === 0) return
    onDelete?.(selectedIds)
    setSelectedIds([])
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
            />
          )
        })}
      </TableBody>

      <DeletionForm $visible={selectedIds.length > 0}>
        <DeleteButton type="button" onClick={handleDelete}>
          Удалить расход
        </DeleteButton>
      </DeletionForm>
    </SpendingTable>
  )
}

export default Expenses
