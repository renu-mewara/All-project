import React from 'react'
import Sidebar from '../cmmon/Sidebar'
import Header from '../cmmon/Header'
import Footer from '../cmmon/Footer'
// import { DashboardItems } from '../Pages/Dashboard'
import { Outlet } from 'react-router-dom'

export default function RootLayout() {
  return (
    <section className="w-full">
      <div className="grid grid-cols-[16.5%_auto]">
        <div>
          <Sidebar />
        </div>
        <div>
          <Header />
          <Outlet/>
          <Footer/>
        </div>
      </div>
    </section>
  )
}
