import React, { useEffect, useState } from 'react'
import Header from './Header'
import Bestselling from './Bestselling'
import Trending from './Trending'
import axios from 'axios'

export default function Homepage() {
  var[data,setData] = useState([])
  useEffect(()=>{
    axios.get('https://wscubetech.co/ecommerce-api/products.php?limit=12')
    .then((result)=>{
        setData(result.data.data)
    })
    .catch(()=>{

    })
  },[])
    
  return (
    <>
    
    <Bestselling prodactdata ={data}/>
    <Trending prodactdata ={data}/>
      
    </>
  )
}
