import React from "react";
import Cards from "./components/Cards";
import {useState, useEffect} from "react";
import Navbar from "../../components/Layout/Navbar";
import axios from "axios";
import GlobalCrypto from "./components/GlobalCrypto";
import { TrendingUp,ChartNoAxesCombined,TrendingDown   } from "lucide-react";
import CoinsList from "./components/CoinsList";
import StockList from "./components/StockList";

export interface Coin {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  market_cap: number;
  total_supply: number;
  price_change_percentage_24h: number;
  total_volume: number;
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

export interface GlobalMarketData {
  data: {
    active_cryptocurrencies: number;
    upcoming_icos: number;
    ongoing_icos: number;
    ended_icos: number;
    markets: number;
    total_market_cap: {
      btc: number;
      eth: number;
      usdt: number;
      bnb: number;
      xrp: number;
    };
  };
}

export interface Stocks {
     "symbol": string
     "timestamp": Date,
      "open": number,
      "high": number,
      "low": number,
      "close": number,
       "volume": number,
      "previous_close": number,
      "change": number,
      "change_percent": number,
      "extended_hours_quote": number,
      "extended_hours_change": number,
      "extended_hours_change_percent": number
  }


const StofexDashboard = () => {
  const [isDark, setIsDark] = useState<boolean>(true);
  const [inputValue, setInputValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [coins, setCoins] = useState<Coin[]>([]);
  const [stocks, setStocks] = useState<ApiData | null>(null);
  const [globalData, setGlobalData] = useState<GlobalMarketData | null>(null);
  const [coinsList, setCoinsList] = useState<Coin[]>([]);
  const [stocksList, setStocksList] = useState<Stocks[]>([]);

  useEffect(() => {
    const fetchGlobalData = async () => {
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/global`
        );
        const data = response.data;
        console.log("Global Market Data:", data);
        setGlobalData(data);
      } catch (error) {
        console.error("Error fetching global market data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGlobalData();

    document.body.style.backgroundColor = isDark ? 'rgb(24, 24, 27)' : 'rgb(243 244 246)';
  }, [isDark]);

  return (
    <div className={` ${isDark ? "dark" : " "} text-xl`}>
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

      {/* Global market data */}

      {globalData && globalData.data ? (
        <div className="p-4 dark:text-white text-black ">
        
          {/* Grid templates */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">

            {/* Active cryptocurrencies */}
            <div className="border border-gray-200 p-8 rounded-xl shadow-md dark:bg-[#1f2633] bg-white">
              <div className="flex justify-center gap-4">
                <span className="text-blue-600"><TrendingUp/></span>
                <h3 className="text-xl mb-3  dark:text-slate-300 font-semibold ">Active Cryptocurrencies</h3>
              </div>
              
              <span className="font-bold text-3xl flex justify-center items-center"> {globalData.data.active_cryptocurrencies}</span>
            </div>
            
            {/* Upcoming ICOs */}
            <div className="border border-gray-200 p-8 rounded-xl shadow-sm dark:bg-[#1f2633] bg-white">
              <div className="flex justify-center gap-4">
                <span className="text-amber-600"><ChartNoAxesCombined /></span>
                <h3 className="text-xl mb-3  dark:text-slate-300 font-semibold ">Upcoming ICOs</h3>
              </div>
              <span className="font-bold  text-3xl flex justify-center items-center"> {globalData.data.upcoming_icos}</span>
            </div>

            {/* Ongoing ICOs */}
            <div className="border border-gray-200  p-8 rounded-xl shadow-sm dark:bg-[#1f2633] bg-white">
              <div className="flex justify-center gap-4">
                <span className="text-blue-600"><ChartNoAxesCombined /></span>
                <h3 className="text-xl mb-3  dark:text-slate-300 font-semibold ">Ongoing ICOs</h3>
              </div>
              <span className="font-bold text-3xl flex justify-center items-center"> {globalData.data.ongoing_icos}</span>
            </div>

            {/* Ended ICOs */}
            <div className="border border-gray-200 p-8 rounded-xl shadow-sm dark:bg-[#1f2633] bg-white">
              <div className="flex justify-center gap-4">
                <span className="text-red-600"><TrendingDown /></span>
                <h3 className="text-xl mb-3  dark:text-slate-300 font-semibold ">Ended ICOs</h3>
              </div>
              <span className="font-bold text-3xl flex justify-center items-center"> {globalData.data.ended_icos}</span>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading global market data...</div>
      )}

      <Cards
        inputValue={inputValue}
        isLoading={isLoading}
        coins={coins}
        stocks={stocks}
      />

      {/* Global market cap and total volume */}

      <CoinsList coinsList={coinsList} setCoinsList={setCoinsList} isLoading={isLoading} setIsLoading={setIsLoading} />

      <StockList stocksList={stocksList} setStocksList={setStocksList} isLoading={isLoading} setIsLoading={setIsLoading} />

   
    </div>
  );
};
export default StofexDashboard;
