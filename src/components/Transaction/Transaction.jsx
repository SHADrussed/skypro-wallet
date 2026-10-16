import {
  Container,
  TransactionValue,
  TransactionValueRight,
  TransactionDelete,
  TransactionActions,
  EditAction,
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
  onEdit,
  isBusy = false,
}) => {
  return (
    <Container
      $selected={isSelected}
      onClick={onSelect}
      title="Нажмите строку для выбора расхода"
    >
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
      <TransactionActions>
        <EditAction
          type="button"
          aria-label={`Редактировать расход: ${description}`}
          title="Редактировать"
          disabled={isBusy}
          onClick={(event) => {
            event.stopPropagation()
            onEdit?.()
          }}
        >
          ✎
        </EditAction>
        <TransactionDelete src="/bag.svg" alt="" aria-hidden="true" />
      </TransactionActions>
    </Container>
  )
}

export default Transaction
