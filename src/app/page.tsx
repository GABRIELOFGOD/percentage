"use client";

import { useEffect, useState } from "react";
import { InputField } from "@/components/InputField";
import { ResultDisplay } from "@/components/ResultDisplay";
import { HistoryPanel } from "@/components/HistoryPanel";
import { CoinSelector } from "@/components/CoinSelector";
import { PortfolioPanel } from "@/components/PortfolioPanel";

const defaultCoins = ["Bitcoin", "Ethereum", "Solana", "Dogecoin"];

function formatNumber(value: string) {
  const numeric = value.replace(/,/g, "");
  const number = parseFloat(numeric);
  if (isNaN(number)) return "";
  return number.toLocaleString("en-US");
}

function parseNumber(value: string) {
  return parseFloat(value.replace(/,/g, ""));
}

export default function Home() {
  const [initial, setInitial] = useState("");
  const [later, setLater] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [diff, setDiff] = useState<number | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [portfolio, setPortfolio] = useState<string[]>([]);
  const [selectedCoin, setSelectedCoin] = useState<string>("");

  useEffect(() => {
    const saved = localStorage.getItem("portfolio");
    if (saved) {
      setPortfolio(JSON.parse(saved));
    } else {
      localStorage.setItem("portfolio", JSON.stringify(defaultCoins));
      setPortfolio(defaultCoins);
    }
  }, []);

  const updatePortfolio = (newList: string[]) => {
    setPortfolio(newList);
    localStorage.setItem("portfolio", JSON.stringify(newList));
  };

  const calculatePercentageChange = () => {
    const init = parseNumber(initial);
    const lat = parseNumber(later);

    if (!selectedCoin || isNaN(init) || isNaN(lat) || init === 0) {
      setResult("Invalid input");
      setDiff(null);
      return;
    }

    const percentage = ((lat - init) / init) * 100;
    const formatted = `${percentage >= 0 ? "+" : ""}${percentage.toFixed(2)}%`;

    setDiff(percentage);
    setResult(formatted);
    setHistory((prev) => [
      `${selectedCoin}: ${init.toLocaleString()} → ${lat.toLocaleString()} = ${formatted}`,
      ...prev,
    ]);
  };

  const clearHistory = () => setHistory([]);

  return (
    <main className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">
      <div className="flex flex-col md:flex-row items-start max-w-7xl w-full">
        <PortfolioPanel
          portfolio={portfolio}
          updatePortfolio={updatePortfolio}
          selectedCoin={selectedCoin}
          setSelectedCoin={setSelectedCoin}
        />

        <div className="bg-white shadow-lg rounded-2xl p-8 w-full md:w-2/3 mx-4">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Percentage Calculator
          </h1>

          <CoinSelector
            portfolio={portfolio}
            selectedCoin={selectedCoin}
            setSelectedCoin={setSelectedCoin}
          />

          <InputField
            label="Initial Value"
            value={initial}
            setValue={(val) => setInitial(formatNumber(val))}
            placeholder="e.g. 1,000"
          />
          <InputField
            label="Later Value"
            value={later}
            setValue={(val) => setLater(formatNumber(val))}
            placeholder="e.g. 1,500"
          />

          <button
            onClick={calculatePercentageChange}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition mt-2"
          >
            Calculate
          </button>

          <div className="mt-6">
            <ResultDisplay result={result} diff={diff} />
          </div>
        </div>

        <HistoryPanel history={history} clearHistory={clearHistory} />
      </div>
    </main>
  );
}
