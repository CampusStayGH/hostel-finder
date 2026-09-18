
import Navbar from './Components/Navbar'
import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home';
import NotFoundPage from './pages/PageNotFound'
import Auth from './pages/Auth';
import HostelDetails from './pages/HostelDetails';
import Hostels from './pages/Hostels';
import Explore from './pages/Explore';
import Saved from './pages/Saved';
import Profile from './pages/Profile';
import ErrorPage from './pages/ErrorPage';
import AdminHostelApprovalDashboard from './pages/AdminDashboard';
import CreateHostelPage from './pages/CreateHostel';
import AdminLogin from './pages/AdminLogin';
import ProtectedRoute from './auth/ProtectedRoute';
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/hostels" element={<Hostels />} />
        <Route path="/hostels/:id" element={<HostelDetails />} />
        <Route path="/hostel/:id" element={<HostelDetails />} />
        <Route path="/explore" element={<Explore />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/saved" element={<Saved />} />
        </Route>
        <Route path="/auth" element={<Auth />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/login" element={<Navigate to="/auth" replace />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/error/500" element={<ErrorPage />} />
        <Route path="/not-found" element={<NotFoundPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route element={<ProtectedRoute role="admin" />}>
          <Route path="/admin/dashboard" element={<AdminHostelApprovalDashboard />} />
        </Route>
        <Route path='/dashboard' element={<Navigate to="/admin/dashboard" replace />} />
        <Route path='/listhostel' element={<CreateHostelPage/>}></Route>
      </Routes>
    </>
  )
}

export default App
