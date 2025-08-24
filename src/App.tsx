import React, {useEffect, type ReactNode} from  'react';
import { BrowserRouter as Router , Routes, Route } from 'react-router'
import NotFoundPage from './pages/NotFoundPage'
import Dashboard from './pages/Dashboard/StofexDashboard'
import  About  from './pages/About'
import Layout from './components/Layout/Layout';
import DetailsPage from './pages/DetailsPage';




const App: React.FC = () => {

 

  return (
   
      <Router>
        <Routes>
          <Route path="/" element={<Layout />} >
          <Route index element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/details/:id" element={<DetailsPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          </Route>

           {/* catch all 404 routes */}
        <Route path="*" element={<NotFoundPage />} />
        </Routes>

       
      </Router>
    
  )
}

export default App
