const API_URL = 'http://127.0.0.1:8000'
const LOGIN_URL = API_URL + '/user/token/'
const REFRESH_URL = LOGIN_URL + 'refresh/'
const LOGOUT_URL = API_URL + '/user/logout/'
const REGISTER_URL = API_URL + '/user/register/'
const TRANSACTION_URL = API_URL + '/transactionlist/'
const ACCOUNT_URL = API_URL + '/accountsList'

export {
    API_URL,
    LOGIN_URL,
    REGISTER_URL,
    TRANSACTION_URL,
    REFRESH_URL,
    LOGOUT_URL,
    ACCOUNT_URL
}