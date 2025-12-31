import { createRoot } from 'react-dom/client'
import './assets/css/index.css'
import Header from './common/Header'
import Footer from './common/Footer'
import Home from './Home'
import Aboutus from './Aboutus'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Resources from './Resources'
import Contact from './Contact'
import Team from './Team'
import Login from './auth/Login'
import Signup from './auth/Signup'
import { ToastContainer } from 'react-toastify'
import Performance from './main/Performance'
import Responsive from './main/Responsive'
import Customizable from './main/Customizable'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Header />
    <ToastContainer/>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/about' element={<Aboutus />} />
      <Route path='/resources' element={<Resources />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/team' element={<Team />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/performance' element={<Performance />} />
      <Route path='/responsive' element={<Responsive />} />
     <Route path='/customizable' element={<Customizable />} />

      
    </Routes>
    <Footer />
  </BrowserRouter>
)
