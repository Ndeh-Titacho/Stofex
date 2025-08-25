import { Moon, Sun, TrendingUp  } from 'lucide-react'
import axios from 'axios'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import type { ApiData, Coin, } from '../../pages/Dashboard/StofexDashboard'




const Navbar = ({ 
  isLoading,
  setIsLoading, 
  inputValue, 
  setInputValue, 
  isDark, 
  setIsDark, 
  setCoins,
  coins,
  stocks,
  setStocks
} : { 
  isLoading: boolean, 
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>, 
  inputValue: string, 
  setInputValue: React.Dispatch<React.SetStateAction<string>>,
  isDark: boolean, 
  setIsDark: React.Dispatch<React.SetStateAction<boolean>>,
  setCoins: React.Dispatch<React.SetStateAction<Coin[]>>,
  coins: Coin[],
  stocks: any | null,
  setStocks: React.Dispatch<React.SetStateAction<any | null>>
}) => {



  const alphavantageApiKey = import.meta.env.VITE_ALPHA_VANTAGE_API
  const navigate = useNavigate()

  //  // Safely get dailyData if stocks and time series exist
  // const dailyData =
  //   stocks && stocks["Global Quote"]
  //     ? Object.entries(stocks["Global Quote"])
  //     : []

  const globalStocks = stocks && stocks["Global Quote"]



  const toggleDarkMode = () => {
    setIsDark(!isDark)
  }

  

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
     if(inputValue.length > 0) {
       fetchData()
     } else {
       setCoins([])
       setStocks(null)
     }
    }, 300)

    return () => clearTimeout(delayDebounce)
  }, [inputValue])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const handleSelectionSuggestion = (coin: Coin) => {
    navigate(`/details/${coin.id}`, { state: {clickedCoin: coin}})
  }

  const handleSelectionSuggestionStocks = (stock: ApiData) => {
    navigate(`/details/stocks/${stock["Global Quote"]["01. symbol"]}`, { state: { clickedStock: stock } })
  }

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://api.coingecko.com/api/v3/search?query=${inputValue}`)
      const data = response.data.coins
      setCoins(data)
      console.log(data)

      const response1: any = await axios.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${inputValue}&apikey=${alphavantageApiKey}`)
      const data1 = response1.data
      setStocks(data1)
      console.log(data1)


     
    } catch (error) {
      console.error("Error fetching data:", error)
    }
    finally {
      setIsLoading(false)
    }
}

  return (
    <>
    {/* Desktop Layout */}
    <div className={`${ isDark ? "dark" : " "} hidden top-0 dark:bg-blue-950 bg-white text-black w-full  h-20 md:flex justify-around items-center border-b border-slate-50`}>
      <div className=' text-foreground flex justify-end gap-4  dark:text-white'>
        <span className='bg-blue-600 rounded-lg h-12 w-12 flex items-center justify-center text-white'><TrendingUp/></span>
        <div>
<h1 className='text-2xl font-bold tracking-wider'>STOFX</h1>
<p className='text-sm'>Enterprise Dashboard</p>
          </div>
          
      </div>
      <div>
        <input
          value={inputValue}
          onChange={(e) => handleInputChange(e)}
          onKeyDown={(e) => e.key === 'Enter' && fetchData()}
          placeholder='Search stocks and cryptocurrencies'
          className='h-12 w-xs text-sm md:w-md rounded-md text-black dark:text-white p-2 focus:outline-none border border-gray-200'
          type="text"
          name="search"
          id="Search"
        />
        {/* Show suggestion box only when user is typing */}
        {inputValue.length > 0 && (
          <div className='absolute z-10 left-1/2 -translate-x-1/2 mt-2 w-[300px] md:w-md bg-white dark:bg-blue-950 border rounded shadow-lg h-96 overflow-y-auto'>
            {isLoading && (<div className='loader p-4 text-center text-blue-600'>Loading...</div>)}
            {!isLoading && coins.length === 0 && stocks === null && (
              <div className='no-results p-4 text-center text-gray-500'>No results found</div>
            )}
            {!isLoading && coins.length > 0 && (
              <div className='results'>
                {coins.map((coin) => (
                  <div
                    key={coin.id}
                    onClick={() => handleSelectionSuggestion(coin)}
                    className='result-item flex items-center gap-3 p-3 border-b last:border-b-0 hover:bg-blue-100 dark:hover:bg-blue-900 cursor-pointer transition-colors'
                  >
                    <img src={coin.thumb || coin.image} alt={coin.name} className='w-8 h-8 rounded-full border' />
                    <div>
                      <h2 className='font-semibold text-base'>{coin.name}</h2>
                      <p className='text-xs text-gray-500 dark:text-gray-400'>{coin.symbol.toUpperCase()}</p>
                    </div>
                    <span className='ml-auto text-xs bg-blue-200 dark:bg-blue-800 px-2 py-1 rounded'>{coin.market_cap_rank ? `Rank #${coin.market_cap_rank}` : ''}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Styled Stocks suggestion */}
            {globalStocks && (
              <div className='results p-3'>
                <div className='flex items-center gap-3 border-b pb-3 mb-3' onClick={() => handleSelectionSuggestionStocks(globalStocks)}>
                  <span className='bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-3 py-2 rounded-full font-bold text-sm'>
                    {globalStocks["01. symbol"] || inputValue}
                  </span>
                  <div>
                    <h2 className='font-semibold text-base'>Stock Information</h2>
                    <p className='text-xs text-gray-500 dark:text-gray-400'>
                      Volume: <span className='font-bold text-blue-700 dark:text-blue-300'>${globalStocks["06. volume"]}</span>
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <div className={` ${isDark ? 'text-white' : 'text-black'}`}>
        <button onClick={toggleDarkMode} className='border rounded-sm p-2'>
          { isDark ? <Sun/> : <Moon/>}
        </button>
        
      </div>


    </div>

      {/* Mobile Layout */}
    <div className={`${ isDark ? "dark" : " "} md:hidden top-0 dark:bg-slate-900 bg-white text-black w-full h-35 border-b border-gray-200 `}>
      {/* Upper nav */}
      <div className='flex justify-between p-3'>
        {/* Upper left */}
        <div className=' flex ml-6 w-1/2'>
  <span className='flex justify-center items-center align-center mt-1 text-white bg-blue-500 mr-4 p-2 rounded-lg w-12 h-12 '><TrendingUp/></span>
        <div className='whitespace-nowrap dark:text-white'>
          <h1 className='text-2xl font-bold tracking-wider '>STOFX</h1>
          <p className='text-sm dark:text-gray-100'>Enterprise Dashboard</p>
        </div>
        </div>
        {/* Upper right */}
        <div className={` ${isDark ? 'text-white' : 'text-black'} flex items-center mr-5`}>
          <button onClick={toggleDarkMode}>
            { isDark ? <Sun/> : <Moon/>}
          </button>
        </div>
      </div>
      {/* Lower nav */}
      <div className='flex flex-col items-center relative'>
        <input
          value={inputValue}
          onChange={(e) => handleInputChange(e)}
          onKeyDown={(e) => e.key === 'Enter' && fetchData()}
          placeholder='Search stocks and cryptocurrencies...'
          className='h-12 w-96 mx-4 text-[16px] md:w-md rounded-lg text-black dark:text-white pl-4 py-3 border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
          type="text"
          name="search"
          id="Search"
        />

        {/* Show suggestion box only when user is typing */}
        {inputValue.length > 0 && (
          <div className='absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[95vw] max-w-md bg-white dark:bg-blue-950 border rounded shadow-lg h-80 overflow-y-auto z-20'>
            {isLoading && (<div className='loader p-4 text-center text-blue-600'>Loading...</div>)}
            {!isLoading && coins.length === 0 && stocks === null && (
              <div className='no-results p-4 text-center text-gray-500'>No results found</div>
            )}
            {!isLoading && coins.length > 0 && (
              <div className='results'>
                {coins.map((coin) => (
                  <div
                    key={coin.id}
                    onClick={() => handleSelectionSuggestion(coin)}
                    className='result-item flex items-center gap-3 p-3 border-b last:border-b-0 hover:bg-blue-100 dark:hover:bg-blue-900 cursor-pointer transition-colors'
                  >
                    <img src={coin.thumb || coin.image} alt={coin.name} className='w-8 h-8 rounded-full border' />
                    <div>
                      <h2 className='font-semibold text-base'>{coin.name}</h2>
                      <p className='text-xs text-gray-500 dark:text-gray-400'>{coin.symbol.toUpperCase()}</p>
                    </div>
                    <span className='ml-auto text-xs bg-blue-200 dark:bg-blue-800 px-2 py-1 rounded'>{coin.market_cap_rank ? `Rank #${coin.market_cap_rank}` : ''}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Styled Stocks suggestion */}
            {globalStocks && (
              <div className='results p-3'>
                <div className='flex items-center gap-3 border-b pb-3 mb-3'>
                  <span className='bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-3 py-2 rounded-full font-bold text-sm'>
                    {globalStocks["01. symbol"] || inputValue}
                  </span>
                  <div>
                    <h2 className='font-semibold text-base'>Stock Information</h2>
                    <p className='text-xs text-gray-500 dark:text-gray-400'>
                      Volume: <span className='font-bold text-blue-700 dark:text-blue-300'>${globalStocks["06. volume"]}</span>
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
    </>
  )
}

export default Navbar