import styled from 'styled-components'
import theme from '../theme'

const ErrorNotFound = styled.div`
  font-size: 36px;
  text-align: center;
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${theme.colors.background};
`

const NotFoundPage = () => {
  return (
    <ErrorNotFound>
      <p>
        ОШИБКА 404<br></br>СТРАНИЦА НЕ НАЙДЕНА
      </p>
    </ErrorNotFound>
  )
}

export default NotFoundPage
