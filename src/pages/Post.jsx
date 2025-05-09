import axios from 'axios'
import React, { useContext, useEffect, useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AuthContext } from '../helpers/AuthContext'
import EditPostModal from '../components/EditPostModal'

import DeleteIcon from '@mui/icons-material/Delete'

const Post = () => {
    let { id } = useParams()
    const [post, setPost] = useState({})
    const [newComment, setNewComment] = useState("")
    const [comments, setComments] = useState([])
    const { authState } = useContext(AuthContext)

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editField, setEditField] = useState("")
    const [editValue, setEditValue] = useState("")
    const [currentPostId, setCurrentPostId] = useState(null)

    let navigate = useNavigate()

    const BASE_URL = process.env.REACT_APP_API_URL

    useEffect(() => {
        axios.get(`${BASE_URL}/posts/byId/${id}`).then(response => {
            setPost(response.data)
        })

        axios.get(`${BASE_URL}/comments/${id}`).then(response => 
            setComments(response.data)
        )
    }, [id, BASE_URL])

    const handlePostComment = () => {
        if (newComment.trim() !== "") {
            const data = {
                comment: newComment,
                postId: id
            }

            const headerValues = {
                headers: {
                    accessToken: localStorage.getItem('accessToken')
                }
            }

            axios.post(`${BASE_URL}/comments`, data, headerValues).then(response => {
                if (response.data.error) {
                    alert(response.data.error)
                } else {
                    setComments(prev => [response.data.comment, ...prev])
                    setNewComment("")
                }
            })
        }
    }

    const deleteComment = id => {
        // console.log(id)
        axios.delete(`${BASE_URL}/comments/${id}`, {
            headers: {
                accessToken: localStorage.getItem('accessToken')
            }
        }).then(response => {
            // alert(response.data.message)
            setComments(comments.filter(data => {
                return data._id !== id
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
                navigate('/')
            }
        })
    }

    const editPost = (field, postId, value) => {
        setEditField(field);
        setEditValue(value);
        setCurrentPostId(postId);
        setIsModalOpen(true);
    };

    const handleSaveEdit = newValue => {
        const headerValues = {
            headers: {
                accessToken: localStorage.getItem('accessToken')
            }
        }

        const data = { 
            option: editField, 
            data: newValue 
        }

        axios.put(`${BASE_URL}/posts/${currentPostId}`, data, headerValues).then(response => {
            if (response.data.error) {
                alert(response.data.error)
            } else {
                alert('Post updated successfully')
                setPost({
                    ...post,
                    title: response.data.title,
                    postText: response.data.postText
                })
            }
        })
    }

    return (
        <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-2xl shadow-md space-y-6">
            <div className="space-y-4">
                <div className="flex justify-between items-center mb-3">
                    <h2 
                        className="text-2xl font-bold text-gray-800" 
                        onClick={() => authState.username === post.user.username && editPost("title", post._id, post.title)}
                    >
                        {post.title}
                    </h2>
                    {
                        authState.username === post.user?.username &&
                        <DeleteIcon 
                            onClick={() => handleDeletePost(post._id)}
                            className="text-red-500 cursor-pointer hover:text-red-700 transition duration-200"
                        />
                    }
                </div>
                <p className=
                    "text-gray-700"  
                    onClick={() => authState.username === post.user.username && editPost("postText", post._id, post.postText)}
                >
                    {post.postText}
                </p>
                <div className="text-sm text-gray-500 flex justify-between">
                    <span>Posted by: {post.user?.username}</span>
                    <span>{new Date(post.createdAt).toLocaleString()}</span>
                </div> 
            </div>
            <div className="pt-4 border-t text-gray-600 font-medium" id="comments">
                {/* Comment Section */}
                <div
                    className="space-y-2"
                    onClick={(e) => e.stopPropagation()} // prevent navigation when clicking inside
                >
                    {/* Show first comment */}
                    {
                        comments.length > 0 ? (
                            comments.map(comment => (
                                <div key={comment._id} className="bg-gray-100 p-3 rounded relative">
                                    <div className="flex justify-between text-xs text-gray-500 mb-1 mr-5">
                                        <span>{comment.user.username}</span>
                                        <span>{new Date(comment.createdAt).toLocaleString()}</span>
                                    </div>
                                    <p className="text-gray-700">{comment.comment}</p>
                                    {
                                        authState.username === comment.user.username &&
                                        <button
                                            onClick={() => deleteComment(comment._id)}
                                            className="absolute top-2 right-1 text-red-500 hover:text-white hover:bg-red-500 border border-red-500 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold transition duration-200"
                                            title="Delete comment"
                                        >
                                            ×
                                        </button>
                                    }
                                </div>
                            ))
                        ) : <p className="text-gray-500 text-sm">No comments yet.</p>
                    }

                    {/* Comment input */}
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={newComment}
                            onChange={e => setNewComment(e.target.value)}
                            placeholder="Write a comment..."
                            className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                        />
                        <button
                            onClick={handlePostComment}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                        >
                            Post
                        </button>
                    </div>
                </div>
            </div>
            
            {/* Edit Modal */}
            <EditPostModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveEdit}
                field={editField}
                initialValue={editValue}
            />
        </div>
    )
}

export default Post
