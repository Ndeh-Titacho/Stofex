import React from 'react'
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <div className='text-3xl font-bold'>404</div>
      <p>Oops! Page not found</p>
      <Link to="/" className='text-blue-400 text-underline'>Return to Home</Link>
    </div>
  )
}

export default NotFoundPage