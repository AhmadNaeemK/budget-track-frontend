import { TRANSACTION_URL, REFRESH_URL, ACCOUNT_URL } from "./Config";


const API = { 
    fetchTransactions: async (all) => {
        const newURL = TRANSACTION_URL + (all ? 'all=true': '')
        const transactionResponse = await fetch(newURL, {
            method: 'GET',
            mode: 'cors',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('access'), 
            },
            user: {username: localStorage.getItem('username'),
                userid: localStorage.getItem('userid')},
        });
        return await transactionResponse.json()
    },

    createTransactions: async (formData) => {
        const res = await fetch(TRANSACTION_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('access'), 
            },
            body: JSON.stringify(formData),
            user: {username: localStorage.getItem('username'),
                userid: localStorage.getItem('userid')},
        })
        return res
    },
    
    deleteTransactions: async (transactionID) => {
        const res = await fetch(TRANSACTION_URL,{
            method : 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('access'), 
            },
            body: JSON.stringify({transactionID})
        })
        return res;
    },

    updateTransactions: async(formData) => {
        const res = await fetch(TRANSACTION_URL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('access'), 
            },
            body:JSON.stringify(formData)
        })
        return res
    }
    ,
    fetchToken: () => {
        fetch(REFRESH_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "refresh": localStorage.getItem('refresh')
            }),
            user: {username: localStorage.getItem('username'),
                userid: localStorage.getItem('userid')},
        }).then(res => {
            return res.json()})
        .then(result => {
            if (result.refresh) localStorage.setItem('refresh', result.refresh)
        });
    },
    fetchAccount: async (cash, getAll) => {
        const newURL = ACCOUNT_URL + (getAll ? '/?getAll=true' : (cash ? '/?cash=true': ''))

        const accountResponse = await fetch(newURL, {
            method: 'GET',
            mode: 'cors',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('access'), 
            },
            user: {username: localStorage.getItem('username'),
                userid: localStorage.getItem('userid')},
        });
        return await accountResponse.json()
    }
}

export default API

