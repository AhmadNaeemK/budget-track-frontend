import fetchIntercept from 'fetch-intercept';

import { REFRESH_URL, LOGIN_URL, REGISTER_URL } from './Config';

import jwt_decode from 'jwt-decode';

export const unregister = fetchIntercept.register({
    request: function (url, config) {
        // Modify the url or config here
        if (localStorage.getItem('access') && ![LOGIN_URL, REGISTER_URL].includes(url) ) {
            config = {
                ...config, headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access')}`
                }
            }
        }
        return [url, config];
    },

    requestError: function (error) {
        // Called when an error occured during another 'request' interceptor call
        return Promise.reject(error);
    },

    response: (response) => {
        // Modify the reponse object
        if (localStorage.getItem('refresh') && response.status === 401 ) {
            let decoded = jwt_decode(localStorage.getItem('refresh'));
            if (Date.now() < decoded.exp * 1000) {
            localStorage.removeItem('access')
            fetch(REFRESH_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "refresh": localStorage.getItem('refresh')
                }),
                user: {
                    username: localStorage.getItem('username'),
                    userid: localStorage.getItem('userid')
                },
            }).then(res => res.json())
                .then(data => {
                    localStorage.setItem('access', data['access']);
                    window.location.reload();
                })
            } else {
                localStorage.removeItem('access')
                localStorage.removeItem('refresh')
                window.location.href = '/'
            }
        }
        return response;
    },

    responseError: function (error) {
        // Handle an fetch error
        console.log(error);
    }
});