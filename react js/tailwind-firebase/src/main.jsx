import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './assets/css/style.css'
import Home from "./componets/Home";
import Rootlayout from "./componets/Rootlayout";
import Addquiz from "./componets/Addquiz";
import Viewquiz from "./componets/Viewquiz";
import Playquiz from "./componets/Playquiz";
import { ToastContainer } from "react-toastify";
import Login from "./componets/auth/Login";
import Register from "./componets/auth/Register";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route element={<Rootlayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/add-quiz" element={<Addquiz />} />
      <Route path="/view-quiz" element={<Viewquiz />} />
      <Route path="/play-quiz" element={<Playquiz />} />
       <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      
    </Routes>
  </BrowserRouter>,
  // <ToastContainer></ToastContainer>
);









