"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2 } from "lucide-react";

type Props = {
  portfolio: string[];
  updatePortfolio: (list: string[]) => void;
  selectedCoin: string;
  setSelectedCoin: (coin: string) => void;
};

export function PortfolioPanel({
  portfolio,
  updatePortfolio,
  selectedCoin,
  setSelectedCoin,
}: Props) {
  const [newCoin, setNewCoin] = useState("");

  const addCoin = () => {
    if (!newCoin.trim()) return;
    const updated = Array.from(new Set([newCoin, ...portfolio]));
    updatePortfolio(updated);
    setNewCoin("");
  };

  const removeCoin = (coin: string) => {
    const updated = portfolio.filter((c) => c !== coin);
    updatePortfolio(updated);
    if (selectedCoin === coin) setSelectedCoin("");
  };

  return (
    <motion.div
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="w-full md:w-1/4 bg-white shadow-lg rounded-2xl p-4 max-h-[500px] overflow-y-auto mb-6 md:mb-0"
    >
      <h2 className="text-lg font-semibold text-gray-800 mb-4">My Portfolio</h2>

      <div className="flex items-center mb-4">
        <input
          value={newCoin}
          onChange={(e) => setNewCoin(e.target.value)}
          placeholder="Add new coin"
          className="flex-1 p-2 border rounded-lg mr-2"
        />
        <button
          onClick={addCoin}
          className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          <Plus size={18} />
        </button>
      </div>

      {portfolio.length === 0 ? (
        <div className="text-gray-400 italic text-center">No coins added yet.</div>
      ) : (
        <ul className="space-y-2">
          {portfolio.map((coin) => (
            <li
              key={coin}
              className={`flex justify-between items-center border-b pb-1 ${
                selectedCoin === coin ? "text-blue-600 font-semibold" : "text-gray-700"
              } cursor-pointer hover:text-blue-500`}
              onClick={() => setSelectedCoin(coin)}
            >
              {coin}
              <Trash2
                size={16}
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  removeCoin(coin);
                }}
                className="text-red-400 hover:text-red-600"
              />
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}
