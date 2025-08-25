import React from 'react'
import { useLocation, useParams } from 'react-router'
import type { ApiData, Stocks } from '../StofexDashboard'
import axios from 'axios'

const DetailsPageStocks = ( ) => {

    const location = useLocation()
    const { clickedStock } = location.state as { clickedStock: ApiData }
    

    const [data, setData] = React.useState<ApiData | null>(null)
    const [isLoading, setIsLoading] = React.useState<boolean>(true)

    // const fetchStocksDetails =  async () => {
    //     try {
    //         setIsLoading(true)
    //         const response = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&apikey=${alphavantageApiKey}`)
    //         const data = response.data
    //         setData(data)
    //     } catch (error) {
    //         console.error(`Error fetching stock details about ${symbol}`, error)
    //     }finally {
    //         setIsLoading(false)
    //     }
    // }

  return (
    <div className=''>DetailsPageStocks
{clickedStock["Global Quote"]["01. symbol"]}
    </div>
  )
}

export default DetailsPageStocks