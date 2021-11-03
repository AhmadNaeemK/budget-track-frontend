import {
    REGISTER_URL, LOGIN_URL, USER_LIST_URL, EXPENSE_URL, EXPENSE_LIST_URL, INCOME_URL,
    INCOME_LIST_URL, TRANSACTION_CATEGORY_URL, CASH_ACCOUNT_URL, CASH_ACCOUNT_LIST_URL, CATEGORY_EXPENSE_URL,
    SCHEDULED_TRANSACTION_LIST_URL, SCHEDULED_TRANSACTION_URL, SENT_FRIEND_REQUEST_LIST_URL,
    RECEIVED_FRIEND_REQUEST_LIST_URL, FRIEND_REQUEST_URL, FRIEND_REQUEST_ACCEPT_URL, FRIEND_LIST_URL, UNFFRIEND_URL,
    SPLIT_TRANSACTION_LIST_URL, SPLIT_TRANSACTION_URL, PAY_SPLIT_URL, MONTHLY_TRANSACTION_CHART_DATA, SPLIT_PAYMENT_DATA_URL, MAX_SPLIT_DUE,
    USER_DISPLAY_PICTURE_URL, API_URL, USER_VERIFICATION_URL, REGEN_VERIFICATION_MAIL_URL, UPDATE_PASSWORD_URL, PASSWORD_RECOVERY_URL
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
        return res;
    },

    fetchUser: async (userId) => {
        const userResult = await fetch(API_URL + `/user/${userId}`) 
        return await userResult.json()
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

    fetchExpenseList: async (month, url) => {
        const newURL = EXPENSE_LIST_URL + `?month=${month}`
        const config = {
            method: 'GET',
        };
        const response = await fetch(url || newURL, config)
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

    fetchIncomeList: async (month, url) => {
        const newURL = INCOME_LIST_URL + `?month=${month}`
        const config = {
            method: 'GET',
        };
        const response = await fetch(url || newURL, config)
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

    fetchCashAccountList: async (url) => {

        const config = {
            method: 'GET',
        }

        const accountResponse = await fetch(url || CASH_ACCOUNT_LIST_URL, config)
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

    fetchCategoryExpenseData: async (month) => {
        const config = {
            method: 'GET'
        }
        const newURL = CATEGORY_EXPENSE_URL + `?month=${month}`;
        const expenseData = await fetch(newURL, config);
        return await expenseData.json();
    },

    createScheduledTransaction: async (formData) => {
        formData = {...formData, scheduled:true}
        const config = {
            method: 'POST',
            body: JSON.stringify(formData),
        }
        return await fetch(SCHEDULED_TRANSACTION_LIST_URL, config)
    },

    fetchScheduledTransactionList: async(url) => {
        const config = {
            method: "GET"
        }
        const res = await fetch(url || SCHEDULED_TRANSACTION_LIST_URL, config)
        return await res.json()
    },

    deleteScheduledTransaction: async(transactionId) => {
        const config = {
            method: "DELETE"
        }
        const newURL = SCHEDULED_TRANSACTION_URL + String(transactionId);
        return await fetch(newURL, config)
    },

    fetchSentFriendRequestList: async(url) => {
        const config ={
            method: 'GET'
        }
        const friendRequests = await fetch(url || SENT_FRIEND_REQUEST_LIST_URL, config)
        return await friendRequests.json();
    },

    fetchReceivedFriendRequestList: async(url) => {
        const config ={
            method: 'GET'
        }
        const friendRequests = await fetch(url || RECEIVED_FRIEND_REQUEST_LIST_URL, config)
        return await friendRequests.json();
    },

    createFriendRequest: async(formData) => {
        const config = {
            method: 'POST',
            body: JSON.stringify(formData)
        }
        return await fetch(SENT_FRIEND_REQUEST_LIST_URL, config);
    },

    deleteFriendRequest: async(requestID) => {
        const config = {
            method: 'DELETE'
        }
        const newURL = FRIEND_REQUEST_URL + String(requestID)
        return await fetch(newURL, config)
    },

    acceptFriendRequest: async(requestID) => {
        const config ={
            method: 'GET'
        }
        const newURL = FRIEND_REQUEST_ACCEPT_URL + String(requestID)
        return await fetch(newURL, config)
    },

    fetchUserList: async (url) => {
        const config = {
            method: 'GET'
        }
        const userList = await fetch(url || USER_LIST_URL, config);
        return await userList.json()
    },

    fetchFriendsList: async (url) => {
        const config = {
            method: 'GET'
        }
        const friendsList = await fetch(url || FRIEND_LIST_URL, config);
        return await friendsList.json();
    },

    removeFriend: async (friendId) => {
        const config = {
            method: 'GET'
        }
        const removed = await fetch(UNFFRIEND_URL + String(friendId), config)
        return removed
    },

    fetchSplitTransactionList: async (url) => {
        const config = {
            method: 'GET'
        }
        const newURL = SPLIT_TRANSACTION_LIST_URL 
        const splitTransactions = await fetch(url || newURL, config)
        return await splitTransactions.json()
    },

    fetchSplitTransaction: async (splitId) => {
        const config ={
            method: "GET"
        }
        const res = await fetch(SPLIT_TRANSACTION_URL + String(splitId), config)
        return await res.json()
    },

    createSplitTransaction: async (formData) => {
        const config = {
            method: 'POST',
            body: JSON.stringify(formData)
        }
        return await fetch(SPLIT_TRANSACTION_LIST_URL, config)
    },

    deleteSplitTransaction: async (splitId) => {
        const config ={
            method: "DELETE"
        }
        return await fetch(SPLIT_TRANSACTION_URL + String(splitId), config)
    },


    paySplit: async (formData) => {
        const config = {
            method: 'POST',
            body: JSON.stringify(formData)
        }
        return await fetch(PAY_SPLIT_URL, config)
    },

    fetchSplitPaymentData: async (splitId) => {
        const res = await fetch(SPLIT_PAYMENT_DATA_URL + `/${splitId}`)
        return await res.json()
    },

    fetchMaxSplitsDue: async () => {
        const res = await fetch(MAX_SPLIT_DUE)
        return await res.json()
    },

    fetchMonthlyTransactionChartData: async () => {
        const config ={
            method: 'GET'
        }
        const data =  await fetch(MONTHLY_TRANSACTION_CHART_DATA, config)
        return await data.json()
    },

    fetchUserDisplayPicture: async (imageUrl) => {
        const config ={
            method: 'GET'
        }
        const displayPicture = await fetch(imageUrl, config)
        return displayPicture.json();
    },

    updateUserDisplayPicture: async(formData) => {
        const config={
            method: 'PATCH',
            body: formData,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access')}`,
            }
        }
        return await fetch(USER_DISPLAY_PICTURE_URL, config)
    },

    verifyUserEmail: async(token) => {
        return await fetch(USER_VERIFICATION_URL + `?token=${token}`)
    },

    regenVerificationLink: async(email) => {
        return await fetch(REGEN_VERIFICATION_MAIL_URL+ `?email=${email}`)
    },

    updatePassword: async(formData) => {
        const config={
            method: 'POST',
            body: JSON.stringify(formData)
        }
        return await fetch(UPDATE_PASSWORD_URL, config)
    },

    generatePasswordRecoveryLink: async(email) => {
        return await fetch(PASSWORD_RECOVERY_URL+ `?email=${email}`)
    },

}

export default API

