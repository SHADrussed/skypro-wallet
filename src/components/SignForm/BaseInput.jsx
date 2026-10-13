import {
  AuthInput,
  AuthInputWrapper,
  InputErrorMarker,
  InputPlaceholder,
} from './SignForm.styled'

const BaseInput = ({
  id,
  name,
  placeholder = '',
  type = 'text',
  error = false,
  value = '',
  min,
  onChange,
}) => {
  return (
    <AuthInputWrapper>
      <AuthInput
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        min={min}
        $value={value}
        $error={error}
        aria-invalid={Boolean(error)}
        onChange={onChange}
      />
      {!value && placeholder && (
        <InputPlaceholder aria-hidden="true">
          {placeholder}
          {error && <span>*</span>}
        </InputPlaceholder>
      )}
      {value && error && (
        <InputErrorMarker aria-hidden="true">*</InputErrorMarker>
      )}
    </AuthInputWrapper>
  )
}

export default BaseInput
