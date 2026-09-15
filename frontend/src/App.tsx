
import Navbar from './Components/Navbar'
import './App.css'
import { BrowserRouter, Routes, Route} from 'react-router';
import HomePage from './pages/Home';
import NotFoundPage from './pages/PageNotFound'
function App() {
  

  



  return (
    <>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/hostels" element={<div>Hostels</div>} />
        <Route path="/explore" element={<div>Explore</div>} />
        <Route path="/saved" element={<div>Saved</div>} />
        <Route path="/auth" element={<div>Auth</div>} />
        <Route path="/hostel/:id" element={<div>Hostel Details</div>} />
        <Route path="*" element={<NotFoundPage/>} />
      </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
