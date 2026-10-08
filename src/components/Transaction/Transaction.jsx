import {
  Container,
  TransactionValue,
  TransactionValueRight,
  TransactionDelete,
} from './Transaction.styled'

const categories = {
  joy: 'Развлечения',
  housing: 'Жилье',
  transport: 'Транспорт',
  food: 'Еда',
  education: 'Образование',
  others: 'Другое',
}

const formatDate = (value) => {
  const d = new Date(value)
  const day = String(d.getDate()).padStart(2, '0')
  const month = String(d.getMonth() + 1).padStart(2, '0')
  return `${day}.${month}.${d.getFullYear()}`
}

const Transaction = ({
  description,
  category,
  date,
  sum,
  isSelected = false,
  onSelect,
}) => {
  return (
    <Container $selected={isSelected} onClick={onSelect}>
      <TransactionValue $selected={isSelected}>{description}</TransactionValue>
      <TransactionValue $selected={isSelected}>
        {categories[category]}
      </TransactionValue>
      <TransactionValueRight $selected={isSelected}>
        {formatDate(date)}
      </TransactionValueRight>
      <TransactionValueRight $selected={isSelected}>
        {sum} ₽
      </TransactionValueRight>
      <TransactionDelete src="/bag.svg" alt="Удалить" />
    </Container>
  )
}

export default Transaction
