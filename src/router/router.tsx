import {createBrowserRouter} from 'react-router-dom'
import {getFieldList, getLabelInfo, printLabel} from '../api'
import App from '../App'
import {labelSchema} from '../core/schema'
import {Print} from '../views/Print'

export const routes = createBrowserRouter([
    {
        path: '/',
        loader: async ({request}) => {
            const url = new URL(request.url)
            const auth = url.searchParams.get('auth')
            if (auth) {
                const result = await getFieldList(auth)
                const {data: fieldList} = await result.json()

                const label = await getLabelInfo(auth)
                const {data: labelData} = await label.json()
                const labelFieldStr = labelData?.labelField as string
                const labelField = labelFieldStr ? JSON.parse(labelFieldStr) : labelSchema
                return {
                    labelField,
                    fieldList,
                }
            } else {
                return {
                    labelField: labelSchema,
                    fieldList: [],
                }
            }
        },
        element: <App/>,
    },
    {
        path: '/print',
        loader: async ({request}) => {
            const url = new URL(request.url)
            const auth = url.searchParams.get('auth')
            const ids = url.searchParams.get('ids')
            if (auth && ids) {
                const result = await printLabel(auth, ids)
                const {data} = await result.json()
                return {
                    data: data,
                }
            } else {
                return {
                    data: null,
                }
            }
        },
        element: <Print/>,
    },
])
