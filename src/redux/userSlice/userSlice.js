import { createSlice } from "@reduxjs/toolkit";


const initialState={
    isLoading:false,
    user:localStorage.getItem('user') ?  JSON.parse(localStorage.getItem('user')) : null,
    isAuthenticated: true,
    adminUsers:[],
}

const userSlice=createSlice({
    name:'User',
    initialState,
    reducers:{
        setLoading:(state,action)=>{ 
            state.isLoading=action.payload
        },
        setUserInfo:(state,action)=>{
            state.user=action.payload
            localStorage.setItem('user',JSON.stringify(action.payload))
        },
        removeUserInfo:(state,action)=>{
            state.user=null
            localStorage.removeItem('user')
        },
        authReducer:(state,action)=>{
            state.isAuthenticated=action.payload
        },
        addAdminUser:(state,action)=>{
            state.adminUsers=action.payload
         },
         deleteAdminUsers:(state,action)=>{
            const updatedUsers=state.adminUsers.filter(user=> user._id !== action.payload)
            state.adminUsers=updatedUsers      
         }
    }
})


 export  const {setLoading,setUserInfo,removeUserInfo,authReducer, addAdminUser,deleteAdminUsers} =userSlice.actions
 export default userSlice.reducer