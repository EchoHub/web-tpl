import { createHashHistory } from 'history';
import Login from '@/pages/login';
import Home from '@/pages/home';
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
export default R;