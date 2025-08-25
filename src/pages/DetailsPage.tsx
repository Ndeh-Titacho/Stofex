import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router'
import type { Coin } from './Dashboard/StofexDashboard'
import axios from 'axios'
import { Link } from 'react-router-dom'

interface Links {
  homepage: string[]
  repos_url: {
    github: string[]
  }
}

interface CurrencyData {
  aed: number
  [key: string]: number
}

interface MarketData {
  current_price: CurrencyData
  market_cap: CurrencyData
  price_change_24h_in_currency: CurrencyData
  price_change_percentage_24h_in_currency: CurrencyData
}

interface coinData {
  description: {
    en: string
  }
  links: Links
  market_data: MarketData
}

const DetailsPage = () => {
  const location = useLocation()
  const { clickedCoin } = location.state as { clickedCoin: Coin }
  const { id } = useParams<{ id: string }>()

  const [data, setData] = useState<coinData>()
  const [loading, setLoading] = useState<boolean>(true)

  const fetchDetails = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`)
      setData(response.data)
    } catch (error) {
      console.error(`Error fetching details about ${id}`, error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDetails()
    // eslint-disable-next-line
  }, [])

  const homepageUrl = data?.links?.homepage[0]
  const githubUrl = data?.links?.repos_url?.github[0]
  const currentPriceAed = data?.market_data?.current_price?.aed
  const marketCapAed = data?.market_data?.market_cap?.aed
  const priceChange24hAed = data?.market_data?.price_change_24h_in_currency?.aed
  const priceChangePercentage24hAed = data?.market_data?.price_change_percentage_24h_in_currency?.aed

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-blue-950 dark:via-blue-900 dark:to-blue-800 py-10 px-4">
        <Link 
        to='/'
        className='text-blue-600 hover:underline'
        >Back to Dashboard</Link>
      <div className="max-w-3xl mx-auto bg-white dark:bg-blue-950 rounded-xl shadow-lg p-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mb-4"></div>
            <span className="text-blue-600 font-semibold">Loading details...</span>
          </div>
        ) : (
          <>
            <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
              <img
                src={clickedCoin.thumb || clickedCoin.image}
                alt={clickedCoin.name}
                className="w-24 h-24 rounded-full border-4 border-blue-200 dark:border-blue-800 shadow"
              />
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-blue-700 dark:text-blue-200 mb-2">{clickedCoin.name}</h1>
                <div className="flex items-center gap-4">
                  <span className="text-lg font-semibold bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-3 py-1 rounded">
                    {clickedCoin.symbol.toUpperCase()}
                  </span>
                  <span className="text-sm bg-gray-100 dark:bg-blue-900 text-gray-600 dark:text-gray-300 px-2 py-1 rounded">
                    Rank #{clickedCoin.market_cap_rank}
                  </span>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-300 mb-2">Description</h2>
              {data?.description?.en ? (
                <p className="text-gray-700 dark:text-gray-200 leading-relaxed">{data.description.en}</p>
              ) : (
                <p className="text-gray-400">No description available.</p>
              )}
            </div>

            <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-4">
                <h3 className="font-semibold text-blue-700 dark:text-blue-200 mb-2">Market Data (AED)</h3>
                <ul className="space-y-1 text-gray-700 dark:text-gray-200">
                  <li>
                    <span className="font-semibold">Current Price:</span>{" "}
                    {currentPriceAed ? `AED ${currentPriceAed.toLocaleString()}` : "N/A"}
                  </li>
                  <li>
                    <span className="font-semibold">Market Cap:</span>{" "}
                    {marketCapAed ? `AED ${marketCapAed.toLocaleString()}` : "N/A"}
                  </li>
                  <li>
                    <span className="font-semibold">Price Change (24h):</span>{" "}
                    {priceChange24hAed ? `AED ${priceChange24hAed.toLocaleString()}` : "N/A"}
                  </li>
                  <li>
                    <span className="font-semibold">Price Change % (24h):</span>{" "}
                    {priceChangePercentage24hAed ? `${priceChangePercentage24hAed.toFixed(2)}%` : "N/A"}
                  </li>
                </ul>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-4 flex flex-col gap-2">
                <h3 className="font-semibold text-blue-700 dark:text-blue-200 mb-2">Links</h3>
                {homepageUrl ? (
                  <a
                    href={homepageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-blue-600 dark:text-blue-300 hover:underline font-medium"
                  >
                    Visit Homepage
                  </a>
                ) : (
                  <span className="text-gray-400">No homepage available.</span>
                )}
                {githubUrl ? (
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-blue-600 dark:text-blue-300 hover:underline font-medium"
                  >
                    View on GitHub
                  </a>
                ) : (
                  <span className="text-gray-400">No GitHub link available.</span>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default DetailsPage