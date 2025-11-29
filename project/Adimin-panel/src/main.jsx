import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Header from './cmmon/Header'
import 'flowbite'
import Breadcumb from './cmmon/Breadcumb'
import Sidebar from './cmmon/Sidebar'
import Footer from './cmmon/Footer'
import Home from './pages/Home'
import User from './pages/User'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Rootlayout from './layout/Rootlyout';
import Dashboard from './Dashboard'
import Enquiry from './pages/Enquiry'
import Newsletter from './pages/Newsletter'
import Addcolor from './pages/color/Addcolor'
import Viewcolor from './pages/color/Viewcolor'
import Add_materal from './pages/material/Add_materal'
import View_material from './pages/material/View_material'
import Viewcategory from './pages/parentcategory/Viewcategory'
import Addcategory from './pages/parentcategory/Addcategory'
import Addsubcategory from './pages/subcategory/Addsubcategory'
import Viewsubcategory from './pages/subcategory/Viewsubcategory'
import Addsubsubcategory from './pages/sub sub category/Addsubsubcategory'
import Viewsubsubcategory from './pages/sub sub category/Viewsubsubcategory'
import Productadd from './pages/product/Productadd'
import Productview from './pages/product/Productview'
import Addchoose from './pages/Choose.jsx/Addchoose'
import Viewchoose from './pages/Choose.jsx/Viewchoose'
import Order from './pages/order/Order'
import Slideradd from './pages/slider/Slideradd'
import Sliderview from './pages/slider/Sliderview'
import Addlocation from './pages/countary/Addlocation'
import Viewlocation from './pages/countary/Viewlocation'
import Testimonialadd from './pages/Testimonial/Testimonialadd'
import Testimonialview from './pages/Testimonial/Testimonialview'
import Faqadd from './pages/faq/Faqadd'
import FaqView from './pages/faq/FaqView'



createRoot(document.getElementById('root')).render(
  <>
  <BrowserRouter>
    <Routes>
      <Route element={<Rootlayout />}>
        <Route index element={<Dashboard />} />
        <Route path="view-user" element={<User/>} />
        <Route path="enquiry" element={<Enquiry />} />
        <Route path="newsletter" element={<Newsletter />} />
       <Route path="addcolor" element={<Addcolor />} />
       <Route path="viewcolor" element={<Viewcolor />} />
      <Route path="addmaterial" element={<Add_materal />} />
      <Route path="viewmaterial" element={<View_material />} />
      <Route path="addcategory" element={<Addcategory />} />
      <Route path="viewcategory" element={<Viewcategory />} />
      <Route path="addsubcategory" element={<Addsubcategory />} />
      <Route path="viewsubcategory" element={<Viewsubcategory />} />
       <Route path="addsubsubcategory" element={<Addsubsubcategory />} />
      <Route path="viewsubsubcategory" element={<Viewsubsubcategory />} />
      <Route path="productadd" element={<Productadd />} />
      <Route path="productview" element={<Productview />} />
      <Route path="addchoose" element={<Addchoose />} />
      <Route path="viewchoose" element={<Viewchoose />} />
      <Route path="order" element={<Order />} />
      <Route path="slideradd" element={<Slideradd />} />
        <Route path="sliderview" element={<Sliderview />} />
        <Route path="addlocation" element={<Addlocation />} />
        <Route path="viewlocation" element={<Viewlocation />} />
        <Route path="testimonialadd" element={<Testimonialadd />} />
        <Route path="testimonialview" element={<Testimonialview />} />
         <Route path="faqadd" element={<Faqadd />} />
        <Route path="faqview" element={<FaqView />} />







      </Route>
    </Routes>
  </BrowserRouter>

   
 </>,
)
