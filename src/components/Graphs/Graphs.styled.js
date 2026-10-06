import styled from 'styled-components'
import theme from '../../theme'
import { Title } from '../../common'

export const GraphsStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  background-color: ${theme.colors.surface};

  border-radius: ${theme.radii.card};
  height: inherit;

  padding: ${theme.spacing.xxl};
`
export const AnalyticsHeader = styled.div``
export const TotalAmount = styled(Title)`
  margin-bottom: ${theme.spacing.lg};
`
export const PeriodBlock = styled.div`
  margin-top: ${theme.spacing.md};
  color: ${theme.colors.textSecondary};
  display: flex;
  gap: ${theme.spacing.xs};
  font-size: ${theme.typography.fontSize.body};
`
export const Period = styled.div`
  font-weight: ${theme.typography.fontWeight.bold};
`

export const GraphContent = styled.div``

export const Chart = styled.div`
  margin-top: ${theme.spacing.xl};
  scrollbar-width: thin;
  scrollbar-color: #c9c9c9 transparent;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    display: none;
  }

  &::-webkit-scrollbar-corner {
    display: none;
  }
  overflow-x: auto;
  overflow-y: hidden;
  height: 360px;

  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 24px;
`

export const Column = styled.div`
  height: 100%;

  display: grid;
  grid-template-rows: 1fr auto;
`

export const BarArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
`

export const Amount = styled.span`
  margin-bottom: 12px;

  font-weight: ${theme.typography.fontWeight.semibold};
`

export const Category = styled.span`
  margin-top: 12px;
  text-align: center;

  font-size: ${theme.typography.fontSize.caption};
`
export const Bar = styled.div`
  width: 94px;

  height: ${({ $height, $empty }) => ($empty ? '4px' : `${$height}%`)};

  border-radius: ${({ $empty }) => ($empty ? '4px' : '12px')};

  background-color: ${({ $color }) => theme.colors.chart[$color]};
`
