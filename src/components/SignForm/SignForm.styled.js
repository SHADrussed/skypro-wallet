import styled from 'styled-components'
import theme from '../../theme'

export const AuthPage = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background-color: ${theme.colors.background};
  @media screen and (max-width: 375px) {
    background-color: ${theme.colors.surface};
  }
`
export const FormCard = styled.div`
  width: 100%;
  max-width: 379px;
  padding: 32px;
  background-color: ${theme.colors.surface};
  border-radius: ${theme.radii.card};
  box-shadow: ${theme.shadows.card};
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media screen and (max-width: 375px) {
    max-width: 100%;
    padding: 0;
    box-shadow: none;
  }
`

export const FormTitle = styled.h1`
  text-align: center;
  font-size: ${theme.typography.fontSize.title};
  line-height: 100%;
  font-weight: ${theme.typography.fontWeight.bold};
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 12px;
`

export const FormInput = styled.input`
  width: 100%;
  padding: 12px;
  background-color: ${({ $error, $value }) => ($error ? `${theme.colors.errorBackground}` : `${$value ? `${theme.colors.inputFocus}` : `${theme.colors.surface}`}`)};
  border: 0.5px solid
    ${({ $error, $value }) => ($error ? `${theme.colors.errorBorder}` : `${$value ? `${theme.colors.primary}` : `${theme.colors.border}`}`)};
  border-radius: ${theme.radii.control};
  outline: none;
  font: inherit;

  &::placeholder {
    color: ${theme.colors.textSecondary};
  }
`

export const FormButton = styled.button`
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

export const DisabledButton = styled(FormButton)`
  background-color: ${theme.colors.textSecondary};
  &:hover {
    cursor: not-allowed;
    background-color: ${theme.colors.textSecondary};
  }
`

export const FormDescription = styled.p`
  color: ${theme.colors.textSecondary};
  font-size: ${theme.typography.fontSize.caption};
  line-height: ${theme.typography.lineHeight.caption};
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  flex-direction: column;
`

export const FormLink = styled.a`
  color: ${theme.colors.textSecondary};
  text-decoration: underline;
`

export const ErrorText = styled.p`
  font-size: ${theme.typography.fontSize.caption};
  font-weight: ${theme.typography.fontWeight.regular};
  line-height: ${theme.typography.lineHeight.caption};
  text-align: center;
  color: ${theme.colors.errorText};
  margin-top: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.xl};
`
