import React from 'react'

const Cards = ({
  inputValue,
  isLoading,
  coins,
  stocks
}: {
  inputValue: string,
  isLoading: boolean,
  coins: any[],
  stocks: any | null // Use 'any' if you don't have ApiData type
}) => {

  // Safely get dailyData if stocks and time series exist
  const dailyData =
    stocks && stocks["Time Series (Daily)"]
      ? Object.entries(stocks["Time Series (Daily)"])
      : []

  return (
    <div className='text-xl'>
      {isLoading && (
        <div className='flex items-center gap-2'>
          <span className='bg-transparent rounded-full w-8 border border-blue-800 animate-spin'> . </span>
          Loading...
        </div>
      )}

      {!isLoading && coins.length === 0 && <div>No results found</div>}

      {!isLoading && coins.length > 0 && (
        <div>
          {coins.map((coin) => (
            <div key={coin.id}>
              {coin.name}
              <span> Symbol: {coin.symbol}</span>
              <span> Rank: {coin.market_cap_rank}</span>
              <img src={coin.thumb} alt={coin.name} />
            </div>
          ))}
        </div>
      )}

      {/* Stocks */}
      <div>
        {!stocks || !stocks["Time Series (Daily)"] ? (
          <div>No Stocks data available!</div>
        ) : (
          <>
            <h2>{stocks["Meta Data"]["2. Symbol"]} Stock Data</h2>
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Open</th>
                  <th>High</th>
                  <th>Low</th>
                  <th>Close</th>
                  <th>Volume</th>
                </tr>
              </thead>
              <tbody>
                {dailyData.map(([date, data]: [string, any]) => (
                  <tr key={date}>
                    <td>{date}</td>
                    <td>{data["1. open"]}</td>
                    <td>{data["2. high"]}</td>
                    <td>{data["3. low"]}</td>
                    <td>{data["4. close"]}</td>
                    <td>{data["5. volume"]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  )
}

export default Cards