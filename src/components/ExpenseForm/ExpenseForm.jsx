import { useState } from 'react'
import {
  FormS,
  FormTitle,
  FieldGroup,
  FieldLabel,
  CategoryGrid,
  CategoryButton,
  CategoryName,
  SubmitButton,
  DisabledButton,
} from './ExpenseForm.styled'
import BaseInput from '../SignForm/BaseInput'
import CategoriesSVG from './CategoriesSVG'

const categories = [
  { id: 'food', name: 'Еда' },
  { id: 'transport', name: 'Транспорт' },
  { id: 'housing', name: 'Жилье' },
  { id: 'entertainment', name: 'Развлечения' },
  { id: 'education', name: 'Образование' },
  { id: 'other', name: 'Другое' },
]

const ExpenseForm = () => {
  const [formData, setFormData] = useState({
    description: '',
    category: '',
    date: '',
    amount: '',
  })

  const [errors, setErrors] = useState({
    description: '',
    category: '',
    date: '',
    amount: '',
  })

  const [error, setError] = useState('')

  const [selectedCategory, setSelectedCategory] = useState('')

  const validateForm = () => {
    const newErrors = { description: '', category: '', date: '', amount: '' }
    let isValid = true

    if (!formData.description.trim()) {
      newErrors.description = true
      setError('Заполните все поля')
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
    if (!formData.amount.trim()) {
      newErrors.amount = true
      setError('Заполните все поля')
      isValid = false
    }
    if (formData.amount <= 0) {
      newErrors.amount = true
      setError('Сумма не может быть меньше или равна нулю')
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
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validateForm()) {
      return
    }
    console.log('Form submitted:', formData)
  }

  return (
    <FormS onSubmit={handleSubmit}>
      <FormTitle>Новый расход</FormTitle>

      <FieldGroup>
        <FieldLabel>Описание {errors.description && <span>*</span>}</FieldLabel>
        <BaseInput
          id="description"
          type="text"
          name="description"
          placeholder="Введите описание"
          value={formData.description}
          error={errors.description}
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
        <BaseInput
          type="date"
          name="date"
          placeholder="Введите дату"
          value={formData.date}
          error={errors.date}
          onChange={handleChange}
        />
      </FieldGroup>

      <FieldGroup>
        <FieldLabel>Сумма {errors.amount && <span>*</span>}</FieldLabel>
        <BaseInput
          type="number"
          min={0}
          name="amount"
          placeholder="Введите сумму"
          value={formData.amount}
          error={errors.amount}
          onChange={handleChange}
        />
      </FieldGroup>
      {!error ? (
        <SubmitButton type="submit">Добавить новый расход</SubmitButton>
      ) : (
        <DisabledButton disabled={true}>Добавить новый расход</DisabledButton>
      )}
    </FormS>
  )
}

export default ExpenseForm
