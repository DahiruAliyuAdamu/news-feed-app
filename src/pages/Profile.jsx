import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../helpers/AuthContext'

const Profile = () => {
    const { id } = useParams()
    const [user, setUser] = useState({})
    const [posts, setPosts] = useState([])
    const { authState } = useContext(AuthContext)

    const navigate = useNavigate()

    const BASE_URL = process.env.REACT_APP_API_URL

    useEffect(() => {
        axios.get(`${BASE_URL}/auth/profile/${id}`).then(response => {
            setUser(response.data.profile)
            setPosts(response.data.posts)
        })
    })

    return (
        <div className="max-w-4xl mx-auto mt-10 px-4">
            {/* Basic Info */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8 flex items-center gap-6">
                <img
                    src="/default-avatar.png" // replace with user.profilePic or similar
                    alt="User avatar"
                    className="w-20 h-20 rounded-full object-cover border border-gray-300"
                />
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">{user.fullname}</h2>
                    <p className="text-gray-500">@{user.username}</p>
                    <p className="text-gray-600 mt-2">{user.bio} 🚀</p>
    
                    {/* Update Password Button */}
                    {
                        authState.username === user.username && 
                        <button
                            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                            onClick={() => {
                                navigate('/changepassword')
                            }}
                        >
                            Update Password
                        </button>
                    }
                </div>
            </div>
    
            {/* List of Posts */}
            <div className="space-y-6">
                {posts.map((post, index) => (
                    <div
                        key={index}
                        className="bg-white p-5 rounded-lg shadow hover:shadow-md transition duration-300"
                    >
                        <h3 className="text-xl font-semibold text-gray-800">{post.title}</h3>
                        <p className="text-gray-700 mt-2">{post.postText}</p>
                    </div>
                ))}
            </div>
        </div>
    )    
}

export default Profile
