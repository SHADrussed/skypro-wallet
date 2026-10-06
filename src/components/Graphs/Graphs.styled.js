import styled from 'styled-components'
import theme from '../../theme'
import { Title } from '../../common'

export const GraphsStyled = styled.div`
  background-color: ${theme.colors.surface};

  border-radius: ${theme.radii.card};
  height: inherit;

  padding: ${theme.spacing.xxl} ${theme.spacing.xxl} 0 ${theme.spacing.xxl};
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
export const Chart = styled.div``
export const CategoryList = styled.div``
