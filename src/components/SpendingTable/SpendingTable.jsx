import { Page, PageTitle } from './SpendingTable.styled'
import Expenses from '../Expenses/Expenses'
import ExpenseForm from '../ExpenseForm/ExpenseForm'

const SpendingTable = () => {
  return (
    <Page>
      <PageTitle>Мои расходы</PageTitle>
      <Expenses />
      <ExpenseForm />
    </Page>
  )
}

export default SpendingTable
