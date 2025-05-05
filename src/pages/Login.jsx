import React, { useState, useContext } from 'react'
// import { Formik, Form, Field, ErrorMessage } from 'formik'
// import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../helpers/AuthContext'

const Login = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const { setAuthState } = useContext(AuthContext)

    const BASE_URL = process.env.REACT_APP_API_URL
    
    const loginUser = () => {
        const data  = {
            username: username,
            password: password
        }
        axios.post(`${BASE_URL}/auth/login`, data).then(response => {
            
            if (response.data.error) {
                alert(response.data.error)
            } else {
                localStorage.setItem("accessToken", response.data.token)
                setAuthState({
                    username: response.data.username, id: response.data._id, status: true
                })
                setUsername("")
                setPassword("")
                navigate('/')
            }
        }).catch (err => {
            console.log(err.message)
        })
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
                className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition"
            >
                Login
            </button>
        </div>
    )        
}

export default Login
