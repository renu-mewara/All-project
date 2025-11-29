import React from 'react'


export default function Dashboard() {
  return (
    <>
      <script src="https://cdn.tailwindcss.com"></script>

<div class="w-full min-h-[610px] max-w-[1220px] ml-5 py-8 " >
  
  <div className=' grid-cols-3 gap-5'>
    <button class=" px-30 py-25 bg-emerald-500 shadow-lg shadow-emerald-500/50 rounded text-white my-5">Emerald color</button>
    <button class="px-30 py-25 bg-blue-500 shadow-lg shadow-blue-500/50 rounded text-white mx-8">Blue color</button>
    <button class="px-30 py-25 bg-amber-500 shadow-lg shadow-amber-500/50 rounded text-white mx-auto  ">Amber color</button>
    <button class="px-30 py-25 bg-pink-500 shadow-lg shadow-pink-500/50 rounded text-white top-5">pink color</button>
    
  </div>
</div>
    </>
  )
}