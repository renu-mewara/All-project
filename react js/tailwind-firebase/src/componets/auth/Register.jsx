import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";




export default function Register() {
  const [isloading, setisloading] = useState(false);
  const [googlelogin, setgooglelogin] = useState(false);
   const firebaseuser = localStorage.getItem('firebase_user')
          var navigate = useNavigate();
              const provider = new GoogleAuthProvider();
          
    
           useEffect(()=>{
              if(firebaseuser){ 
                 navigate('/')
          
              }
            },[]);

  const register = (e) => {
    setisloading(true);
    e.preventDefault();
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, e.target.email.value, e.target.password.value)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        console.log(user.uid)
        localStorage.setItem('firebase_user',user.uid)
        // ...
        setisloading(false);
        toast.success('account register sucessfully!')
        navigate('/')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        setisloading(false);
        toast.error(errorMessage)

      });

  }

    const logingoogle = ()=>{
                  setgooglelogin(true);
                   const auth = getAuth();
          signInWithPopup(auth, provider)
              .then((result) => {
                  // This gives you a Google Access Token. You can use it to access the Google API.
                  const credential = GoogleAuthProvider.credentialFromResult(result);
                  const token = credential.accessToken;
                  // The signed-in user info.
                  const user = result.user;
  
                  console.log(user);
                  // IdP data available using getAdditionalUserInfo(result)
  
                  localStorage.setItem('firebase_user', user.uid)
                  // ...
                  setgooglelogin(false);
                  toast.success('Login succussfully !')
                  navigate('/');
  
                  // ...
              }).catch((error) => {
                  // Handle Errors here.
                  const errorCode = error.code;
                  const errorMessage = error.message;
  
                  setgooglelogin(false);
                  toast.error(errorMessage);
                  // // The email of the user's account used.
                  // const email = error.customData.email;
                  // // The AuthCredential type that was used.
                  // const credential = GoogleAuthProvider.credentialFromError(error);
                  // // ...
              });
      }
  return (
    <>
    <ToastContainer/>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign up to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={register} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                  Password
                </label>

              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {
                  isloading
                    ?
                    <>
                      <svg className="mr-3 -ml-1 size-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Loading...
                    </>
                    :
                    'sign up'
                }

              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            alredy number?{' '}
            <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
              login your account
            </Link>
          </p>

           <div >
                            <button
                                type="button" onClick={logingoogle}
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                {
                                    googlelogin
                                        ?
                                        <>
                                            <svg className="mr-3 -ml-1 size-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Loading...
                                        </>
                                        :
                                        'login with google account'
                                }

                            </button>
                        </div>

        </div>
      </div>
    </>
  )
}
