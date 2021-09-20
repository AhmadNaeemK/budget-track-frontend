import {
    REGISTER_URL, LOGIN_URL, USER_LIST_URL, EXPENSE_URL, EXPENSE_LIST_URL, INCOME_URL, INCOME_LIST_URL, TRANSACTION_CATEGORY_URL, CASH_ACCOUNT_URL,CASH_ACCOUNT_LIST_URL
} from "./Config";

import { unregister } from "./interceptor.js";

const API = {

    register: async (formData) => {
        const res = await fetch(REGISTER_URL, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData),
        })
        if (res.status === 201) {
            alert('User Registered')
        }
    },

    login: async (formData) => {
        const res = await fetch(LOGIN_URL, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        const result = await res.json()
        return result
    },

    fetchExpenseList: async (month) => {
        const newURL = EXPENSE_LIST_URL + `?month=${month}`
        const config = {
            method: 'GET',
        };
        const response = await fetch(newURL, config)
        return await response.json()
    },

    createExpense: async (formData) => {
        const config = {
            method: 'POST',
            body: JSON.stringify(formData),
        }
        return await fetch(EXPENSE_LIST_URL, config)
    },

    deleteExpense: async (expenseId) => {
        const config = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('access'),
            },
        }
        const newURL = EXPENSE_URL + String(expenseId)
        return await fetch(newURL, config);
    },

    updateExpense: async (expenseId, formData) => {
        const config = {
            method: 'PATCH',
            body: JSON.stringify(formData)
        }
        const newURL = EXPENSE_URL + String(expenseId)
        return await fetch(newURL, config);
    },

    fetchIncomeList: async (month) => {
        const newURL = INCOME_LIST_URL + `?month=${month}`
        const config = {
            method: 'GET',
        };
        const response = await fetch(newURL, config)
        return await response.json()
    },

    createIncome: async (formData) => {
        const config = {
            method: 'POST',
            body: JSON.stringify(formData),
        }
        return await fetch(INCOME_LIST_URL, config)
    },

    deleteIncome: async (incomeId) => {
        const config = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('access'),
            },
        }
        const newURL = INCOME_URL + String(incomeId)
        return await fetch(newURL, config);
    },

    updateIncome: async (incomeId, formData) => {
        const config = {
            method: 'PATCH',
            body: JSON.stringify(formData)
        }
        const newURL = INCOME_URL + String(incomeId)
        return await fetch(newURL, config);
    },

    fetchCashAccountList: async () => {

        const config = {
            method: 'GET',
        }

        const accountResponse = await fetch(CASH_ACCOUNT_LIST_URL, config)
        return await accountResponse.json()
    },

    createCashAccount: async (formData) => {
        const config = {
            method: 'POST',
            body: JSON.stringify(formData),
        };
        return await fetch(CASH_ACCOUNT_LIST_URL, config)
    },

    deleteCashAccount: async (accountId) => {
        const config = {
            method: 'DELETE',
        }
        const newURL = CASH_ACCOUNT_URL + String(accountId)
        return await fetch(newURL, config);
    },

    updateCashAccount: async (accountId, formData) => {
        const config = {
            method: 'PATCH',
            body: JSON.stringify(formData)
        }
        const newURL = CASH_ACCOUNT_URL + String(accountId)
        return await fetch(newURL, config);
    },

    fetchTransactionCategories: async () => {
        const config = {
            method: 'GET',
        }
        const categoryResponse = await fetch(TRANSACTION_CATEGORY_URL, config)
        return await categoryResponse.json()
    },

    getUserList: async () => {
        const config= {
            method:'GET'
        }
        return await fetch(USER_LIST_URL, config);
    }

}

export default API

