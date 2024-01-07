import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoutes = ({isAuthenticated,adminRoute, isAdmin}) => {
    if(!isAuthenticated){
        return <Navigate to={'/'}/>
      }
      else if(adminRoute && !isAdmin){
      return <Navigate to={'/'}/>
    }
  return (
    <Outlet/>
  )
}

export default ProtectedRoutes