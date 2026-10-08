import styled from 'styled-components'
import theme from '../../theme'

export const FormS = styled.form`
  grid-column: span 4;
  height: 618px;

  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xl};

  background: ${theme.colors.surface};
  border-radius: 24px;
  padding: 32px;
  box-shadow: ${theme.shadows.card};

  @media (max-width: 768px) {
    display: ${({ $hiddenMobile }) => ($hiddenMobile ? 'none' : 'flex')};
    flex: 1;
    height: auto;
    box-sizing: border-box;
    border-radius: 0;
    padding: 0 0 103px; /* место под фиксированную панель с кнопкой */
    box-shadow: none;
    gap: 24px;
  }
`

export const FormTitle = styled.h2`
  font-size: ${theme.typography.fontSize.title};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.text};
  margin: 0;

  @media (max-width: 768px) {
    font-size: 24px;
    line-height: 29px;
  }
`

export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};

  @media (max-width: 768px) {
    gap: 16px;
  }
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
  background: ${({ $active }) =>
    $active ? theme.colors.inputFocus : theme.colors.background};
  font-size: ${theme.typography.fontSize.caption};
  font-weight: ${theme.typography.fontWeight.regular};
  color: ${({ $active }) =>
    $active ? theme.colors.primary : theme.colors.text};
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
  line-height: 15px;
  border: none;
  border-radius: ${theme.radii.control};
  background-color: ${theme.colors.primary};
  color: ${theme.colors.primaryText};
  font-size: ${theme.typography.fontSize.caption};
  font-weight: ${theme.typography.fontWeight.semibold};

  &:hover {
    background-color: #33399b;
    cursor: pointer;
  }
`

/* Десктоп: кнопка внизу формы. Мобильный: панель 87px, прижатая к низу экрана */
export const SubmitBar = styled.div`
  margin-top: auto;

  @media (max-width: 768px) {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    box-sizing: border-box;
    padding: 24px 16px;
    background: ${theme.colors.surface};
    box-shadow: 0 -20px 67px -12px rgba(0, 0, 0, 0.13);
  }
`

export const DisabledButton = styled(SubmitButton)`
  background-color: ${theme.colors.textSecondary};

  &:hover {
    cursor: not-allowed;
    background-color: ${theme.colors.textSecondary};
  }
`
