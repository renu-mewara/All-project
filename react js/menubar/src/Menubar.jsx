import React, { useState } from 'react'
import { IoIosMenu } from "react-icons/io";


export default function Menubar() {
  var [menu, setMenu] = useState(false)
  return (
    <>
    <button className='click' onClick = {()=>{
      setMenu(true)
    }}><IoIosMenu />
</button>
    <div className = {`bar  ${menu ? 'showbar' : ' '}`}>
      <span onClick={()=>{
        setMenu(false)
      }}>&times;</span>
      <h2>My Sidebar</h2>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Services</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </div>
    
      
    </>
  )
}
