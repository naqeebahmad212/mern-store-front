import {configureStore} from '@reduxjs/toolkit'
import userReducer from '../redux/userSlice/userSlice'
import productReducer from '../redux/productSlice/productSlice'


<<<<<<< HEAD
export const server=`http://localhost:4000`
=======
export const server=`https://ecommerce-mren-backend.vercel.app`
>>>>>>> 26bc6b2a0dfc81c6bcf2a0184b0a256d26a9fdef

 export const store=configureStore({
    reducer:{
        user:userReducer,
        product:productReducer
    }
})
