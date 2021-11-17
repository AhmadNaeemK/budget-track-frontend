import { createSlice } from '@reduxjs/toolkit'

export const accountsSlice = createSlice({
  name: 'account',
  initialState: {
    accounts: []
  },
  reducers: {
    getAccounts: (state,action) => {
        state.accounts = action.payload
    },
    createAccount: (state, action) => {
        const accounts = [...state.accounts, action.payload] 
        state.accounts = accounts;
    },
    updateAccount: (state, action) => {
        const updatedAccount = action.payload;
        const index = state.accounts.findIndex((account)=>(
            account.id = updatedAccount.id
        ))
        state.accounts[index] = updatedAccount
    },
    deleteAccount: (state, action) => {
        state.accounts = state.accounts.filter((account) => (account.id !== action.payload.id))
    }
  }
})

// Action creators are generated for each case reducer function
export const { getAccounts, createAccount, updateAccount, deleteAccount } = accountsSlice.actions

export default accountsSlice.reducer
