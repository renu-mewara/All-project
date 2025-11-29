import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import './assets/css/style.css'
import Rootelement from "./componet/Rootelement";
import Home from "./componet/Home";
import Aboutus from "./componet/Aboutus";
import Productlisting from "./componet/Productlisting";
import { store } from './ReduxToolkit/reduxtoolkit.js';
import { Provider } from "react-redux";
import ViewCart from "./componet/Viewcart.jsx";
const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter >
      <Provider store={store}>
        <Routes>
          <Route element={<Rootelement/>}>
            <Route path="/" element={<Home />} />
            <Route path="about-us" element={<Aboutus />} />
            <Route path="products" element={<Productlisting/>}/>
            <Route path="/view-carts" element={<ViewCart />} />
          </Route>
        </Routes>
    </Provider>
  </BrowserRouter>,
);
