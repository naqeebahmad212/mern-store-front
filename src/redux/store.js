import {configureStore} from '@reduxjs/toolkit'
import userReducer from '../redux/userSlice/userSlice'
import productReducer from '../redux/productSlice/productSlice'


export const server=`http://localhost:4000`

 export const store=configureStore({
    reducer:{
        user:userReducer,
        product:productReducer
    }
})