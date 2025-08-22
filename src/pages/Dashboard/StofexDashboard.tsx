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

  interface TimeSeriesData {
  "1. open": string;
  "2. high": string;
  "3. low": string;
  "4. close": string;
  "5. volume": string;
}

interface ApiData {
  "Meta Data": {
    "1. Information": string;
    "2. Symbol": string;
    "3. Last Refreshed": string;
    "4. Output Size": string;
    "5. Time Zone": string;
  };
  "Time Series (Daily)": {
    [date: string]: TimeSeriesData;
  };
}

    const [isDark, setIsDark] = useState<boolean>(true)
    const [inputValue, setInputValue] = useState<string>('')
    const[isLoading,setIsLoading] = useState<boolean>(true)
    const[coins,setCoins] = useState<Coin[]>([])
    const[stocks,setStocks] = useState<ApiData | null>(null)



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
      setStocks={setStocks}
      />

      <Cards
      inputValue={inputValue}
      isLoading={isLoading}
      coins={coins}
      stocks={stocks}
      />

       StofexDashboard
    </div>
  )
}

export default StofexDashboard