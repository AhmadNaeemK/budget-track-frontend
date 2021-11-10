import { createSlice } from '@reduxjs/toolkit'

export const transactionCategoriesSlice = createSlice({
    name: 'transactionCategories',
    initialState: {
        categories: []
    },
    reducers: {
        getCategories: (state, action) => {
            state.categories = action.payload
        }
    }
})

export const {getCategories} = transactionCategoriesSlice.actions

export default transactionCategoriesSlice.reducer
