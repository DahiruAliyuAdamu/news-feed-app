import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from '../helpers/AuthContext'

// const ProtectedRoute = ({ children }) => {
const ProtectedRoute = () => {
    const { authState, loading } = useContext(AuthContext)

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center mt-0">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
    )
    
    // return authState.status ? children : <Navigate to='/login' replace />
    return authState.status ? <Outlet /> : <Navigate to='/login' replace />
}

export default ProtectedRoute