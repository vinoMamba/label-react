export const createHeaders = (auth: string | undefined) => {
  const headers = new Headers()
  headers.append('Content-Type', 'application/json')
  headers.append('Authorization', `Bearer ${auth}`)
  return headers
}
