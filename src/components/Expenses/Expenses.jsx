import Transaction from '../Transaction/Transaction'
import {
  SpendingTable,
  TableHeader,
  TableBody,
  Title,
  TableHeaderP,
  TableHeaderPRight,
} from './Expenses.styled'

const Expenses = () => {
  const transactions = [
    {
      _id: '67e4688c8d573f845a6083f3',
      userId: '67e2cba0d743f2b960865bcb',
      description: 'Игры Steam',
      category: 'joy',
      date: '2025-12-11T21:00:00.000Z',
      sum: 1,
    },
    {
      _id: '67e46c604d573f845a6083f4',
      userId: '67e2cba0d743f2b960865bcb',
      description: 'Аквапарк',
      category: 'joy',
      date: '2025-12-11T21:00:00.000Z',
      sum: 1,
    },
    {
      _id: '67e4688c8d573f245a6083f3',
      userId: '67e2cba0d743f2b960865bcb',
      description: 'Игры Steam',
      category: 'joy',
      date: '2025-12-11T21:00:00.000Z',
      sum: 1,
    },
    {
      _id: '67e46c608d573f845a6083f4',
      userId: '67e2cba0d743f2b960865bcb',
      description: 'Аквапарк',
      category: 'joy',
      date: '2025-12-11T21:00:00.000Z',
      sum: 1,
    },
  ]

  return (
    <SpendingTable>
      <Title>Таблица расходов</Title>

      <TableHeader>
        <TableHeaderP>Описание</TableHeaderP>
        <TableHeaderP>Категория</TableHeaderP>
        <TableHeaderPRight>Дата</TableHeaderPRight>
        <TableHeaderPRight>Сумма</TableHeaderPRight>
        <span />
      </TableHeader>

      <TableBody>
        {transactions.map((transaction) => (
          <Transaction
            key={transaction.id ?? transaction._id}
            {...transaction}
          />
        ))}
      </TableBody>
    </SpendingTable>
  )
}

export default Expenses
