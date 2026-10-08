import styled from 'styled-components'
import theme from '../../theme'

export const SpendingTable = styled.main`
  grid-column: 1 / span 8;
  height: 618px;

  display: flex;
  flex-direction: column;

  background: ${theme.colors.surface};
  border-radius: 24px;
  padding: 32px 32px 8px 32px;
  box-shadow: ${theme.shadows.card};

  @media screen and (max-width: 375px) {
    border-radius: 0;
    padding: 0;
    box-shadow: none;
  }
`

export const Title = styled.h1`
  font-size: ${theme.typography.fontSize.title};
  font-weight: ${theme.typography.fontWeight.bold};
  margin: 0 0 ${theme.spacing.xxl};

  @media (max-width: 768px) {
    margin: 0 0 24px;
    font-size: 24px;
  }
  @media screen and (max-width: 375px) {
    display: none;
  }
`

export const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 32px;

  align-items: center;
  column-gap: 0;

  padding-bottom: 8px;
  border-bottom: 1px solid ${theme.colors.border};
  @media screen and (max-width: 375px) {
    & span {
      display: none;
    }
  }
`

export const TableHeaderP = styled.p`
  margin: 0;
  font-size: ${theme.typography.fontSize.caption};
  font-weight: ${theme.typography.fontWeight.regular};
  color: ${theme.colors.textSecondary};
  @media screen and (max-width: 375px) {
    font-size: 10px;
  }
`

export const TableHeaderPRight = styled(TableHeaderP)`
  @media screen and (max-width: 375px) {
    text-align: right;
  }
`

export const TableBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  overflow: auto;
  height: stretch;
`
