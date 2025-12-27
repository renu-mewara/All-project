import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import 'flowbite';

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import RootLayout from "./layout/RootLayout.jsx";
import Home from "./pages/Home.jsx";
import User from "./pages/User.jsx";


import Enquiry from "./pages/Enquiry.jsx";
import Newsletter from "./pages/Newsletter.jsx";

import AddColor from "./pages/color/AddColor.jsx";
import ViewColor from "./pages/color/viewcolor.jsx";

import Add_materal from "./pages/material/Add_materal.jsx";
import View_material from "./pages/material/View_material.jsx";

import AddCategory from "./pages/parentcategory/AddCategory.jsx";
import ViewCategory from "./pages/parentcategory/ViewCategory.jsx";

import AddSubCategory from "./pages/subcategory/AddSubCategory.jsx";
import ViewSubCategory from "./pages/subcategory/ViewSubCategory.jsx";

import AddSubSubCategory from "./pages/sub sub category/AddSubSubCategory.jsx";
import ViewSubSubCategory from "./pages/sub sub category/ViewSubSubCategory.jsx";

import ProductAdd from "./pages/product/ProductAdd.jsx";
import ProductView from "./pages/product/ProductView.jsx";

import AddChoose from "./pages/Choose/AddChoose.jsx";
import ViewChoose from "./pages/Choose/ViewChoose.jsx";
import Order from "./pages/order/Order.jsx";
import SliderAdd from "./pages/slider/SliderAdd.jsx";
import SliderView from "./pages/slider/SliderView.jsx";

import AddLocation from "./pages/countary/AddLocation.jsx";
import ViewLocation from "./pages/countary/ViewLocation.jsx";

import TestimonialAdd from "./pages/testimonial/TestimonialAdd.jsx";
import TestimonialView from "./pages/testimonial/TestimonialView.jsx";

import Faqadd from "./pages/faq/Faqadd.jsx";
import Faqview from "./pages/faq/FaqView.jsx";


// ✅ Router setup (same as sir)
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="user" element={<User />} />
        <Route path="enquiry" element={<Enquiry />} />
        <Route path="newsletter" element={<Newsletter />} />

        <Route path="color">
          <Route path="addcolor" element={<AddColor />} />
          <Route path="update/:id?" element={<AddColor />} />
          <Route path="viewcolor" element={<ViewColor />} />
        </Route>

        <Route path="material">
          <Route path="addmaterial" element={<Add_materal />} />
          <Route path="update/:id?" element={<Add_materal />} />
          <Route path="viewmaterial" element={<View_material />} />
        </Route>

        <Route path="category">
          <Route path="add" element={<AddCategory />} />
          <Route path="update/:id?" element={<AddCategory />} />
          <Route path="view" element={<ViewCategory />} />
        </Route>

        <Route path="subcategory">
          <Route path="add" element={<AddSubCategory />} />
          <Route path="update/:id?" element={<AddSubCategory />} />
          <Route path="view" element={<ViewSubCategory />} />
        </Route>

        <Route path="sub sub category">
          <Route path="add" element={<AddSubSubCategory />} />
          <Route path="update/:id?" element={<AddSubSubCategory />} />
          <Route path="view" element={<ViewSubSubCategory />} />
        </Route>

        <Route path="product">
          <Route path="add" element={<ProductAdd />} />
          <Route path="update/:id?" element={<ProductAdd />} />
          <Route path="view" element={<ProductView />} />
        </Route>

        <Route path="Choose">
          <Route path="add" element={<AddChoose />} />
          <Route path="update/:id?" element={<AddChoose />} />
          <Route path="view" element={<ViewChoose />} />
        </Route>

        <Route path="order" element={<Order />} />

        <Route path="slider">
          <Route path="add" element={<SliderAdd />} />
          <Route path="update/:id?" element={<SliderAdd />} />
          <Route path="view" element={<SliderView />} />
        </Route>

        <Route path="country">
          <Route path="add" element={<AddLocation />} />
          <Route path="update/:id?" element={<AddLocation />} />
          <Route path="view" element={<ViewLocation />} />
        </Route>

        <Route path="testimonial">
          <Route path="add" element={<TestimonialAdd />} />
          <Route path="update/:id?" element={<TestimonialAdd />} />
          <Route path="view" element={<TestimonialView />} />
        </Route>

        <Route path="faq">
          <Route path="add" element={<Faqadd />} />
          <Route path="update/:id?" element={<Faqadd />} />
          <Route path="view" element={<Faqview />} />
        </Route>
      </Route>
    </>
  )
);


// ✅ Rendering (same format as sir)
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
