import styled from 'styled-components'
import theme from '../../theme'

export const FormS = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xl};
  grid-column: span 4;
  height: 618px;

  display: flex;
  flex-direction: column;

  background: ${theme.colors.surface};
  border-radius: 24px;
  padding: 32px;
  box-shadow: ${theme.shadows.card};

  @media screen and (max-width: 375px) {
    border-radius: 0;
    padding: 16px;
    box-shadow: none;
    gap: ${theme.spacing.lg};
  }
`

export const FormTitle = styled.h2`
  font-size: ${theme.typography.fontSize.title};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.text};
  margin: 0;
`

export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`

export const FieldLabel = styled.label`
  font-size: ${theme.typography.fontSize.month};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.text};
  & span {
    color: ${theme.colors.errorText};
  }
`

export const CategoryGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`

export const CategoryButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  width: fit-content;
  padding: 8px 20px;
  border: none;
  border-radius: ${theme.radii.card};
  background: ${({ $active }) => ($active ? theme.colors.inputFocus : theme.colors.background)};
  font-size: ${theme.typography.fontSize.caption};
  font-weight: ${theme.typography.fontWeight.regular};
  color: ${({ $active }) => ($active ? theme.colors.primary : theme.colors.text)};
  cursor: pointer;
  transition: all 0.2s ease;
  outline: none;

  &:hover {
    border-color: ${theme.colors.primary};
  }
`

export const CategoryName = styled.span`
  font-weight: ${theme.typography.fontWeight.medium};
`

export const SubmitButton = styled.button`
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: ${theme.radii.control};
  background-color: ${({ $error }) => ($error ? `${theme.colors.textSecondary}` : `${theme.colors.primary}`)};
  color: ${theme.colors.primaryText};
  font-size: ${theme.typography.fontSize.caption};
  font-weight: ${theme.typography.fontWeight.semibold};

  &:hover {
    background-color: #33399b;
    cursor: pointer;
  }
`
export const DisabledButton = styled(SubmitButton)`
  background-color: ${theme.colors.textSecondary};
  &:hover {
    cursor: not-allowed;
    background-color: ${theme.colors.textSecondary};
  }
`
