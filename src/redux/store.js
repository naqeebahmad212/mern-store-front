import {configureStore} from '@reduxjs/toolkit'
import userReducer from '../redux/userSlice/userSlice'
import productReducer from '../redux/productSlice/productSlice'


export const server=`https://ecommerce-mren-backend.vercel.app`

 export const store=configureStore({
    reducer:{
        user:userReducer,
        product:productReducer
    }
})
