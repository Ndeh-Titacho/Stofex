import React from "react";
import type { Stocks } from "../StofexDashboard";

interface StockListProps {
  stocksList: Stocks[];
  setStocksList: React.Dispatch<React.SetStateAction<Stocks[]>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isDark?: boolean;
}

const StockList: React.FC<StockListProps> = ({
  stocksList,
  setStocksList,
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
      <h2 className="text-xl md:text-2xl font-bold mb-4 text-center">Stocks List</h2>
      {isLoading ? (
        <div className="text-center text-blue-500 dark:text-blue-300 py-8">Loading...</div>
      ) : stocksList.length === 0 ? (
        <div className="text-center text-gray-500 py-8">No Results found</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {stocksList.map((stock) => (
            <div
              key={stock.symbol}
              className={`rounded-lg p-4 shadow hover:shadow-lg transition-all flex flex-col gap-2 ${
                isDark
                  ? "bg-gradient-to-br from-[#23263a] to-[#1a2236] border border-[#23263a]"
                  : "bg-white border border-gray-200"
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div>
                  <h3 className="font-semibold text-base md:text-lg">{stock.symbol}</h3>
                  <p className="text-xs text-gray-400 dark:text-gray-300">
                    {stock.timestamp.toString()}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-1 text-sm">
                <span className="font-medium">
                  Open: <span className="text-blue-600 dark:text-blue-300">${stock.open}</span>
                </span>
                <span>
                  High: <span className="font-semibold">${stock.high}</span>
                </span>
                <span>
                  Low: <span className="font-semibold">${stock.low}</span>
                </span>
                <span>
                  Close: <span className="font-semibold">${stock.close}</span>
                </span>
                <span>
                  Volume: <span className="bg-blue-100 dark:bg-blue-900 px-2 py-0.5 rounded text-xs">{stock.volume}</span>
                </span>
                <span>
                  Change: <span className={stock.change_percent > 0 ? 'text-green-500' : 'text-red-500'}>{stock.change_percent}%</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StockList;