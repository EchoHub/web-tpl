import axios from 'axios';

export type ResponseType = {
    code: number | string,
    data: any,
    msg: string,
    success: boolean
}
export function getDistricts() {
    axios.defaults.timeout = 5000;
    axios.defaults.baseURL = 'https://logistics.shulidata.com';
    axios.defaults.headers.common.Accept = 'application/json';
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    return new Promise((resolve, reject) => {
        axios.get('/store/area/dict').then(resp => {
            if ((resp as any).code === 0) resolve(resp.data)
            else reject(resp);
        }).catch(reject)
    });
}