import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Faqadd() {
const [faq, setfaq] = React.useState('#ffffff');
const parms = useParams();
const [updatedid , setUpdatedid] = useState('');
const navigate = useNavigate();
const [faqdetails , setfaqdetails] = useState('');

useEffect(() => {
if(parms.id){
  setUpdatedid(parms.id);
  axios.post(`${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_FAQ_URL}/detail/${parms.id}`)
      .then((result) => {
            if(result.data._status == true){
              setfaqdetails(result.data._data)
              setfaq(result.data.code)
            } else {
              setfaqdetails('');
              settotalpage(1)
            }
          })
          .catch(() => {
            toast.error('Something went wrong !!');
          })       
        
}
}, [parms.id]);


const formSubmitHandler = (event) => {
  event.preventDefault();

const formdata ={
  question : event.target.question.value,
  answer : event.target.answer.value,
  order : event.target.order.value,
}

if (!updatedid) {
  
  axios.post(`${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_FAQ_URL}/create`, formdata)
    .then((result) => {
      if(result.data._status === true){
        toast.success(result.data._message);
        event.target.reset();
        navigate('/faq/view')
      } else {
        toast.error(result.data._message);
      }
    })
    .catch((error) => {
      console.log("error response")
      toast.error('Error adding faq:');
    });
  
}else {
  axios.put(`${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_FAQ_URL}/update/${parms.id}`, formdata)
    .then((result) => {
      if(result.data._status === true){
        toast.success(result.data._message);
        event.target.reset();
        navigate('/faq/view')
      } else {
        toast.error(result.data._message);
      }
    })
    .catch((error) => {
      console.log("error response")
      toast.error('Error adding cfaqolor:');
    });  
}
}
  return (
    <>
       <div className="w-full px-10">
      <div className="max-w-[1220px] mx-auto py-5">
        <h3 className="text-[20px] font-semibold bg-slate-100 py-2 px-4 rounded-t-md border border-slate-400">
          {updatedid ? "Update faq" : "Add faq"}
          {/* Add faq */}
        </h3>
        <form autoComplete='off'
          className="p-3 border border-t-0 rounded-b-md border-slate-400"
          onSubmit={formSubmitHandler} 
        >
          {/* faq Name */}
          <div className="mb-5">
            <label className="block text-md font-medium text-gray-900">Question</label>
            <input
              type="text"
              name= "question"
              defaultValue={faqdetails.question}
              className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
              placeholder="Question"
            />
          </div>
          {/* faq ANSWER */}
           <div className="mb-5">
            <label className="block text-md font-medium text-gray-900">Answer</label>
            <input
              type="text"
              name= "answer"
              defaultValue={faqdetails.answer}
              className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-8 px-3"
              placeholder="Answer"
            />
          </div>
          {/* FAQ Order */}
          <div className="mb-5">
            <label className="block text-md font-medium text-gray-900">Order</label>
            <input
              type="number"
              name='order'
             defaultValue={faqdetails.order}

              className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
              placeholder="Enter Order"
            />
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="focus:outline-none my-10 text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
          >
            {updatedid ? "Update faq" : "Add faq"}
          </button>
        </form>
      </div>
    </div>
    </>
  )
}
