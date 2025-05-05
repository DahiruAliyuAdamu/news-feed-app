import React from 'react'
import axios from 'axios'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'

const CreatePost = () => {
    let navigate = useNavigate()

    const BASE_URL = process.env.REACT_APP_API_URL

    const initialValues = {
        title: "",
        postText: "",
    }

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("You must input a Title"),
        postText: Yup.string().required("You must input a post Text"),
    })

    const onSubmit = data => {
        const headerValues = {
            headers: {
                accessToken: localStorage.getItem('accessToken')
            }
        }      
        axios.post(`${BASE_URL}/posts`, data, headerValues).then(response => {
            if (response.data.error) {
                alert(response.data.error)
            } else {
                navigate('/')
            }
        })
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
                        type="submit"
                        className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
                    >
                        Create Post
                    </button>
                </Form>
            </Formik>
        </div>
    )
}

export default CreatePost
