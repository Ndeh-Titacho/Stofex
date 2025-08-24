import React, { use, useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import type { ApexOptions } from 'apexcharts'
import Chart from 'react-apexcharts'


export interface TimeSeriesData {
  "1. open": string;
  "2. high": string;
  "3. low": string;
  "4. close": string;
  "5. volume": string;
}

export interface StocksApiData {
  "Meta Data": {
    "1. Information": string;
    "2. Symbol": string;
    "3. Last Refreshed": string;
    "4. Output Size": string;
    "5. Time Zone": string;
  };
  "Weekly Time Series": {
    [date: string]: TimeSeriesData;
  };
}

const StocksLineChart = ({ isLoading, setIsLoading }: { isLoading: boolean, setIsLoading: React.Dispatch<React.SetStateAction<boolean>> }) => {

   const [stocksData, setStocksData] = useState<StocksApiData | null>(null)

   const [series, setSeries] = useState<ApexOptions["series"]>([])
   const [options, setOptions] = useState<ApexOptions>({
     chart: { type: "line", height: 350, dropShadow: { enabled: true, blur: 10, opacity: 0.2 }, zoom: { enabled: true ,autoScaleYaxis: true } },
     stroke: { curve: "smooth" },
     grid: { row: { colors: ["#e0e0e0", "#ffffff"], opacity: 0.5, } },
     xaxis: { categories: [] },
     yaxis: { labels: { formatter: (value) => `$${value}` } },
     tooltip: { x: { format: "dd MMM yyyy" } },
   })

   const fetchStocksData = async () => {
     setIsLoading(true);
     try {
       const response = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=IBM&apikey=demo`);
       const data = response.data;
       setStocksData(data);
       console.log("Fetched stocks data:", data);
     } catch (error) {
       console.error("Error fetching stocks data:", error);
     } finally {
       setIsLoading(false);
     }
   };

   useEffect(() => {
     fetchStocksData();
   }, []);

   useEffect(() => {
     if (stocksData && stocksData["Weekly Time Series"]) {
       const categories = Object.keys(stocksData["Weekly Time Series"])
       const seriesData = [
         {
           name: "Open",
           data: categories.map(date => Number(stocksData["Weekly Time Series"][date]["1. open"]))
         },
         {
           name: "High",
           data: categories.map(date => Number(stocksData["Weekly Time Series"][date]["2. high"]))
         },
         {
           name: "Low",
           data: categories.map(date => Number(stocksData["Weekly Time Series"][date]["3. low"]))
         },
         {
           name: "Close",
           data: categories.map(date => Number(stocksData["Weekly Time Series"][date]["4. close"]))
         },
         {
           name: "Volume",
           data: categories.map(date => Number(stocksData["Weekly Time Series"][date]["5. volume"]))
         }
       ]
       setSeries(seriesData)
       setOptions(prev => ({
         ...prev,
         xaxis: { categories }
       }))
     }
   }, [stocksData]);

   return (
    <div className='mx-5'>
        <h2>Stocks Line Chart (Weekly)</h2>
      <Chart options={options} series={series} type="line" height={350} />
    </div>
  )
}

export default StocksLineChart