import axios from 'axios'

const API_URL = 'https://wedev-api.sky.pro/api/user'

export async function Login(userData) {
  try {
    const data = await axios.post(API_URL + '/login', userData, {
      headers: {
        'Content-Type': '',
      },
    })
    return data.data.user
  } catch (error) {
    throw new Error(error.response.data.error, { cause: error })
  }
}

export async function Register({ name, login, password }) {
  try {
    const data = await axios.post(
      API_URL,
      { login, name, password },
      {
        headers: {
          'Content-Type': '',
        },
      },
    )
    return data.data.user
  } catch (error) {
    console.log(error)
    throw new Error(error.response.data.error, { cause: error })
  }
}
