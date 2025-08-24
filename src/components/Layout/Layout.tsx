import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router'

const Layout: React.FC = () => {
  return (
    <div  className='dark:bg-gray-800'>

     <main>
        <Outlet />
     </main>
    </div>
  )
}

export default Layout