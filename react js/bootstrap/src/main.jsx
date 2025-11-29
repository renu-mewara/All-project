import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Homepage from './Componets/Homepage';
import Productlisting from './Componets/Productlisting';
import Aboutus from './Componets/Aboutus';

import './assets/css/style.css'
import Rootlayout from './Componets/Rootlayout';


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route element={<Rootlayout />}>
        <Route index element={<Homepage />} />
        <Route path="products" element={<Productlisting />} />
        <Route path="aboutus" element={<Aboutus />} />
      </Route>
    </Routes>
  </BrowserRouter>
);




