const API_URL = 'http://127.0.0.1:8000'
const LOGIN_URL = API_URL + '/user/token/'
const REFRESH_URL = LOGIN_URL + 'refresh/'
const LOGOUT_URL = API_URL + '/user/logout/'
const REGISTER_URL = API_URL + '/user/register/'
const TRANSACTION_URL = API_URL + '/transactionlist/'
const ACCOUNT_URL = API_URL + '/accountsList/'
const ACCOUNT_CATEGORY_URL = API_URL + '/accountsCategoryList/'
const MONTHLY_EXPENSE_DATA = API_URL + '/monthlyExpenses/'

export {
    API_URL,
    LOGIN_URL,
    REGISTER_URL,
    TRANSACTION_URL,
    REFRESH_URL,
    LOGOUT_URL,
    ACCOUNT_URL,
    ACCOUNT_CATEGORY_URL,
    MONTHLY_EXPENSE_DATA,
}