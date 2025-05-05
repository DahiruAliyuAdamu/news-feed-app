import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../helpers/AuthContext'

const Navbar = () => {
  const { authState, setAuthState } = useContext(AuthContext)

  // const id = authState.id

  const logout = () => {
    localStorage.removeItem('accessToken')
    setAuthState({username: "", id: "", status: false})
  }

  return (
    <nav style={{ marginBottom: '2rem' }}>
        {
          authState.status ? (
              <>
                <Link to="/" style={{ marginRight: '1rem' }}>Home</Link>
                <Link to="/createpost" style={{ marginRight: '1rem' }}>Create a Post</Link>
                {/* <Link to={`/profile/${id}`} state={{ marginRight: '1rem'}}>Profile</Link> */}
                <button
                  onClick={logout}
                  style={{ marginLeft: '1rem', marginRight: '1rem', background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  Logout - {authState.username}
                </button>
                {/* <span> - {authState.username}</span> */}
              </>
            ) : (
            <>
              <Link to="/login" style={{ marginRight: '1rem' }}>Login</Link>
              <Link to="/registration" style={{ marginRight: '1rem' }}>Registration</Link>
            </>
          )
        }
    </nav>
  )
}

export default Navbar
