
import { Moon, Sun } from 'lucide-react'
import axios from 'axios'


const Navbar = ({ 
  isLoading,
  setIsLoading, 
  inputValue, 
  setInputValue, 
  isDark, 
  setIsDark, 
  setCoins
} : { 
  isLoading: boolean, 
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>, 
  inputValue: string, 
  setInputValue: React.Dispatch<React.SetStateAction<string>>,
  isDark: boolean, 
  setIsDark: React.Dispatch<React.SetStateAction<boolean>>,
  setCoins: React.Dispatch<React.SetStateAction<any[]>>
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
      const response1 = await axios.get(`https://api.coingecko.com/api/v3/search?query=${inputValue}`)
      const data = response1.data.coins
      setCoins(data)
      console.log(data)

     
    } catch (error) {
      console.error("Error fetching data:", error)
    }
    finally {
      setIsLoading(false)
    }
}

  return (
    <>
    <div className={`${ isDark ? "dark" : " "} top-0 dark:bg-blue-950 bg-white text-black w-full border h-20 flex justify-around items-center`}>
      <div className=' text-2xl font-bold  dark:text-white text-black'>Stofex</div>
      <div>
        <input value={inputValue} onChange={(e) => handleInputChange(e)} onKeyDown={(e) => e.key === 'Enter' && fetchData()} placeholder='Search...' className='h-12 w-xs md:w-md rounded-md text-black dark:text-white p-2 focus:outline-none border border-gray-200' type="text" name="search" id="Search" />
      </div>
      <div className={` ${isDark ? 'text-white' : 'text-black'}`}>
        <button onClick={toggleDarkMode}>
          { isDark ? <Sun/> : <Moon/>}
        </button>
        
      </div>
    </div>
    </>
  )
}

export default Navbar