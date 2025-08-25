import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import type { Coin } from "../StofexDashboard";

interface CoinsListProps {
  coinsList: Coin[];
  setCoinsList: React.Dispatch<React.SetStateAction<Coin[]>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isDark?: boolean;
}

const CoinsList: React.FC<CoinsListProps> = ({
  coinsList,
  setCoinsList,
  isLoading,
  setIsLoading,
  isDark = false,
}) => {
  return (
    <div
      className={`p-2 md:p-4 ${
        isLoading ? "" : "min-h-[300px]"
      } ${isDark ? "bg-gradient-to-br from-[#23263a] to-[#1a2236] text-slate-200" : "bg-white text-black"} rounded-xl shadow-md border ${
        isDark ? "border-[#23263a]" : "border-gray-200"
      } transition-colors duration-300`}
    >
      <h2 className="text-xl md:text-2xl font-bold mb-4 text-center">Coins List</h2>
      {isLoading ? (
        <div className="text-center text-blue-500 dark:text-blue-300 py-8">Loading...</div>
      ) : coinsList.length === 0 ? (
        <div className="text-center text-gray-500 py-8">No Results found</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {coinsList.map((coin) => (
            <div
              key={coin.id}
              className={`rounded-lg p-4 shadow hover:shadow-lg transition-all flex flex-col gap-2 ${
                isDark
                  ? "bg-gradient-to-br from-[#23263a] to-[#1a2236] border border-[#23263a]"
                  : "bg-white border border-gray-200"
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <img
                  src={coin.thumb || coin.image}
                  alt={coin.name}
                  className="w-10 h-10 rounded-full border"
                />
                <div>
                  <h3 className="font-semibold text-base md:text-lg">{coin.name}</h3>
                  <p className="text-xs text-gray-400 dark:text-gray-300">
                    {coin.symbol.toUpperCase()}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-1 text-sm">
                <span className="font-medium">
                  Price:{" "}
                  <span className="text-blue-600 dark:text-blue-300">
                    ${coin.current_price}
                  </span>
                </span>
                <span>
                  Market Cap:{" "}
                  <span className="font-semibold">
                    ${coin.market_cap.toLocaleString()}
                  </span>
                </span>
                <span>
                  Rank:{" "}
                  <span className="bg-blue-100 dark:bg-blue-900 px-2 py-0.5 rounded text-xs">
                    #{coin.market_cap_rank}
                  </span>
                </span>
                <span>
                  24h Change:{" "}
                  <span
                    className={
                      coin.price_change_percentage_24h > 0
                        ? "text-green-500"
                        : "text-red-500"
                    }
                  >
                    {coin.price_change_percentage_24h}%
                  </span>
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CoinsList;