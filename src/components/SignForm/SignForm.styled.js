import styled from 'styled-components'
import theme from '../../theme'

export const AuthPage = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px 16px;
  background-color: ${theme.colors.background};
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
    border: none;
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
  background-color: ${theme.colors.surface};
  border: 0.5px solid
    ${({ $error }) => ($error ? '#F84D4D' : 'rgb(148 166 190 / 40%)')};
  border-radius: ${theme.radii.control};
  outline: none;
  font: inherit;

  &::placeholder {
    color: ${theme.colors.textSecondary};
  }

  &:focus {
    border-color: ${({ $error }) => ($error ? '#F84D4D' : '#565eef')};
  }
`

export const FormButton = styled.button`
  width: 100%;
  min-height: 40px;
  margin-top: 13px;
  border: none;
  border-radius: 4px;
  background-color: #565eef;
  color: #ffffff;
  font: inherit;
  font-size: 14px;
  font-weight: 500;

  &:hover {
    background-color: #33399b;
  }
`

export const FormDescription = styled.p`
  margin: 13px 0 0;
  color: rgb(148 166 190 / 70%);
  font-size: 14px;
  line-height: 150%;
  text-align: center;
`

export const FormLink = styled.a`
  color: rgb(148 166 190 / 70%);
  text-decoration: underline;
`

export const ErrorText = styled.p`
  font-size: 12px;
  font-weight: 400;
  line-height: 150%;
  text-align: center;
  color: #f84d4d;
  margin-top: 7px;
  margin-bottom: 20px;
`
