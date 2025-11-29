import React from 'react'
import Sidebar from '../cmmon/Sidebar'
import Header from '../cmmon/Header'
import Footer from '../cmmon/Footer'
// import { DashboardItems } from '../Pages/Dashboard'
import { Outlet } from 'react-router-dom'
import Breadcumb from '../cmmon/Breadcumb'
import { ToastContainer } from 'react-toastify'

export default function RootLayout() {
  return (
    <>
    <ToastContainer />
    <section className="w-full">
      <div className="grid grid-cols-[16.5%_auto]">
        <div>
          <Sidebar />
        </div>
        <div>
          <Header />
          <Breadcumb/>
          <Outlet />
          <Footer/>
        </div>
      </div>
    </section>
    </>
  )
}
