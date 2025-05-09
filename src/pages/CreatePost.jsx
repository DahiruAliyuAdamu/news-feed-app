import React, { useState } from 'react'
import axios from 'axios'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'

import { FaSpinner } from 'react-icons/fa'
import { toast } from 'react-toastify'

const CreatePost = () => {
    let navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const BASE_URL = process.env.REACT_APP_API_URL

    const initialValues = {
        title: "",
        postText: "",
    }

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("You must input a Title"),
        postText: Yup.string().required("You must input a post Text"),
    })

    const onSubmit = async data => {
        setLoading(true)

        try {
            const headerValues = {
                headers: {
                    accessToken: localStorage.getItem('accessToken')
                }
            }      
            const response = await axios.post(`${BASE_URL}/posts`, data, headerValues)
            const resData = response.data

            if (resData.error) {
                toast.error(resData.error)
            } else {
                toast.success('Posted successfully')
                navigate('/')
            }
        } catch (err) {
            toast.error(err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="createPostPage max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Create Post</h1>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema} >
                <Form className="flex flex-col gap-4">
                    <div>
                        <label className="text-sm font-medium text-gray-700">Title</label>
                        <Field 
                            name="title" 
                            placeholder="Ex. Title..." 
                            className="w-full p-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <ErrorMessage name="title" component="span" className="text-red-500 textsm mt-0 block" />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700">Post</label>
                        <Field 
                            as="textarea"
                            rows={5}
                            name="postText" 
                            placeholder="Ex. Post..." 
                            className="w-full p-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                        />
                        <ErrorMessage name="postText" component="div" className="text-red-500 text-sm" />
                    </div>

                    <button
                        className="relative w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition h-12"
                        disabled={loading}
                    >
                        {loading ? (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <FaSpinner className="animate-spin text-white text-lg" />
                            </div>
                        ) : (
                            "Create Post"
                        )}
                    </button>
                </Form>
            </Formik>
        </div>
    )
}

export default CreatePost
