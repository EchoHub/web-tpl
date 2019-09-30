import axios from 'axios';
import { stringify } from 'query-string';
import CONSTANT, { getToken } from './constant';
import { Tip } from '@/components/Toast';
// @ts-ignore
const { domain } = CONSTANT;
type AxiosType = {
    params?: {
        [key: string]: any
    }
    headers?: HeadersType
};
type HeadersType = {
    [key: string]: any
};
export type ResponseType = {
    code: number | string,
    data: any,
    msg: string,
    success: boolean
}


function normalizeContentyType(headers: HeadersType) {
    const contentType = (headers && headers['Content-Type']);
    return contentType || 'application/x-www-form-urlencoded';
}
axios.interceptors.response.use(
    response => {
        const { code, msg } = response.data;
        if (code !== 0) {
            Tip(msg);
        }
        return response.data;
    },
    error => {
        // Tip(error);
        return Promise.reject(error)
    }
)
function setCommonAxiosCinfig() {
    axios.defaults.timeout = 5000;
    axios.defaults.baseURL = domain;
    axios.defaults.headers.common.Accept = 'application/json';
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    axios.defaults.headers.common["token"] = getToken();
    // axios.defaults.headers.common["token"] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwbGF0Zm9ybUlkIjoiQUxJUEFZIiwic291cmNlIjoicG9pbnRwdW5jaCIsInRpbWVzdGFtcCI6MTU2OTU3MzY1OTQ0MCwidXNlckluZm8iOnsicGxhdGZvcm1JZCI6IkFMSVBBWSIsInVpZCI6IjIwODg3MDIwMzAyMzIxMzUiLCJ1c2VySWQiOjMyNDUwMDA1MzAzOTgwNDUwMX19.XUbfbaPCPVHQfpBEyUEZ0nYUKvdU-jrZxPDhWIj8BiI=';
}
export function get(url: string, config?: AxiosType) {
    setCommonAxiosCinfig()
    return new Promise((resolve, reject) => {
        axios.get(url, config).then(resp => {
            if ((resp as any).code === 0) resolve(resp)
            else reject(resp);
        }).catch(reject)
    });
}

export function post(url: string, config?: AxiosType) {
    setCommonAxiosCinfig()
    let contentType = config && config.headers ? normalizeContentyType(config.headers) : null;
    let params = config.params
    switch (contentType) {
        case 'application/json':
            // @ts-ignore
            params = JSON.stringify(params);
            break;
        case 'application/x-www-form-urlencoded':
            // @ts-ignore
            params = stringify(params);
            break;
        default:
            break;
    }

    return new Promise((resolve, reject) => {
        axios.post(url, params, config).then(resp => {
            if ((resp as any).code === 0) resolve(resp)
            else reject(resp);
        }).catch(reject)
    });
}