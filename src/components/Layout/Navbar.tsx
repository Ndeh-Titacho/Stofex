
import { Moon, Sun, TrendingUp  } from 'lucide-react'
import axios from 'axios'
import { useEffect } from 'react'




const Navbar = ({ 
  isLoading,
  setIsLoading, 
  inputValue, 
  setInputValue, 
  isDark, 
  setIsDark, 
  setCoins,
  setStocks
} : { 
  isLoading: boolean, 
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>, 
  inputValue: string, 
  setInputValue: React.Dispatch<React.SetStateAction<string>>,
  isDark: boolean, 
  setIsDark: React.Dispatch<React.SetStateAction<boolean>>,
  setCoins: React.Dispatch<React.SetStateAction<any[]>>,
  setStocks: React.Dispatch<React.SetStateAction<any |null[]>>
}) => {



  const alphavantageApiKey = import.meta.env.VITE_ALPHA_VANTAGE_API
  const coingeckoApiKey = import.meta.env.VITE_COIN_GECKO_API



  const toggleDarkMode = () => {
    setIsDark(!isDark)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
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
        <span className='bg-blue-600 rounded-lg text-white'><TrendingUp/></span>
        <div>
<h1 className='text-2xl font-bold tracking-wider'>STOFX</h1>
<p className='text-sm'>Enterprise Dashboard</p>
          </div>
          
      </div>
      <div>
        <input value={inputValue} onChange={(e) => handleInputChange(e)} onKeyDown={(e) => e.key === 'Enter' && fetchData()} placeholder='Search stocks and cryptocurrencies' className='h-12 w-xs text-sm md:w-md rounded-md text-black dark:text-white p-2 focus:outline-none border border-gray-200' type="text" name="search" id="Search" />
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
      <div className='flex justify-center items-center'>
        <input value={inputValue} onChange={(e) => handleInputChange(e)} onKeyDown={(e) => e.key === 'Enter' && fetchData()} placeholder='Search stocks and cryptocurrencies...' 
        className='h-12 w-lg mx-4  text-[16px] md:w-md rounded-lg text-black dark:text-white pl-15 py-3 border border-gray-300  focus:outline-none 
    focus:border-blue-500 
    focus:ring-2 
    focus:ring-blue-500 
    focus:ring-opacity-50' type="text" name="search" id="Search" />

      </div>
    </div>
    </>
  )
}

export default Navbar