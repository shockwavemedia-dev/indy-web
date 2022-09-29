import axios, { AxiosError } from 'axios'

export const isAxiosError = <T extends unknown>(error: unknown): error is AxiosError<T> =>
  axios.isAxiosError(error)

export const get422ResponseError = (error: unknown) => {
  if (
    isAxiosError<Record<string, Array<string>>>(error) &&
    error.response &&
    error.response.status === 422
  ) {
    const errors = Object.values(error.response.data)
      .map((errors) => errors.join('\n'))
      .join('\n')

    if (errors) return errors
  }

  return 'Something went wrong!'
}

export const get400ResponseError = (error: unknown) => {
  if (
    isAxiosError<Record<string, Array<string>>>(error) &&
    error.response &&
    (error.response.status === 400 || error.response.status === 404)
  ) {
    return String(error.response.data.message)
  }

  return 'Something went wrong!'
}
