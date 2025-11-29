import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Addlocation() {
const parms = useParams();
const [updatedid , setUpdatedid] = useState('');
const navigate = useNavigate();
const [countarydetails , setcountarydetails] = useState('');
const [countary, setcountary] = useState('')

useEffect(() => {
if(parms.id && parms.id !== 'undefined') {
  setUpdatedid(parms.id);
  axios.post(`${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_COUNTARY_URL}/detail/${parms.id}`)
    .then((result) => {
      if(result.data._status === true){
        setcountarydetails(result.data._data);
        setcountary(result.data.code);
      } else {
        setcountarydetails('');
      }
    })
    .catch(() => toast.error('Something went wrong !!'));
}

}, [parms]);


const formSubmitHandler = (event) => {
  event.preventDefault();

const formdata ={
  name : event.target.name.value,
  order : event.target.order.value,
}

if (!updatedid) {
  
  axios.post(`${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_COUNTARY_URL}/create`, formdata)
    .then((result) => {
      if(result.data._status === true){
        toast.success(result.data._message);
        event.target.reset();
        navigate('/country/view')
      } else {
        toast.error(result.data._message);
      }
    })
    .catch((error) => {
      console.log("error response")
      toast.error('Error adding countary:');
    });
  
}else {
  axios.put(`${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_COUNTARY_URL}/update/${parms.id}`, formdata)
    .then((result) => {
      if(result.data._status === true){
        toast.success(result.data._message);
        event.target.reset();
        navigate('/countary/view')
      } else {
        toast.error(result.data._message);
      }
    })
    .catch((error) => {
      console.log("error response")
      toast.error('Error adding countary:');
    });
  
  
}
}
  return (
    <>
       <div className="w-full px-10">
      <div className="max-w-[1220px] mx-auto py-5">
        <h3 className="text-[20px] font-semibold bg-slate-100 py-2 px-4 rounded-t-md border border-slate-400">
          {updatedid ? "Update countary" : "Add countary"}
        </h3>


        <form autoComplete='off'
          className="p-3 border border-t-0 rounded-b-md border-slate-400"
          onSubmit={formSubmitHandler} 
        >
          {/* countary Name */}
          <div className="mb-5">
            <label className="block text-md font-medium text-gray-900">countary Name</label>
            <input
              type="text"
              name= "name"
              defaultValue={countarydetails.name}
              className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
              placeholder="Enter countary Name"
            />
          </div>
          {/* countary Order */}
          <div className="mb-5">
            <label className="block text-md font-medium text-gray-900">Order</label>
            <input
              type="number"
              name='order'
             defaultValue={countary.code}

              className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
              placeholder="Enter Order"
            />
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="focus:outline-none my-10 text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
          >
            {updatedid ? "Update countary" : "Add countary"}
          </button>
        </form>
      </div>
    </div>
    </>
  )
}
