import styled from 'styled-components'
import theme from '../../theme'
import { Title } from '../../common'

export const CalendarCard = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  background-color: ${theme.colors.surface};

  border-radius: ${theme.radii.card};
  height: inherit;
  box-shadow: ${theme.shadows.card};

  @media (max-width: 768px) {
    display: flex;
    flex: 1;
    flex-direction: column;
    height: 100%;
    border-radius: 0;
    background: transparent;
    box-shadow: none;
  }
`
export const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${theme.spacing.xxl} ${theme.spacing.xxl} 0 ${theme.spacing.xxl};
  flex-shrink: 0;

  @media (max-width: 768px) {
    align-items: center;
    flex-wrap: wrap;
    gap: 12px;
    justify-content: space-between;
    padding: 0 0 ${({ $periodMode }) => ($periodMode === 'year' ? '12px' : '0')};
    border-bottom: ${({ $periodMode }) =>
      $periodMode === 'year' ? '1px solid #D9D9D9' : 'none'};
  }
`
export const CalendarHeaderTitle = styled(Title)`
  margin: 0 0 ${theme.spacing.xl};

  @media (max-width: 768px) {
    display: ${({ $mobileTitle }) => ($mobileTitle ? 'block' : 'none')};
    width: 100%;
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
    padding-bottom: 8px;
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
  color: ${({ $active }) => ($active ? theme.colors.primary : theme.colors.text)};
  border-bottom: ${({ $active }) =>
    $active ? `1px solid ${theme.colors.primary}` : 'none'};
  cursor: pointer;
`

export const Weekdays = styled.div`
  flex-shrink: 0;
  padding: 0 ${theme.spacing.xxl};

  display: grid;
  grid-template-columns: repeat(7, 1fr);

  border-bottom: 1px solid #d9d9d9;

  @media (max-width: 768px) {
    padding: 0;
  }
`

export const Weekday = styled.span`
  text-align: center;
  color: ${theme.colors.textSecondary};
  font-size: 12px;
  padding: ${theme.spacing.sm};

  @media (max-width: 768px) {
    padding: 8px 0;
    text-align: center;
  }
`
export const CalendarFooter = styled.div`
  min-height: 0;
  flex: 1;
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
    padding: ${({ $periodMode }) => ($periodMode === 'year' ? '24px 0 0' : '20px 0 0')};
    overflow-y: auto;
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
  width: min(100%, 44px);
  aspect-ratio: 1;
  justify-self: center;
  height: auto;
  padding: 0;
  border: 0;
  font: inherit;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: ${theme.typography.fontSize.body};
  background-color: ${({ $selected }) =>
    $selected ? theme.colors.inputFocus : theme.colors.background};
  border-radius: 50%;
  color: ${({ $selected }) =>
    $selected ? theme.colors.primary : theme.colors.text};

  ${({ $rangeStart }) => $rangeStart && 'border-top-left-radius: 50%;'}
  ${({ $rangeEnd }) => $rangeEnd && 'border-bottom-right-radius: 50%;'}

  ${({ $first, $startColumn }) =>
    $first && `grid-column-start: ${$startColumn};`}

  &:hover {
    cursor: pointer;
    color: ${theme.colors.primary};
    background-color: ${theme.colors.inputFocus};
  }

  &:focus-visible {
    outline: 2px solid ${theme.colors.primary};
    outline-offset: 2px;
  }

  @media (max-width: 768px) {
    width: min(100%, 44px);
  }
`

export const CalendarControls = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 24px;
  button {
    padding: 8px;
    border: 0;
    background: transparent;
    cursor: pointer;
    font: inherit;
  }
`

export const ConfirmPeriod = styled.div`
  flex-shrink: 0;
  padding: 12px 24px;
  font-size: 12px;
  p {
    margin: 0 0 8px;
  }
  button {
    width: 100%;
    padding: 10px;
    border: 0;
    border-radius: 8px;
    background: ${theme.colors.primary};
    color: ${theme.colors.primaryText};
    font: inherit;
    cursor: pointer;
  }
  button:disabled {
    opacity: 0.5;
    cursor: default;
  }
  @media (max-width: 768px) {
    padding: 16px 0 max(24px, env(safe-area-inset-bottom));
    background: ${theme.colors.background};
    margin: 0 -16px;
    padding-left: 16px;
    padding-right: 16px;
    button {
      min-height: 40px;
      font-weight: 600;
    }
    p {
      font-size: 10px;
    }
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
    $selected ? theme.colors.inputFocus : theme.colors.background};

  color: ${({ $selected }) =>
    $selected ? theme.colors.primary : theme.colors.text};

  font-family: inherit;
  font-size: ${theme.typography.fontSize.caption};

  &:hover {
    cursor: pointer;
    color: ${theme.colors.primary};
    background-color: ${theme.colors.inputFocus};
  }
`
