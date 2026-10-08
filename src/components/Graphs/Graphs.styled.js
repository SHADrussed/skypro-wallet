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

  @media (max-width: 768px) {
    flex: 1;
    justify-content: flex-start;
    height: auto;
    min-width: 0;
    padding: 0;
    border-radius: 0;
    background: transparent;
  }
`
export const AnalyticsHeader = styled.div`
  @media (max-width: 768px) {
    margin-bottom: 24px;
  }
`
export const TotalAmount = styled(Title)`
  margin-bottom: ${theme.spacing.lg};

  @media (max-width: 768px) {
    font-size: 20px;
    margin-bottom: 8px;
  }
`
export const PeriodBlock = styled.div`
  margin-top: ${theme.spacing.md};
  color: ${theme.colors.textSecondary};
  display: flex;
  gap: ${theme.spacing.xs};
  font-size: ${theme.typography.fontSize.body};

  @media (max-width: 768px) {
    flex-wrap: wrap;
    margin-top: 0;
  }
`
export const Period = styled.div`
  font-weight: ${theme.typography.fontWeight.bold};
`

export const GraphContent = styled.div`
  @media (max-width: 768px) {
    min-width: 0;
  }
`

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
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 24px;

  @media (max-width: 768px) {
    height: 360px;
    margin-top: 0;
    padding-bottom: 4px;
    grid-template-columns: repeat(6, minmax(46px, 1fr));
    gap: 6px;

    &::-webkit-scrollbar {
      height: 4px;
    }

    &::-webkit-scrollbar-thumb {
      display: block;
      background: #c9c9c9;
      border-radius: 10px;
    }
  }
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

  @media (max-width: 768px) {
    max-width: 100%;
    margin-bottom: 8px;
    font-size: 11px;
    text-align: center;
    white-space: nowrap;
  }
`

export const Category = styled.span`
  margin-top: 12px;
  text-align: center;

  font-size: ${theme.typography.fontSize.caption};

  @media (max-width: 768px) {
    display: block;
    overflow: hidden;
    max-width: 100%;
    margin-top: 8px;
    font-size: 11px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`
export const Bar = styled.div`
  width: min(100%, 94px);

  height: ${({ $height, $empty }) => ($empty ? '4px' : `${$height}%`)};

  border-radius: ${({ $empty }) => ($empty ? '4px' : '12px')};

  background-color: ${({ $color }) => theme.colors.chart[$color]};
  @media (max-width: 768px) {
    max-width: none;
    width: 100%;
    border-radius: 8px;
  }
`
