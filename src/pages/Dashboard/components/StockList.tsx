import React, { use, useEffect } from 'react'
import type { Stocks } from '../StofexDashboard'
import axios from 'axios'
import { TrendingUp,TrendingDown } from 'lucide-react'

const StockList = ({
     stocksList, 
     setStocksList, 
     isLoading, 
     setIsLoading
     } : { 
    stocksList: Stocks[], 
    setStocksList: React.Dispatch<React.SetStateAction<Stocks[]>>, 
    isLoading: boolean, 
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}) => {

    const fetchStocks = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`https://www.alphavantage.co/query?function=REALTIME_BULK_QUOTES&symbol=MSFT,AAPL,IBM,TSLA&apikey=demo`);
            setStocksList(response.data.data);
            console.log("Fetched stocks:", response.data);
        } catch (error) {
            console.error('Error fetching stocks:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchStocks();
    }, []);

  return (
    <div>
        { isLoading && (<div>Loading stocks...</div>)}
        { !isLoading && stocksList.length === 0 && (<div>No stocks found.</div>)}
          { !isLoading && stocksList.length > 0 && (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4'>
                {stocksList.map((stock) => (
                    <div key={stock.symbol} className=' flex flex-col gap-10 p-8 border border-gray-400 shadow-md bg-white rounded-xl '>

                        <div className='flex justify-between items-center'>
                            <div className='flex gap-2 items-center'>
                               <span className='text-yellow-600 h-12 w-12 rounded-lg bg-yellow-400 flex items-center justify-center'><TrendingUp /></span>
                            <div>
                                <h1 className='font-bold'>{stock.symbol}</h1>
                                {/* <h4 className='text-gray-500 text-medium'>{stock.name}</h4> */}
                            </div>
                            </div>

                            <div>
                                <h4 className='border-2 border-yellow-600 text-yellow-600 text-sm font-semibold rounded-full py-1 px-3'>Stock</h4>
                            </div>
                        </div>
                    {/* Price */}
                        <div className='flex justify-between items-center '>
                            <p className='font-bold text-2xl'>${stock.close}</p>
                            <span className={`flex items-center gap-2 ${stock.change > 0 ? 'bg-green-200 text-green-600' : 'bg-red-200 text-red-600'} rounded-xl py-1 px-3`}>
                                {stock.change > 0 ? <TrendingUp /> : <TrendingDown />} {stock.change_percent}%
                            </span>
                        </div>

                        {/* Volume and Extended hour */}
                        <div className='flex justify-between items-center'>
                            {/* Volume */}
                            <div>
                                <h4 className='text-gray-500'>Volume</h4>
                                <p className='font-semibold'>${stock.volume}</p>
                            </div>
                            {/* Extended hours quote*/}
                            <div>
                                <h4 className='text-gray-500'>Extended Hr Quote</h4>
                                <p className='font-semibold text-left'>${stock.extended_hours_quote}</p>
                            </div>
                            <div></div>
                        </div>

                        {/* Extended hours Change */}
                        <div className='flex justify-between border-t border-gray-200 pt-2'>
                            <h4 className='text-gray-500'>Extended Hr Change</h4>
                            <p className={`font-semibold ${stock.extended_hours_change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {stock.extended_hours_change}%
                            </p>
                        </div>

                    </div>
                ))}
            </div>)}
    </div>
  )
}

export default StockList