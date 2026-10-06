import styled from 'styled-components'
import theme from '../../theme'
import { Title } from '../../common'

export const CalendarCard = styled.div`
  background-color: ${theme.colors.surface};

  border-radius: ${theme.radii.card};
  height: inherit;
`
export const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${theme.spacing.xxl} ${theme.spacing.xxl} 0 ${theme.spacing.xxl};
`
export const CalendarHeaderTitle = styled(Title)`
  margin-bottom: ${theme.spacing.xl};
`

export const CalendarHeaderPeriods = styled.div`
  font-size: ${theme.typography.fontSize.caption};
  display: flex;
  justify-content: space-between;

  gap: ${theme.spacing.lg};
`

export const PeriodVariant = styled.span`
  font-weight: ${theme.typography.fontWeight.bold};
  height: fit-content;
  color: ${({ $active }) => ($active ? theme.colors.chart.green : theme.colors.text)};
  border-bottom: ${({ $active }) => ($active ? `1px solid ${theme.colors.chart.green}` : 'none')};
`

export const Weekdays = styled.div`
  padding: 0 ${theme.spacing.xxl};

  display: grid;
  grid-template-columns: repeat(7, 1fr);

  border-bottom: 1px solid ${theme.colors.text};
`

export const Weekday = styled.span`
  padding: ${theme.spacing.sm};
`
export const CalendarFooter = styled.div`
  padding: ${theme.spacing.xxl};
  overflow-y: auto;
  max-height: 390px;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xl};
`

export const MonthWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const MonthTitle = styled.span`
  font-size: ${theme.typography.fontSize.month};
  font-weight: ${theme.typography.fontWeight.semibold};

  margin-bottom: ${theme.spacing.md};
`

export const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 6px;
`
export const Day = styled.div`
  width: 40px;
  height: 40px;
  font-size: ${theme.typography.fontSize.body};
  padding: ${theme.spacing.md};
  display: flex;
  background-color: ${theme.colors.background};
  border-radius: ${theme.radii.card};
  color: ${theme.colors.text};

  &:hover {
    cursor: pointer;
    color: ${theme.colors.chart.greenText};
    background-color: ${theme.colors.chart.greenSurface};
  }
`
