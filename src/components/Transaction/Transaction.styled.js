import styled from 'styled-components'
import theme from '../../theme'

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 32px;
  align-items: center;
  column-gap: 0;
  height: 15px;

  @media (max-width: 768px) {
    /* 4 колонки по ~74px с зазором 16px, как в макете (343px) */
    grid-template-columns: repeat(4, 1fr);
    column-gap: 16px;
    /* выделенная строка: 24px высотой на всю ширину экрана */
    padding: 6px 16px;
    background-color: ${({ $selected }) =>
      $selected ? theme.colors.inputFocus : 'transparent'};
  }
`

export const TransactionValue = styled.p`
  font-size: ${theme.typography.fontSize.caption};
  font-weight: ${theme.typography.fontWeight.regular};
  color: ${({ $selected }) => ($selected ? theme.colors.primary : theme.colors.text)};

  @media (max-width: 768px) {
    font-size: 10px;
    line-height: 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

export const TransactionValueRight = styled(TransactionValue)`
  @media (max-width: 768px) {
    text-align: right;
  }
`

export const TransactionDelete = styled.img`
  display: block;
  cursor: pointer;

  @media (max-width: 768px) {
    display: none;
  }
`
