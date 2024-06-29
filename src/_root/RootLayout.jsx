import React from 'react'
import { Outlet } from 'react-router-dom'
import '../../Utils/admin.css'

const RootLayout = () => {
  return (
    <div>
      <section>
        <Outlet />
      </section>
    </div>
  )
}

export default RootLayout
