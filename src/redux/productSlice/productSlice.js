
import { createSlice } from "@reduxjs/toolkit";


const initialState={
    products:[],
    cartItems:localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
    product:[],
    shippingInformation:localStorage.getItem('shpping') ? JSON.parse(localStorage.getItem('shpping')) : {},
    adminProducts:[],
    adminOrders:[],
    searchTerms:''
   

}

const productSlice=createSlice({
    name:'products',
    initialState,
    reducers:{
        addProduct:(state,action)=>{
            state.products=action.payload
        },
        addToCart:(state,action)=>{

            const item=action.payload
            
            let found= state.cartItems.find(function(itm,index){
                return itm.product===item.product
            })
            if(found){
                state.cartItems=state.cartItems.map(cartItem=>( 
                    found.product===cartItem.product ? item : cartItem
                ))
            }else{
                state.cartItems.push(item)
            }
            localStorage.setItem('cartItems',JSON.stringify(state.cartItems))

        },
        addProductDetails:(state,action)=>{
            state.product=action.payload
        },
        removeCartItem:(state,action)=>{
           
            const newCart= state.cartItems.filter((item)=> item.product !== action.payload)
            state.cartItems=newCart
            localStorage.setItem('cartItems',JSON.stringify(state.cartItems))

        },
        setShippingInfo:(state,action)=>{
            state.shippingInformation=action.payload
            localStorage.setItem('shpping',JSON.stringify(action.payload))

        },
        addAdminProducts:(state,action)=>{
            state.adminProducts=action.payload
        },
        deleteAdminProduct:(state,action)=>{
            const updatedProducts=state.adminProducts.filter(product=> product._id !== action.payload)
            state.adminProducts=updatedProducts
        },
        addAdminOrders:(state,action)=>{
            state.adminOrders=action.payload
        },
        deleteAdminOrders:(state,action)=>{
            const updatedOrders=state.adminOrders.filter(order=> order._id !== action.payload)
            state.adminOrders=updatedOrders       
         },
         clearCartItems:(state, action)=>{
            state.cartItems=[]
            localStorage.removeItem('cartItems')
         },

         setSearchTerms:(state,action)=>{
            state.searchTerms=action.payload
         }

    }

})



export  const {addProduct,addToCart,addProductDetails,removeCartItem,setShippingInfo,addAdminProducts,addAdminOrders,deleteAdminProduct,deleteAdminOrders,clearCartItems,setSearchTerms} = productSlice.actions
export default productSlice.reducer
