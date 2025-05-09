import React, { useState, useContext } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../helpers/AuthContext'

import { FaSpinner } from 'react-icons/fa'
import { toast } from 'react-toastify'

const ChangePassword = () => {
    const [newPassword, setNewPassword] = useState('')
    const [oldPassword, setOldPassword] = useState('')
    const { setAuthState } = useContext(AuthContext)
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const BASE_URL = process.env.REACT_APP_API_URL

    const changePassword = async () => {
    if (!oldPassword || !newPassword) {
        toast.warn("Both fields are required")
        return
    }

    const data = { oldPassword, newPassword }
    const headerValues = {
        headers: {
            accessToken: localStorage.getItem('accessToken')
        }
    }

    setLoading(true)

    try {
        const response = await axios.put(`${BASE_URL}/auth/changepassword`, data, headerValues)
        const resData = response.data

        toast.success(resData.message)
        localStorage.removeItem('accessToken')
        setAuthState({ username: "", id: "", status: false })
        navigate('/login')
    } catch (err) {
        const errorMsg = err.response?.data?.error || 'Server error'
        toast.error(errorMsg)
    } finally {
        setLoading(false)
    }
}


    return (
        <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Change Password</h1>
            
            <div className="space-y-4">
                <input
                    type="password"
                    placeholder="Old Password..."
                    onChange={e => setOldPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="password"
                    placeholder="New Password..."
                    onChange={e => setNewPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type='submit'
                    onClick={changePassword}
                    className="relative w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition h-12"
                    disabled={loading}
                >
                    {loading ? (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <FaSpinner className="animate-spin text-white text-lg" />
                        </div>
                    ) : (
                        "Change password"
                    )}
                </button>
            </div>
        </div>
    )    
}

export default ChangePassword
