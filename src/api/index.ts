import type { Schema } from '../types/type'

const createHeaders = (auth: string | undefined) => {
  const headers = new Headers()
  headers.append('Content-Type', 'application/json')
  headers.append('Authorization', `Bearer ${auth}`)
  return headers
}
export const getFieldList = (auth: string) => fetch('/api/upms/sys_field/label_field_list', {
  method: 'GET',
  headers: createHeaders(auth),
})

export const getLabelInfo = (auth: string) => fetch('/api/asset/label/label_info/?selectedLabel=4', {
  method: 'GET',
  headers: createHeaders(auth),
})

export const updateLabelInfo = (auth: string, schema: Schema) => {
  const data = {
    labelType: '4',
    labelField: JSON.stringify(schema),
    fontSize: '14',
    labelWidth: '100',
    labelHeight: '100',
    showField: '0',
  }
  return fetch(`/api/asset/label`, {
    method: 'POST',
    headers: createHeaders(auth),
    body: JSON.stringify(data),
  })
}

export const printLabel = (auth: string, ids: string) => fetch(`/api/asset/label/export/?downloadLogoIds=${ids}&downloadType=1`, {
  method: 'GET',
  headers: createHeaders(auth),
})
