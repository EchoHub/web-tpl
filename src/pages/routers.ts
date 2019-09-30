import { createHashHistory } from 'history';
import Home from '@/pages/home';
export const history = createHashHistory();
const R = [
    {
        path: '/',
        component: Home
    }
]
export default R;