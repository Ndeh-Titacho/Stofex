import React, {useEffect,useState, type ReactNode} from  'react';
import { BrowserRouter as Router , Routes, Route } from 'react-router'
import NotFoundPage from './pages/NotFoundPage'
import Dashboard from './pages/Dashboard/StofexDashboard'
import  About  from './pages/About'
import Layout from './components/Layout/Layout';
import DetailsPage from './pages/DetailsPage';
import DetailsPageStocks from './pages/Dashboard/components/DetailsPageStocks';




const App: React.FC = () => {
 const [isDark, setIsDark] = useState<boolean>(false);
 

  return (
   
      <Router>
        <Routes>
          <Route path="/" element={<Layout />} >
          <Route index element={<Dashboard isDark={isDark} setIsDark={setIsDark} />} />
          <Route path="/about" element={<About />} />
          <Route path="/details/:id" element={<DetailsPage  />} />
          <Route path="/details/stocks/:symbol" element={<DetailsPageStocks />} />
          <Route path="/dashboard" element={<Dashboard isDark={isDark} setIsDark={setIsDark} />} />
          </Route>

           {/* catch all 404 routes */}
        <Route path="*" element={<NotFoundPage />} />
        </Routes>

       
      </Router>
    
  )
}

export default App
