import React from 'react'
import { Outlet } from "react-router-dom"

const Booking = () => {
  return (
    <section className="booking mt-[7rem]">
      <Outlet />
    </section>
  )
}

export default Booking
