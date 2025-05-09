import React, { useState, useContext } from 'react'
// import { Formik, Form, Field, ErrorMessage } from 'formik'
// import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../helpers/AuthContext'

import { FaSpinner } from 'react-icons/fa'
import { toast } from 'react-toastify'

const Login = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const { setAuthState } = useContext(AuthContext)

    const BASE_URL = process.env.REACT_APP_API_URL
    
    const loginUser = async () => {

        if (!username || !password) {
            toast.warning("Username and password are required.")
            return
        }

        const data = { username, password }
        setLoading(true)

        try {
            const response = await axios.post(`${BASE_URL}/auth/login`, data)
            const resData = response.data
            
            if (resData.error) {
                toast.error(resData.error)
            } else {
                localStorage.setItem('accessToken', resData.token)
                setAuthState({
                    username: resData.username, 
                    id: resData._id, 
                    status: true
                })
                setUsername('')
                setPassword('')
                toast.success('Login successful!')
                navigate('/')
            }
        } catch (err) {
            console.error('Login error:', err)
            toast.error('Something went wrong. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg mt-10 space-y-4">
            <input 
                type="text" 
                placeholder="Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input 
                type="password" 
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
                onClick={loginUser}
                className="relative w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition h-12"
                disabled={loading}
            >
                {loading ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <FaSpinner className="animate-spin text-white text-lg" />
                    </div>
                ) : (
                    "Login"
                )}
            </button>
        </div>
    )        
}

export default Login
