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

const App = () => {


  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path='/createpost' element={<ProtectedRoute><CreatePost /></ProtectedRoute>} />
          <Route path='/posts/:id' element={<ProtectedRoute><Post /></ProtectedRoute>} />
          <Route path='/profile/:id' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path='/changepassword' element={<ProtectedRoute><ChangePassword /></ProtectedRoute>} />
          <Route path='/login' element={<Login />} />
          <Route path='/registration' element={<Registration />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
