import React from 'react'
import type { GlobalMarketData } from '../StofexDashboard'




const GlobalCrypto = ({ globalData, isLoading } : { globalData: GlobalMarketData | null, isLoading: boolean }) => {
  return (
    <div>
      <h2>Global Cryptocurrency Data</h2>
     { isLoading && (<p>Loading...</p>)}
     { !isLoading && globalData && (
       <div className=''>
        <div>
            <h3>Market Data</h3>
        </div>
        {/* Grid templates */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
<div className='border'>
    Active Cryptocurrencies: {globalData.data.active_cryptocurrencies}
</div>
<div className='border'> Upcoming ICOs: {globalData.data.upcoming_icos}</div>
<div className='border'> Ongoing ICOs: {globalData.data.ongoing_icos}</div>
<div className='border'> Ended ICOs: {globalData.data.ended_icos}</div>


        </div>

         {/* <h3>Market Data</h3>
         <p>Active Cryptocurrencies: {globalData.data.active_cryptocurrencies}</p>
         <p>Upcoming ICOs: {globalData.data.upcoming_icos}</p>
         <p>Ongoing ICOs: {globalData.data.ongoing_icos}</p>
         <p>Ended ICOs: {globalData.data.ended_icos}</p>
         <p>Markets: {globalData.data.markets}</p>

         <h3>Total Market Cap</h3>
         <p>BTC: {globalData.data.total_market_cap.btc}</p>
         <p>ETH: {globalData.data.total_market_cap.eth}</p>
         <p>USDT: {globalData.data.total_market_cap.usdt}</p>
         <p>BNB: {globalData.data.total_market_cap.bnb}</p>
         <p>XRP: {globalData.data.total_market_cap.xrp}</p> */}
       </div>
     )}
    </div>
  )
}

export default GlobalCrypto