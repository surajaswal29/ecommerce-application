import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/userReducer'
import utilityReducer from './reducers/utilityReducer'

const store = configureStore({
    reducer: {
        utility: utilityReducer,
        user: userReducer
    }
})

export default store