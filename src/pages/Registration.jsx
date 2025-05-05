import React, { useContext } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../helpers/AuthContext'

const Registration = () => {
    const navigate = useNavigate()
    const { setAuthState } = useContext(AuthContext)
    const initialValues = {
        fullName: '',
        username: '',
        email: '',
        password: '',
        phone: '',
        gender: '',
        dob: '',
        bio: '',
        profileImage: ''
    }

    const BASE_URL = process.env.REACT_APP_API_URL

    const validationSchema = Yup.object().shape({
        fullName: Yup.string()
            .required('Full name is required'),
        username: Yup.string()
            .min(4, 'Username must be at least 4 characters')
            .max(15, 'Username cannot exceed 15 characters')
            .required('Username is required'),
        email: Yup.string()
            .email('Please enter a valid email')
            .required('Email is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .max(20, 'Password cannot exceed 20 characters')
            .required('Password is required'),
        phone: Yup.string(),
        gender: Yup.string()
            .required('Gender is required'),
        dob: Yup.string()
            .required('Date of Birth is required'),
        bio: Yup.string(),
        profileImage: Yup.string()
            .url('Invalid image URL'),
    })

    const registerUser = (data, { resetForm }) => {
        // console.log(data)
        axios.post(`${BASE_URL}/auth`, data).then(response => {
            // console.log(response)
            resetForm()
            localStorage.removeItem('accessToken')
            setAuthState({username: "", id: "", status: false})
            navigate('/login')
        })
    }

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg space-y-6">
            <Formik
                initialValues={initialValues}
                onSubmit={registerUser}
                validationSchema={validationSchema}
            >
                <Form className="space-y-4">
                    <div className="flex items-center justify-center">
                        {/* <img
                            src="/default-avatar.png"
                            alt="User Avatar"
                            className="w-16 h-16 rounded-full object-cover border border-gray-300"
                        /> */}
                        <div>
                            <h2 className="text-xl font-bold text-gray-800">User Registration</h2>
                            <p className="text-gray-500 text-sm">Complete your profile to get started</p>
                        </div>
                    </div>

                    {/* Full Name and Username */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div>
                            <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700">Full Name</label>
                            <Field
                                id="fullName"
                                name="fullName"
                                type="text"
                                placeholder="John Doe"
                                className="w-full p-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
                            />
                            <ErrorMessage name="fullName" component="div" className="text-red-500 text-sm" />
                        </div>
    
                        <div>
                            <label htmlFor="username" className="block text-sm font-semibold text-gray-700">Username</label>
                            <Field
                                id="username"
                                name="username"
                                type="text"
                                placeholder="johndoe123"
                                className="w-full p-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
                            />
                            <ErrorMessage name="username" component="div" className="text-red-500 text-sm" />
                        </div>
                    </div>
    
                    {/* Email and Phone */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-gray-700">Email</label>
                            <Field
                                id="email"
                                name="email"
                                type="email"
                                placeholder="email@example.com"
                                className="w-full p-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
                            />
                            <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                        </div>
    
                        <div>
                            <label htmlFor="phone" className="block text-sm font-semibold text-gray-700">Phone Number</label>
                            <Field
                                id="phone"
                                name="phone"
                                type="tel"
                                placeholder="+234XXXXXXXXXX"
                                className="w-full p-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
                            />
                            <ErrorMessage name="phone" component="div" className="text-red-500 text-sm" />
                        </div>
                    </div>
    
                    {/* Gender and Date of Birth */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="gender" className="block text-sm font-semibold text-gray-700">Gender</label>
                            <Field
                                as="select"
                                name="gender"
                                className="w-full p-1 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-400"
                            >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </Field>
                            <ErrorMessage name="gender" component="div" className="text-red-500 text-sm" />
                        </div>
    
                        <div>
                            <label htmlFor="dob" className="block text-sm font-semibold text-gray-700">Date of Birth</label>
                            <Field
                                id="dob"
                                name="dob"
                                type="date"
                                max={new Date().toISOString().split("T")[0]} // Prevent future dates
                                className="w-full p-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 bg-white text-gray-700"
                            />
                            <ErrorMessage name="dob" component="div" className="text-red-500 text-sm" />
                        </div>
                    </div>
    
                    {/* Bio */}
                    <div>
                        <label htmlFor="bio" className="block text-sm font-semibold text-gray-700">About Me</label>
                        <Field
                            as="textarea"
                            id="bio"
                            name="bio"
                            rows={3}
                            placeholder="A short bio about you..."
                            className="w-full p-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 resize-none"
                        />
                        <ErrorMessage name="bio" component="div" className="text-red-500 text-sm" />
                    </div>
    
                    {/* Password */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-semibold text-gray-700">Password</label>
                        <Field
                            id="password"
                            name="password"
                            type="password"
                            placeholder="••••••••"
                            className="w-full p-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
                        />
                        <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                    </div>
    
                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                    >
                        Register User
                    </button>
                </Form>
            </Formik>
        </div>
    )                
}

export default Registration
