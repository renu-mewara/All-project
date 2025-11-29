// import firebase from 'firebase/compat/app'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function Playquiz() {
  const firebaseuser = localStorage.getItem('firebase_user')
      var navigate = useNavigate();

  useEffect(()=>{
    if(!firebaseuser){  
      toast.error('please login first') ;
       navigate('/login')

    }
  },[]);

  return (
    <>
    <ToastContainer/>
      
    </>
  )
}
