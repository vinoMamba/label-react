import ReactDOM from 'react-dom/client'
import './index.css'
import 'virtual:uno.css'
import {RouterProvider} from 'react-router-dom'
import {routes} from './router/router'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <RouterProvider router={routes}/>,
)
