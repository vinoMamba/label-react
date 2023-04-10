import { createBrowserRouter } from 'react-router-dom'
import { toDataURL } from 'qrcode'
import { getFieldList, getLabelInfo, printLabel } from '../api'
import App from '../App'
import { labelSchema } from '../core/schema'
import { Print } from '../views/Print'
import type { Label, labelInfo } from '../types/type'

export const routes = createBrowserRouter([
  {
    path: '/',
    loader: async ({ request }) => {
      const url = new URL(request.url)
      const auth = url.searchParams.get('auth')
      if (auth) {
        const result = await getFieldList(auth)
        const { data: fieldList } = await result.json()

        const label = await getLabelInfo(auth)
        const { data: labelData } = await label.json()
        const labelFieldStr = labelData?.labelField as string
        const labelField = labelFieldStr ? JSON.parse(labelFieldStr) : labelSchema
        return {
          labelField,
          fieldList,
          auth,
        }
      }
      else {
        return {
          labelField: labelSchema,
          fieldList: [],
          auth: '',
        }
      }
    },
    element: <App />,
  },
  {
    path: '/print',
    loader: async ({ request }) => {
      const url = new URL(request.url)
      const auth = url.searchParams.get('auth')
      const ids = url.searchParams.get('ids')
      if (auth && ids) {
        const result = await printLabel(auth, ids)
        const { data } = await result.json()
        const logoUrl = data?.logoUrl as string
        const labelInfo = data.assetInfoList as labelInfo[]
        await Promise.all(labelInfo.map(async (item) => {
          item.qrCodeUrl = await toDataURL(item.qrCodeUrl || 'https://www.ahdingtalk.com/')
        }))
        const label = data?.assetLabel as Label
        return {
          logoUrl,
          labelInfo,
          label,
        }
      }
      else {
        return {
          logoUrl: '',
          labelInfo: [],
          label: {},
        }
      }
    },
    element: <Print />,
  },
])
