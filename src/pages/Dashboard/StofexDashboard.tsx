import React from 'react'
import Cards from './components/Cards'
import { useState } from 'react'
import Navbar from '../../components/Layout/Navbar'

const StofexDashboard = () => {

  interface Coin {
    id: string;
    name: string;
    symbol: string;
    image: string;
    current_price: number;
    market_cap: number;
    total_supply: number;
  }

    const [isDark, setIsDark] = useState<boolean>(true)
    const [inputValue, setInputValue] = useState<string>('')
    const[isLoading,setIsLoading] = useState<boolean>(true)
    const[coins,setCoins] = useState<Coin[]>([])



  return (
    <div className='text-3xl'>
     
      <Navbar 
      isLoading={isLoading}
      setIsLoading={setIsLoading}
      inputValue={inputValue}
      setInputValue={setInputValue}
      isDark={isDark}
      setIsDark={setIsDark}
      setCoins={setCoins}
      />

      <Cards
      inputValue={inputValue}
      isLoading={isLoading}
      coins={coins}
      />

       StofexDashboard
    </div>
  )
}

export default StofexDashboard