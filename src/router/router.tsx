import {createBrowserRouter} from 'react-router-dom'
import App from '../App'
import {Print} from "../views/Print";

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
    },
    {
        path: '/print',
        element: <Print/>
    }
])
