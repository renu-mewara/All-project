import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import $, { event } from "jquery";
import "dropify/dist/css/dropify.css";
import  "dropify/dist/js/dropify.js" ;


export default function Testimonialadd() {

const [imageURL, setImageUrl] = useState('');

  useEffect(() => {
    const dropifyElement = $("#image");

    if (dropifyElement.data("dropify")) {
      dropifyElement.data("dropify").destroy();
      dropifyElement.removeData("dropify");
    }

    // **Force Update Dropify Input**
    dropifyElement.replaceWith(
      `<input type="file" accept="image/*" name="image" id="image"
          class="dropify" data-height="250" data-default-file="${imageURL}"/>`
    );

    // **Reinitialize Dropify**
    $("#image").dropify();

  }, [imageURL]); // ✅ Runs when `defaultImage` updates

const parms = useParams();
const [updatedid, setUpdatedid] = useState('');
const navigate = useNavigate();
const [testimonialdetails, setTestimonialdetails] = useState('');

useEffect(() => {
  if (parms.id && parms.id !== 'undefined') {
    setUpdatedid(parms.id);
    axios.post(`${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_TESTIMONIAL_URL}/detail/${parms.id}`)
      .then((result) => {
        if (result.data._status === true) {
          setTestimonialdetails(result.data._data);
          if(result.data._status == true){
            setImageUrl(`${result.data._image_url}${result.data._data.image}`)
          }
        } else {
          setTestimonialdetails('');
        }
      })
      .catch(() => toast.error('Something went wrong !!'));
  }

}, [parms]);
const formSubmitHandler = (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  
  if (!updatedid) {

    axios.post(`${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_TESTIMONIAL_URL}/create`, formData)
      .then((result) => {
        if (result.data._status === true) {
          toast.success(result.data._message);
          event.target.reset();
          navigate('/testimonial/view')
        } else {
          toast.error(result.data._message);
        }
      })
      .catch((error) => {
        toast.error('Error adding testimonial:');
      });

  } else {
    axios.put(`${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_TESTIMONIAL_URL}/update/${parms.id}`, formData)
      .then((result) => {
        if (result.data._status === true) {
          toast.success(result.data._message);
          event.target.reset();
          navigate('/testimonial/view')
        } else {
          toast.error(result.data._message);
        }
      })
      .catch((error) => {
        console.log("error response")
        toast.error('Error adding testimonial:');
      });
  }
}
  return (
    <>
      <section className="w-full">
        <div className="w-full min-h-[610px]">
          <div className="max-w-[1220px] mx-auto py-5">
            <h3 className="text-[26px] font-semibold bg-slate-100 py-3 px-2 rounded-t-md border border-slate-400 ml-8 ">
              {updatedid ? "update testimonial" :"Add testimonial" }
            </h3>
            <form onSubmit={formSubmitHandler} autoComplete='off' className="border-2px border-t-0 p-3 rounded-b-md border-slate-400">
              <div className="flex gap-5">
                <div className="w-1/3">
                  <label
                    htmlFor="categoryImage"
                    className="block  text-md font-medium text-gray-900"
                  >
                     Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    name='image'
                    id="image"
                    className="dropify"
                    data-height="230"/>
                </div>

                <div className="w-2/3">
                  <div className="mb-5">
                    <label
                      htmlFor="categoryName"
                      className="block  text-md font-medium text-gray-900"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      name='name'
                      defaultValue={testimonialdetails.name}
                      id="name"
                      className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                      placeholder=" name"
                    />
                  </div>
                  <div className="mb-5">
                    <label
                      htmlFor="categoryName"
                      className="block  text-md font-medium text-gray-900"
                    >
                      image
                    </label>
                    <input
                      type="text"
                      name='image'
                      defaultValue={testimonialdetails.image}
                      id="image"
                      className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                      placeholder=" image"
                    />
                  </div>
                  <div className="mb-5">
                    <label
                      htmlFor="categoryName"
                      className="block  text-md font-medium text-gray-900"
                    >
                      Designation
                    </label>
                    <input
                      type="text"
                      name='designation'
                      defaultValue={testimonialdetails.designation}
                      id="designation"
                      className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                      placeholder=" designation"
                    />
                  </div>
                  <div className="mb-5">
                    <label
                      htmlFor="categoryName"
                      className="block  text-md font-medium text-gray-900"
                    >
                      Rating
                    </label>
                    <input
                      type="text"
                      name='rating'
                      defaultValue={testimonialdetails.rating}
                      id="rating"
                      className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                      placeholder=" Rating"
                    />
                  </div>
                  <div className="mb-5">
                    <label
                      htmlFor="categoryName"
                      className="block  text-md font-medium text-gray-900"
                    >
                      Order
                    </label>
                    <input
                      type="text"
                      name='order'
                      defaultValue={testimonialdetails.order}
                      id="order"
                      className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                      placeholder=" Order"
                    />
                  </div>
                  <div className="mb-5">
                    <label
                      htmlFor="categoryName"
                      className="block  text-md font-medium text-gray-900"
                    >
                      message
                    </label>
                    <input
                      type="text"
                      name='message'
                      defaultValue={testimonialdetails.message}
                      id="message"
                      className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-8 px-3"
                      placeholder="message"
                    />
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="focus:outline-none my-5 text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5"
              >
                {updatedid ? "update category ": "Add category"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
