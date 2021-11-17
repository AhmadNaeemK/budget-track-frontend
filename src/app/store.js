import { configureStore, applyMiddleware } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'

import userReducer from '../features/userSlice'
import accountReducer from '../features/accountsSlice'
import transactionCategoriesReducer from '../features/categoriesSlice'



export default configureStore({
    reducer: {
        user: userReducer,
        account: accountReducer,
        transactionCategories: transactionCategoriesReducer,
    },
}, applyMiddleware(thunk));