import styled from 'styled-components'
import theme from '../../theme'

export const Page = styled.div`
  background-color: ${theme.colors.background};
  height: calc(100vh - 64px);
  padding: 36px 120px;
  gap: 32px;

  display: grid;

  grid-template-rows: 48px auto;
  grid-template-columns: repeat(12, 1fr);

  @media (max-width: 768px) {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    height: auto;
    min-height: calc(100vh - 54px); /* шапка на мобильном 54px */
    padding: 24px 16px 0;
    background: ${theme.colors.surface};
    gap: 0;
  }
`

export const PageHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  grid-column: span 12;
  margin-bottom: ${theme.spacing.xxl};
  align-self: center;

  @media (max-width: 768px) {
    display: ${({ $hiddenMobile }) => ($hiddenMobile ? 'none' : 'flex')};
    align-items: flex-end;
    margin: 0 0 22px;
    width: 100%;
  }
`

export const PageTitle = styled.h1`
  margin: 0;
  font-size: 32px;
  font-weight: ${theme.typography.fontWeight.bold};
  line-height: ${theme.typography.lineHeight.caption};

  @media (max-width: 768px) {
    font-size: 24px;
    line-height: 29px;
  }
`

export const MobileNewExpense = styled.button`
  display: none;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 6px;
    margin-bottom: 3px;
  }

  & p {
    margin: 0;
    font-size: 14px;
    font-weight: ${theme.typography.fontWeight.semibold};
    line-height: 18px;
    color: ${theme.colors.text};
  }
`

export const BackButton = styled.button`
  display: none;
  align-items: center;
  gap: 6px;
  align-self: flex-start;
  background: none;
  border: none;
  padding: 0;
  margin: 0 0 12px;
  cursor: pointer;

  @media (max-width: 768px) {
    display: ${({ $visible }) => ($visible ? 'flex' : 'none')};
  }

  & span {
    font-size: ${theme.typography.fontSize.caption};
    font-weight: ${theme.typography.fontWeight.semibold};
    line-height: 18px;
    color: ${theme.colors.textSecondary};
  }
`
