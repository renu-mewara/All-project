import React, { useState } from 'react'
import Header from './header'

export default function Home() {
    // var counter = 0;
    var [counter, setCounter] = useState(0);
    var count = () => {
        counter++;
        setCounter(counter);
        console.log(counter);
    }
  return (
    <>
    <Header/>
    <center>
        <button onClick={ count}>Click Me({ counter})</button>
    </center>
    </>
      
    
  )
}
