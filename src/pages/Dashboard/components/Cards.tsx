import { Divide } from 'lucide-react'
import React from 'react'

const Cards = ( { 
    inputValue, 
    isLoading, 
    coins
} : { 
    inputValue: string,
    isLoading: boolean,
    coins: any[]
}
) => {
  return (
    <div className='text-xl'>
        { isLoading && ( <div className='flex items-center gap-2'> <span className='bg-transparent rounded-full w-8 border border-blue-800 animate-spin'> . </span> Loading...</div>) }
        { !isLoading && coins.length === 0 && ( <div>No results found</div>) }
        { !isLoading && coins.length > 0 &&
         (
             <div>{ coins.map((coin) => (
                <div key={coin.id}>{coin.name}
                <span> Symbol: {coin.symbol}</span>
                <span> Price: {coin.market_cap_rank}</span>
<img src={coin.thumb} alt={coin.name} />
</div>
             ))}</div>
         )}
    </div>
  )
}

export default Cards