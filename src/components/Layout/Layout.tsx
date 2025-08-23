import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router'

const Layout: React.FC = () => {
  return (
    <div>
     
     <main>
        <Outlet />
     </main>
    </div>
  )
}

export default Layout