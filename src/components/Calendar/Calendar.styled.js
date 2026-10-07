import styled from 'styled-components'
import theme from '../../theme'
import { Title } from '../../common'

export const CalendarCard = styled.div`
  background-color: ${theme.colors.surface};

  border-radius: ${theme.radii.card};
  height: inherit;

  @media (max-width: 768px) {
    display: flex;
    flex: 1;
    flex-direction: column;
    height: auto;
    border-radius: 0;
    background: transparent;
  }
`
export const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${theme.spacing.xxl} ${theme.spacing.xxl} 0 ${theme.spacing.xxl};

  @media (max-width: 768px) {
    align-items: center;
    justify-content: space-between;
    padding: 0;
  }
`
export const CalendarHeaderTitle = styled(Title)`
  margin-bottom: ${theme.spacing.xl};

  @media (max-width: 768px) {
    display: ${({ $mobileTitle }) => ($mobileTitle ? 'block' : 'none')};
    margin-bottom: 0;
    font-size: 24px;
  }
`

export const CalendarHeaderPeriods = styled.div`
  font-size: ${theme.typography.fontSize.caption};
  display: flex;
  justify-content: space-between;

  gap: ${theme.spacing.lg};

  @media (max-width: 768px) {
    gap: 24px;
  }
`

export const PeriodVariant = styled.button`
  font-weight: ${theme.typography.fontWeight.bold};
  height: fit-content;
  padding: 0;
  border: 0;
  background: transparent;
  font-family: inherit;
  font-size: inherit;
  color: ${({ $active }) => ($active ? theme.colors.chart.green : theme.colors.text)};
  border-bottom: ${({ $active }) => ($active ? `1px solid ${theme.colors.chart.green}` : 'none')};
  cursor: pointer;
`

export const Weekdays = styled.div`
  padding: 0 ${theme.spacing.xxl};

  display: grid;
  grid-template-columns: repeat(7, 1fr);

  border-bottom: 1px solid ${theme.colors.text};

  @media (max-width: 768px) {
    padding: 0;
  }
`

export const Weekday = styled.span`
  padding: ${theme.spacing.sm};

  @media (max-width: 768px) {
    padding: 8px 0;
    text-align: center;
  }
`
export const CalendarFooter = styled.div`
  padding: ${theme.spacing.xxl};
  overflow-y: auto;
  max-height: 420px;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xl};

  scrollbar-width: thin;
  scrollbar-color: #c9c9c9 transparent;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #c9c9c9;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-corner {
    display: none;
  }

  @media (max-width: 768px) {
    max-height: none;
    flex: 1;
    padding: 16px 0 0;
    overflow: visible;
  }
`

export const MonthWrapper = styled.div`
  width: 100%;
`

export const MonthTitle = styled.span`
  font-size: ${theme.typography.fontSize.month};
  font-weight: ${theme.typography.fontWeight.semibold};
`

export const DaysGrid = styled.div`
  margin-top: ${theme.spacing.md};
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: ${theme.spacing.xs};

  @media (max-width: 768px) {
    grid-template-columns: repeat(7, minmax(0, 1fr));
    gap: 4px;
  }
`
export const Day = styled.button`
  width: 40px;
  height: 40px;
  padding: 0;
  border: 0;
  font: inherit;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: ${theme.typography.fontSize.body};
  background-color: ${({ $selected }) =>
    $selected ? theme.colors.chart.greenSurface : theme.colors.background};
  border-radius: 50%;
  color: ${({ $selected }) =>
    $selected ? theme.colors.chart.greenText : theme.colors.text};

  ${({ $rangeStart }) => $rangeStart && 'border-top-left-radius: 50%;'}
  ${({ $rangeEnd }) => $rangeEnd && 'border-bottom-right-radius: 50%;'}

  ${({ $first, $startColumn }) =>
    $first && `grid-column-start: ${$startColumn};`}

  &:hover {
    cursor: pointer;
    color: ${theme.colors.chart.greenText};
    background-color: ${theme.colors.chart.greenSurface};
  }

  &:focus-visible {
    outline: 2px solid ${theme.colors.chart.greenText};
    outline-offset: 2px;
  }

  @media (max-width: 768px) {
    width: 100%;
    height: min(44px, calc((100vw - 56px) / 7));
  }
`

export const YearBlock = styled.div`
  display: flex;
  flex-direction: column;
`
export const YearTitle = styled(MonthTitle)`
  margin-bottom: ${theme.spacing.md};
`

export const MonthsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`

export const MonthButton = styled.button`
  height: 34px;

  border: none;
  border-radius: 20px;
  background: ${({ $selected }) =>
    $selected ? theme.colors.chart.greenSurface : theme.colors.background};

  color: ${({ $selected }) =>
    $selected ? theme.colors.chart.greenText : theme.colors.text};

  font-family: inherit;
  font-size: ${theme.typography.fontSize.caption};

  &:hover {
    cursor: pointer;
    color: ${theme.colors.chart.greenText};
    background-color: ${theme.colors.chart.greenSurface};
  }
`
