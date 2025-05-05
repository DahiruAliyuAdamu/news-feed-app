import React, { useState, useContext } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../helpers/AuthContext'

const ChangePassword = () => {
    const [newPassword, setNewPassword] = useState('')
    const [oldPassword, setOldPassword] = useState('')
    const { setAuthState } = useContext(AuthContext)

    const navigate = useNavigate()

    const BASE_URL = process.env.REACT_APP_API_URL

    const changePassword = () => {
        axios.put(`${BASE_URL}/auth/changepassword`, {
            oldPassword: oldPassword,
            newPassword: newPassword
        }, {
            headers: {
                accessToken: localStorage.getItem('accessToken')
            }
        }).then(response => {
            if (response.data.error) {
                alert(response.data.error)
            } else {
                localStorage.removeItem('accessToken')
                setAuthState({username: "", id: "", status: false})
                navigate('/login')
            }
        })
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
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
                    onClick={changePassword}
                >
                    Save Changes
                </button>
            </div>
        </div>
    )    
}

export default ChangePassword
