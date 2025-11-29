import React, { useEffect, useState } from 'react'
import Homeproduct from './Homeproduct'
import { toast } from 'react-toastify';
import axios from 'axios';

export default function Home() {
  const[menproducts,setmenproducts]= useState([]);
  const[womenproducts,setwomenproducts]= useState([]);

  useEffect(() => {
      axios.get('https://wscubetech.co/ecommerce-api/products.php', {
        params: {
          limit: '4',
          categories: 'mens-shoes'
          
        }
      })
        .then((result) => {
          setmenproducts(result.data.data)
        
  
        })
        .catch(() => {
          toast.error('somthing went wrong')
        })
    }, [ ]);

     useEffect(() => {
      axios.get('https://wscubetech.co/ecommerce-api/products.php', {
        params: {
          limit: '4',
          categories: 'tops',
          
        }
      })
        .then((result) => {
          setwomenproducts(result.data.data)
        
  
        })
        .catch(() => {
          toast.error('somthing went wrong')
        })
    }, []);
  
  return (
    <>
        <Homeproduct title = "Celebration wear for Men" description = "Welcome to Bagtesh Fashion Buy Indian Men's Ethnic suits, Tuxedos, Sherwanis, Nehru jacket, Jodhpurs pants, Blazers, Shirts and much more." products={menproducts}/>
        <Homeproduct title= "Celebration wear for Women" description = "Beautiful collection of Lehenga cholis, Sarees, Salwar suits for engagement, wedding and other ethnic occasions." products={womenproducts}/>

    </>
  )
}
