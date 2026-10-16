import { useState } from 'react'
import {
  FormS,
  FormTitle,
  FieldGroup,
  FieldLabel,
  CategoryGrid,
  CategoryButton,
  CategoryName,
  ExpenseInput,
  SubmitButton,
} from './ExpenseForm.styled'
import CategoriesSVG from './CategoriesSVG'

const categories = [
  { id: 'food', name: 'Еда' },
  { id: 'transport', name: 'Транспорт' },
  { id: 'housing', name: 'Жилье' },
  { id: 'joy', name: 'Развлечения' },
  { id: 'education', name: 'Образование' },
  { id: 'others', name: 'Другое' },
]

const emptyForm = { description: '', category: '', date: '', amount: '' }
const emptyErrors = {
  description: false,
  category: false,
  date: false,
  amount: false,
}

const ExpenseForm = ({ onSave, initialTransaction, isSubmitting = false, $hiddenMobile }) => {
  const [formData, setFormData] = useState(() => initialTransaction ? {
    description: initialTransaction.description ?? '',
    category: initialTransaction.category ?? '',
    date: initialTransaction.date?.slice(0, 10) ?? '',
    amount: String(initialTransaction.sum ?? ''),
  } : emptyForm)
  const [errors, setErrors] = useState(emptyErrors)
  const [error, setError] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(initialTransaction?.category ?? '')

  const validateForm = () => {
    const newErrors = { ...emptyErrors }
    let isValid = true

    if (formData.description.trim().length < 4) {
      newErrors.description = true
      setError('Описание должно содержать минимум 4 символа')
      isValid = false
    }

    if (!formData.category.trim()) {
      newErrors.category = true
      setError('Заполните все поля')
      isValid = false
    }

    if (!formData.date.trim()) {
      newErrors.date = true
      setError('Заполните все поля')
      isValid = false
    }

    if (!String(formData.amount).trim()) {
      newErrors.amount = true
      setError('Заполните все поля')
      isValid = false
    } else if (!Number.isInteger(Number(formData.amount)) || Number(formData.amount) <= 0) {
      newErrors.amount = true
      setError('Сумма должна быть положительным целым числом')
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
    setErrors({ ...errors, [name]: false })
    setError('')
  }

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId)
    setFormData((prev) => ({ ...prev, category: categoryId }))
    setErrors({ ...errors, category: false })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (isSubmitting || !validateForm()) return

    try {
      await onSave(formData)
      setFormData(emptyForm)
      setSelectedCategory('')
      setErrors(emptyErrors)
      setError('')
    } catch (err) {
      setError(err.message || 'Не удалось сохранить расход')
    }
  }

  return (
    <FormS onSubmit={handleSubmit} $hiddenMobile={$hiddenMobile}>
      <FormTitle>{initialTransaction ? 'Редактировать расход' : 'Новый расход'}</FormTitle>

      <FieldGroup>
        <FieldLabel>Описание {errors.description && <span>*</span>}</FieldLabel>
        <ExpenseInput
          id="description"
          type="text"
          name="description"
          value={formData.description}
          placeholder="Введите описание"
          $value={formData.description}
          $error={errors.description}
          onChange={handleChange}
        />
      </FieldGroup>

      <FieldGroup>
        <FieldLabel>Категория {errors.category && <span>*</span>}</FieldLabel>
        <CategoryGrid>
          {categories.map((cat) => (
            <CategoryButton
              key={cat.id}
              type="button"
              $active={selectedCategory === cat.id}
              onClick={() => handleCategorySelect(cat.id)}
            >
              <CategoriesSVG
                category={cat.id}
                isActive={selectedCategory === cat.id}
              />
              <CategoryName>{cat.name}</CategoryName>
            </CategoryButton>
          ))}
        </CategoryGrid>
      </FieldGroup>

      <FieldGroup>
        <FieldLabel>Дата {errors.date && <span>*</span>}</FieldLabel>
        <ExpenseInput
          id="date"
          type="date"
          name="date"
          value={formData.date}
          $value={formData.date}
          $error={errors.date}
          onChange={handleChange}
        />
      </FieldGroup>

      <FieldGroup>
        <FieldLabel>Сумма {errors.amount && <span>*</span>}</FieldLabel>
        <ExpenseInput
          id="amount"
          type="number"
          min={0}
          name="amount"
          value={formData.amount}
          placeholder="Введите сумму"
          $value={formData.amount}
          $error={errors.amount}
          onChange={handleChange}
        />
      </FieldGroup>
      {error && <p role="alert">{error}</p>}
      <SubmitButton type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Сохранение...' : initialTransaction ? 'Сохранить изменения' : 'Добавить новый расход'}
      </SubmitButton>
    </FormS>
  )
}

export default ExpenseForm
