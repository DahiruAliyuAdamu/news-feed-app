import './App.css'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import CreatePost from './pages/CreatePost'
import Post from './pages/Post'
import Registration from './pages/Registration'
import Login from './pages/Login'
import PageNotFound from './pages/PageNotFound'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import Profile from './pages/Profile'
import ChangePassword from './pages/ChangePassword'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {


  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path='/' element={<Home />} />
            <Route path='/createpost' element={<CreatePost />} />
            <Route path='/posts/:id' element={<Post />} />
            <Route path='/profile/:id' element={<Profile />} />
            <Route path='/changepassword' element={<ChangePassword />} />
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='/registration' element={<Registration />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
          <ToastContainer />
      </Router>
    </div>
  )
}

export default App
