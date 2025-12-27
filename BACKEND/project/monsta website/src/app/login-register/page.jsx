"use client";
import React, { use, useState } from 'react'
import "./login-register.css"
import axios from 'axios';
import Cookies from "js-cookie";
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

export default function page() {
    console.log(process.env.NEXT_PUBLIC_API_URL);

    const [registerloading, setRegisterloading] = useState(false);
        const [loginloading, setloginloading] = useState(false);
        const router = useRouter();



    const register = (e) => {
        e.preventDefault();
        setRegisterloading(true);
        axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/register`,{
            email: e.target.email.value,
            password: e.target.password.value
        }) 
        .then(result => {
            if(result.data._status === true){
                toast.success(result.data._message);
                setRegisterloading(false);
                Cookies.set('user_login', result.data._token);
            }else{
                toast.error(result.data._message);
                setRegisterloading(false);
            }
        })
        .catch(error => {
            toast.error("Registration failed");
            setRegisterloading(false);
        }); 
    } 
    const login = (e) => {
        e.preventDefault();
        setloginloading(true);
        axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/login`,{
            email: e.target.email.value,
            password: e.target.password.value
        }) 
        .then(result => {
            if(result.data._status === true){
                toast.success(result.data._message);
                setloginloading(false);
                Cookies.set('user_login', result.data._token);
                router.push('/');
            }else{
                toast.error(result.data._message);
                setloginloading(false);
            }
        })
        .catch(error => {
            toast.error("Registration failed");
            setloginloading(false);
        }); 
    } 
  return (
    <div> 
    <div className="breadcrumbs_area">
        <div className="container">   
            <div className="row">
                <div className="col-12">
                    <div className="breadcrumb_content">
                        <h3>My account</h3>
                        <ul>
                            <li><a href="index.html">home</a></li>
                            <li> {">"}</li>
                            <li>My account</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>         
    </div>

    <div className="customer_login">
        <div className="container">
            <div className="row">
               
                <div className="col-lg-6 col-md-6">
                    <div className="account_form">
                        <h2>login</h2>
                        <form onSubmit={login}>
                            <p>   
                                <label>Username or email <span>*</span></label>
                                <input type="text" name='email'/>
                             </p>
                             <p>   
                                <label>Passwords <span>*</span></label>
                                <input type="password" name='password'/>
                             </p>   
                            <div className="login_submit">
                               <a href="#">Lost your password?</a>
                                <label htmlFor="remember">
                                    <input id="remember" type="checkbox"/>
                                    Remember me
                                </label>
                                <button type="submit" disabled=
                                {loginloading ? 'disabled' : ''}
                                >
                                    {loginloading ? 'Loading...' : 'login'}
                                </button>                
                            </div>
                        </form>
                     </div>    
                </div>
                
                <div className="col-lg-6 col-md-6">
                    <div className="account_form register">
                        <h2>Register</h2>
                        <form onSubmit={register}>
                            <p>   
                                <label>Email address  <span>*</span></label>
                                <input type="text" name='email' required/>
                             </p>
                             <p>   
                                <label>Passwords <span>*</span></label>
                                <input type="password" name='password' required/>
                             </p>
                            <div className="login_submit">
                                <button type="submit" disabled=
                                {registerloading ? 'disabled' : ''}
                                >
                                    {registerloading ? 'Loading...' : 'Register'}
                                </button>
                            </div>
                        </form>
                    </div>    
                </div>
                
            </div>
        </div>    
    </div>
    
    </div>
  )
}
