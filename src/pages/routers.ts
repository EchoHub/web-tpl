import { createHashHistory } from 'history';
import Login from '@/pages/login';
import Home from '@/pages/home';
import Dashboard from '@/pages/home/dashboard';
import TablePage from '@/pages/home/hapiUI/table';
export const history = createHashHistory();
const R = [
    {
        path: '/',
        component: Login
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/home',
        component: Home
    }
]
export const HomeRouters = [
    {
        path: '/home/dashboard',
        component: Dashboard
    },
    // {
    //     path: '/home/open/hapi_ui',
    //     component: HapiUI
    // },
    {
        path: '/home/open/hapi_ui/table',
        component: TablePage
    }
]
export default R;