import React, { useState } from 'react'
import Product from './product'

export default function Bestselling( {prodactdata}) {
    var [product,setProduct]= useState([1,2,3,4,5,6,7,8])
  return (
    <>
    <div className='container-fluid '>
        <div className='container'>
            <div className='row text-center py-4'>
                <div className='col-12'>
                    <h1>Bestselling Products</h1>
                </div>
            </div>
             <div className='row row-gap-3'>
                {
                    prodactdata.map(( v,i)=>{
                         return <Product type ="1" key={i} data={v}/>
                    })
                }
            
            </div>
        </div>
    </div>
      
    </>
  )
}
