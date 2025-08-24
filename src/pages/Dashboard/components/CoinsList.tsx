import React from 'react'
import {useState, useEffect} from 'react'
import type { Coin } from '../StofexDashboard'
import axios from 'axios'
import { TrendingUp,TrendingDown } from 'lucide-react'



const CoinsList = ( {setIsLoading, setCoinsList, coinsList, isLoading} : { 
    isLoading: boolean,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>, 
    setCoinsList: React.Dispatch<React.SetStateAction<Coin[]>>
    coinsList: Coin[] 
}) => {

const fetchCoins = async () => {
    try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets/?vs_currency=usd&page=1&per_page=4')
        const data = response.data
        console.log("coins List ",data)
        setCoinsList(data)

    } catch (error) {
        console.error("Error fetching coins:", error)
    } finally {
        setIsLoading(false)
    }

}

useEffect(()=>{
    fetchCoins()
},[])

  return (
    <div>
        { isLoading && (<div> Loading... </div>)}
        { !isLoading && coinsList.length === 0 && (<div> No Results found</div>)}
        { !isLoading && coinsList.length > 0 && (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4'>
                {coinsList.map((coin) => (
                    <div key={coin.id} className=' flex flex-col gap-10 p-8 border border-gray-400 shadow-md bg-white rounded-xl '>
                        
                        <div className='flex justify-between items-center'>
                            <div className='flex gap-2 items-center'>
                               <img src={coin.image} alt={coin.name} width={50} />
                            <div>
                                <h1 className='font-bold'>{coin.symbol.toUpperCase()}</h1>
                                <h4 className='text-gray-500 text-medium'>{coin.name}</h4>
                            </div>
                            </div>

                            <div>
                                <h4 className='border-2 border-blue-600 text-blue-600 text-sm font-semibold rounded-full py-1 px-3'>Crypto</h4>
                            </div>
                        </div>
                    {/* Price */}
                        <div className='flex justify-between items-center '>
                            <p className='font-bold text-2xl'>${coin.current_price}</p>
                            <span className={`flex items-center gap-2 ${coin.price_change_percentage_24h > 0 ? 'bg-green-200 text-green-600' : 'bg-red-200 text-red-600'} rounded-xl py-1 px-3`}>
                                {coin.price_change_percentage_24h > 0 ? <TrendingUp /> : <TrendingDown />} {coin.price_change_percentage_24h}%
                            </span>
                        </div>

                        {/* Market Cap and Volume */}
                        <div className='flex justify-between items-center'>
                            {/* Market cap */}
                            <div>
                                <h4 className='text-gray-500'>Market Cap</h4>
                                <p className='font-semibold'>${coin.market_cap}</p>
                            </div>
                            {/* 24h Volume */}
                            <div>
                                <h4 className='text-gray-500'>Volume</h4>
                                <p className='font-semibold'>${coin.total_volume}</p>
                            </div>
                            <div></div>
                        </div>

                        {/* 24h Price Change */}
                        <div className='flex justify-between border-t border-gray-200 pt-2'>
                            <h4 className='text-gray-500'>24h Price Change</h4>
                            <p className={`font-semibold ${coin.price_change_percentage_24h > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {coin.price_change_percentage_24h}%
                            </p>
                        </div>

                    </div>
                ))}
            </div>)}

    </div>
  )
}

export default CoinsList