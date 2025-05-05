import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import { AuthContext } from '../helpers/AuthContext'

import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt'
import DeleteIcon from '@mui/icons-material/Delete'

const Home = () => {
    const [posts, setPosts] = useState([])
    const { authState } = useContext(AuthContext)
    
    let navigate = useNavigate()

    const BASE_URL = process.env.REACT_APP_API_URL

    useEffect(() => {
        const headerValues = {
            headers: {
                accessToken: localStorage.getItem('accessToken')
            }
        }

        axios.get(`${BASE_URL}/posts`, headerValues).then(response => {
            if (response.data.error) {
                alert(response.data.error)
            } else {
                setPosts(response.data)
            }
        })
    }, [posts, BASE_URL])

    const likeAPost = postId => {
        const headerValues = {
            headers: {
                accessToken: localStorage.getItem('accessToken')
            }
        }
        const data = {
            postId: postId
        }
        axios.post(`${BASE_URL}/likes`, data, headerValues).then(response => {
            setPosts(posts.map(post => {
                if (post._id === postId) {
                    return {
                        ...post,
                        likeCount: response.data.status === "Like"
                            ? post.likeCount + 1
                            : post.likeCount - 1,
                        isLiked: response.data.status === "Like"
                    }
                } else {
                    return post
                }
            }))
        })
    }

    const handleDeletePost = postId => {
        const headerValues = {
            headers: {
                accessToken: localStorage.getItem('accessToken')
            }
        }
        axios.delete(`${BASE_URL}/posts/${postId}`, headerValues).then(response => {
            if (response.data.error) {
                alert(response.data.error)
            } else {
                setPosts(posts.filter(post => {
                    return post._id !== response.data.post.id
                }))
            }
        })
    }

    return (
        <div className="max-w-2xl mx-auto p-6 space-y-6">
            { posts.length === 0 ? (
                <p className="text-center text-gray-500 text-lg">No posts to display.</p>
            ) : (

                posts.map(post => (
                    <div
                        key={post._id}
                        className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition duration-300 ease-in-out cursor-pointer"
                    >
                        <div className="flex justify-between items-center mb-3">
                            <h2 className="text-2xl font-bold text-gray-800">{post.title}</h2>
                            {
                                authState.username === post.user.username &&
                                <DeleteIcon 
                                    onClick={() => handleDeletePost(post._id)}
                                    className="text-red-500 cursor-pointer hover:text-red-700 transition duration-200"
                                />
                            }
                        </div>
        
                        <p
                            className="text-gray-700 mb-4 hover:underline"
                            onClick={() => navigate(`/posts/${post._id}`)}
                        >
                            {post.postText}
                        </p>
        
                        <div className="flex justify-between items-center text-sm">
                            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                                <Link to={`/profile/${post.user._id}`}>
                                    {post.user.username}
                                </Link>
                            </span>
        
                            <div className="flex items-center gap-2 text-sm">
                                {
                                    post.isLiked ? (
                                    <ThumbUpIcon 
                                        onClick={() => likeAPost(post._id)}
                                        className="text-blue-600 cursor-pointer hover:text-blue-700 transition duration-200"
                                    />
                                    ) : (
                                    <ThumbUpOffAltIcon
                                        onClick={() => likeAPost(post._id)}
                                        className="text-gray-500 cursor-pointer hover:text-blue-500 transition duration-200"
                                    />
                                    )
                                }
                                <span className="text-gray-700 font-medium">{post.likeCount}</span>
                            </div>
        
                            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
                                {new Date(post.createdAt).toLocaleString()}
                            </span>
                        </div>
                    </div>
                ))
            )}
        </div>
    )          
}

export default Home
