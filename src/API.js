import { TRANSACTION_URL, REFRESH_URL, ACCOUNT_URL, ACCOUNT_CATEGORY_URL
        , MONTHLY_EXPENSE_DATA, REGISTER_URL, LOGIN_URL,
} from "./Config";

import { unregister } from "./interceptor.js";

const authFetch = fetch

const API = { 

    register: async (formData) => {
        const res = await fetch(REGISTER_URL, {
            method: 'POST',
            mode:'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData),
        })
        if (res.status === 201) {
            alert('User Registered')
        }
    },

    login : async (formData) => {
        const res = await fetch(LOGIN_URL, {
            method: 'POST',
            mode:'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        const result = await res.json()
        return result
    },

    fetchTransactions: async (month, all) => {
        const newURL = TRANSACTION_URL + `?month=${month}` + (all ? '&all=true': '')
        const config = {
            method: 'GET',
        };
        const response = await authFetch(newURL, config)
        return await response.json()
    },

    createTransactions: async (formData) => {
        const config = {
            method: 'POST',
            body: JSON.stringify(formData),
        }
        return await authFetch(TRANSACTION_URL, config)
    },
    
    deleteTransactions: async (transactionID) => {
        const config = {
            method : 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('access'), 
            },
            body: JSON.stringify({transactionID})
        }
        return await authFetch(TRANSACTION_URL, config);
    },

    updateTransactions: async(formData) => {
        const config = {
            method: 'PATCH',
            body:JSON.stringify(formData)
        }
        return await authFetch(TRANSACTION_URL, config)
    }
    ,

    fetchAccount: async (cash, getEach, getAll) => {
        const newURL = ACCOUNT_URL + (getAll? '?getAll=true' : (getEach ? '?getEach=true' : (cash ? '?cash=true': '')))

        const config = {
            method: 'GET',
        }

        const accountResponse = await authFetch(newURL, config)
        return await accountResponse.json()
    },

    createAccount: async (formData) => {
        const config = {
            method: 'POST',
            body: JSON.stringify(formData),
        };
        return await authFetch(ACCOUNT_URL, config)
    },

    deleteAccount: async (accountId) => {
        const config = {
            method : 'DELETE',
            body: JSON.stringify({accountId})
        }
        return await authFetch(ACCOUNT_URL, config);
    },

    updateAccount: async (formData) => {
        const config = {
            method: 'PUT',
            body:JSON.stringify(formData)
        }
        return await authFetch(ACCOUNT_URL, config);
    },

    fetchAccountCategories: async () => {
        const config = {
            method: 'GET',
        }
        const categoryResponse = await authFetch(ACCOUNT_CATEGORY_URL, config)
        return await categoryResponse.json()
    },

    getExpenseAccountsData: async (month) => {
        const newURL = MONTHLY_EXPENSE_DATA + `?month=${month}`;
        const config = {
            method: 'GET',
        }
        const expenseDataResponse = await authFetch(newURL, config)
        return await expenseDataResponse.json()
    }
}

export default API

