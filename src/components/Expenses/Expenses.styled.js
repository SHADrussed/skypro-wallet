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

  @media (max-width: 768px) {
    display: ${({ $hiddenMobile }) => ($hiddenMobile ? 'none' : 'flex')};
    flex: 1;
    height: auto;
    min-height: 0;
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

  @media (max-width: 768px) {
    /* на всю ширину экрана, линия под шапкой тоже */
    grid-template-columns: repeat(4, 1fr);
    column-gap: 16px;
    margin: 0 -16px;
    padding: 0 16px 6px;

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

  @media (max-width: 768px) {
    font-size: 10px;
    line-height: 12px;
  }
`

export const TableHeaderPRight = styled(TableHeaderP)`
  @media (max-width: 768px) {
    text-align: right;
  }
`

export const TableBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  overflow: auto;
  flex: 1;
  min-height: 0;

  @media (max-width: 768px) {
    gap: 4px;
    margin: 0 -16px;
    /* 8px + 6px отступа строки = 14px от линии до текста, как в макете */
    padding: 8px 0 ${({ $hasBar }) => ($hasBar ? '103px' : '16px')};
  }
`

/* Нижняя панель 87px: отступы 24px, кнопка 39px. Видна, только когда что-то выбрано */
export const DeletionForm = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: ${({ $visible }) => ($visible ? 'block' : 'none')};
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

export const DeleteButton = styled.button`
  width: 100%;
  border: none;
  border-radius: ${theme.radii.control};
  background-color: ${theme.colors.primary};
  color: ${theme.colors.primaryText};
  text-align: center;
  font-size: ${theme.typography.fontSize.caption};
  font-weight: ${theme.typography.fontWeight.semibold};
  line-height: 15px;
  padding: 12px;
  cursor: pointer;
`
