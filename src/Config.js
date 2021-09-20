const API_URL = 'http://127.0.0.1:8000'
const LOGIN_URL = API_URL + '/user/token/'
const REFRESH_URL = LOGIN_URL + 'refresh/'
const LOGOUT_URL = API_URL + '/user/logout/'
const REGISTER_URL = API_URL + '/user/register/'
const EXPENSE_URL = API_URL + '/expense/'
const EXPENSE_LIST_URL = API_URL + '/expenselist/'
const INCOME_URL = API_URL + '/income/'
const INCOME_LIST_URL = API_URL + '/incomelist/'
const CASH_ACCOUNT_LIST_URL = API_URL + '/cashAccountList/'
const CASH_ACCOUNT_URL = API_URL + '/cashAccount/'
const TRANSACTION_CATEGORY_URL = API_URL + '/transactionCategoryList'
const USER_LIST_URL = API_URL + '/users/list/'


const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];


export {
    API_URL,
    LOGIN_URL,
    REGISTER_URL,
    REFRESH_URL,
    LOGOUT_URL,
    EXPENSE_URL,
    EXPENSE_LIST_URL,
    INCOME_URL,
    INCOME_LIST_URL,
    CASH_ACCOUNT_LIST_URL,
    CASH_ACCOUNT_URL,
    TRANSACTION_CATEGORY_URL,
    USER_LIST_URL,
    monthNames,
}