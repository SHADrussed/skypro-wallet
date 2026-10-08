import {
  Container,
  TransactionValue,
  TransactionValueRight,
  TransactionDelete,
} from './Transaction.styled'

const Transaction = ({ _id, description, category, date, sum }) => {
  const formated_date = new Date(date)

  const [month, day, year] = [
    formated_date.getMonth(),
    formated_date.getDay(),
    formated_date.getFullYear(),
  ]

  const categories = {
    joy: 'Развлечение',
    housing: 'Жилье',
    transport: 'Транспорт',
    food: 'Еда',
    education: 'Образование',
    others: 'Другое',
  }

  return (
    <Container>
      <TransactionValue>{description}</TransactionValue>
      <TransactionValue>{categories[category]}</TransactionValue>
      <TransactionValueRight>{`${day}.${month}.${year}`}</TransactionValueRight>
      <TransactionValueRight>{sum} ₽</TransactionValueRight>
      <TransactionDelete src="/bag.svg" alt="Удалить" />
    </Container>
  )
}

export default Transaction
