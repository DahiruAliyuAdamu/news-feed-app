import { createContext, useEffect, useState } from 'react'
import axios from 'axios'

export const AuthContext = createContext("")

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        username: "",
        id: "",
        status: false
    })
    
    const [loading, setLoading] = useState(true)

    const BASE_URL = process.env.REACT_APP_API_URL

    useEffect(() => {
        const token = localStorage.getItem('accessToken')
        if (!token) {
            setLoading(false)
            return
        }

        axios.get(`${BASE_URL}/auth/auth`, {
            headers: { accessToken: token }
        }).then(response => {
            console.log(response.data.error)
            response.data.error ?
                setAuthState({ 
                    username: "", 
                    id: "", 
                    status: false
                }) :
                setAuthState({
                    username: response.data.username,
                    id: response.data.id,
                    status: true
                })
        }).catch(() => {
            setAuthState({ 
                username: "", 
                id: "", 
                status: false
            })
        }).finally(() => setLoading(false))
    }, [BASE_URL])

    return (
        <AuthContext.Provider value={{ authState, setAuthState, loading }}>
            {children}
        </AuthContext.Provider>
    )
}