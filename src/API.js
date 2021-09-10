import { TRANSACTION_URL, REFRESH_URL, ACCOUNT_URL, ACCOUNT_CATEGORY_URL
        , MONTHLY_EXPENSE_DATA        
} from "./Config";

const authFetch = async (url, config, retry=0) => {

    const defaultConfig = {
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access')}`
        },
        user: {username: localStorage.getItem('username'),
                userid: localStorage.getItem('userid')},
    }

    const newConfig = {...config, ...defaultConfig}

    try {
        const response = await fetch(url, newConfig)
        if (response.status === 401){
            throw 'Token Expired';
        }
        return response;
    }
    catch (e) {
        if (e === 'Token Expired' && retry<= 1){
            try {
                const refreshResponse = await fetch(REFRESH_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "refresh": localStorage.getItem('refresh')
                    }),
                    user: {username: localStorage.getItem('username'),
                        userid: localStorage.getItem('userid')},
                });

                if (refreshResponse.status === 401) {
                    throw "Refresh Token Expired";
                }

                const accessTokenData = await refreshResponse.json();
                localStorage.setItem('access', accessTokenData['access']);

                const s = await authFetch (url, config, retry+1);
                return s

            } catch (e) {
                console.log(e);
            }
        }
        console.log(e)
    }
};


const API = { 

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
        console.log(formData)
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

