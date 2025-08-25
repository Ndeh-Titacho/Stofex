import React, { useEffect } from 'react'
import { useState } from 'react'
import type { ApexOptions } from 'apexcharts'
import Chart from 'react-apexcharts'

export interface PriceData {
  price: number
  timestamp: number
}

const CoinsLineChart = ({ isLoading, setIsLoading }:{ isLoading: boolean, setIsLoading: React.Dispatch<React.SetStateAction<boolean>> }) => {


  const [priceData, setPriceData] = useState<PriceData[]>([])
  const [error,setError] = useState<string | null>(null)

/*  ApexCharts Data */

const [series, setSeries] = useState<ApexOptions["series"]>([])
const [options, setOptions] = useState<ApexOptions>({
  chart: { type: "line", height: 350, dropShadow: { enabled: true, blur: 10, opacity: 0.2 } },
  stroke: { curve: "straight" },
  grid: { row: { colors: ["#e0e0e0", "#ffffff"], opacity: 0.5, } },
  xaxis: { categories: [] },
  yaxis: { labels: { formatter: (value) => `$${value}` } },
  tooltip: { x: { format: "dd MMM yyyy" } },
})

// Update chart data when priceData changes
useEffect(() => {
  setSeries([
    {
      name: "Price",
      data: priceData.map(data => data.price),
    },
  ])
  setOptions(prev => ({
    ...prev,
    xaxis: {
      ...prev.xaxis,
      categories: priceData.map(data =>
        new Date(data.timestamp).toLocaleDateString()
      ),
    },
  }))
}, [priceData])

  const coinId = "bitcoin"
  const vsCurrency = "usd"
  const days = 7

  const fetchChartsData  = async() => {
    try {
        setIsLoading(true)
        await new Promise(resolve => setTimeout(resolve, 1000))
          const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${vsCurrency}&days=${days}`)
        if(!response.ok ) {
          if(response.status === 429){
            setError("Rate limit exceeded, please try again later.")
          } else {
            setError("Failed to fetch chart data")
          }
          return 
        }
          const data = await response.json()
    console.log("Chart data:", data)
    const prices = data.prices.map((price: [number, number]) => ({
      price: price[1],
      timestamp: price[0]
    }))
    setPriceData(prices)
    } catch (error) {
      setError("Network error, please check you connection.")
        console.error("Error fetching chart data:", error)
    } finally {
        setIsLoading(false)
    }
  
  }

  useEffect(() => {
    fetchChartsData()
  }, [coinId, vsCurrency, days])

  return (
    <div className='mx-5'>
      <h2>Coins Line Chart (7 Days)</h2>
      {error && <div className='text-red-500 mb-2'>{error}</div>}
      <Chart options={options} series={series} type="line" height={350} />
    </div>
  )
}

export default CoinsLineChart