import {OpenAPI} from '@app/client';

export function setAuthorizationHeaderInterceptors() {
    OpenAPI.interceptors.request.use((req) => {
        const token = localStorage.getItem('token');
        if (token) {
            req.headers = new Headers({
                Authorization: `Bearer ${token}`,
            });
        }

        return req;
    });

    OpenAPI.interceptors.response.use(async (response) => {
        const res = await response.json();

        if (response.status === 401 && window.location.pathname !== '/') {
            localStorage.removeItem('token');
            window.location.href = '/';
            throw new Error(`${response.status} - ${res.data}`);
        }

        return res;
    });
}
