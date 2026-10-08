import styled from 'styled-components'
import theme from '../../theme'

export const Container = styled.div`
  display: grid;

  /*
   * 4 основные колонки:
   * описание
   * категория
   * дата
   * сумма
   *
   * последняя колонка — кнопка удаления
   */
  grid-template-columns: 1fr 1fr 1fr 1fr 32px;

  align-items: center;
  column-gap: 0;
  height: 15px;
`

export const TransactionValue = styled.p`
  font-size: ${theme.typography.fontSize.caption};
  font-weight: ${theme.typography.fontWeight.regular};
  color: ${theme.colors.text};
  @media screen and (max-width: 375px) {
    font-size: 10px;
  }
`

export const TransactionValueRight = styled(TransactionValue)`
  @media screen and (max-width: 375px) {
    text-align: right;
  }
`

export const TransactionDelete = styled.img`
  display: block;
  cursor: pointer;
  @media screen and (max-width: 375px) {
    display: none;
  }
`
