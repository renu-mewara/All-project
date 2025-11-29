import React from 'react'
import Card from 'react-bootstrap/Card';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Aboutus from './Aboutus';
import Homepage from './Homepage';
import Productlisting from './Productlisting';


export default function Product({type , data}) {
  return (
    <>
       <div className= { type== 1 ? 'col-md-3 ' : 'col-md-4' }>
                    <Card >
                     <Card.Img src={data.image} />
                         <Card.Body>
                             <Card.Title>{data.name}</Card.Title>
                                 <Card.Text>
                                          Rs.{data.price}
                                </Card.Text>

                        </Card.Body>
                    </Card>

        </div>
    </>
  )
}
