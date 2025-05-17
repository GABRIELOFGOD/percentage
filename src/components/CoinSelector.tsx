type Props = {
  portfolio: string[];
  selectedCoin: string;
  setSelectedCoin: (coin: string) => void;
};

export function CoinSelector({ portfolio, selectedCoin, setSelectedCoin }: Props) {
  return (
    <div className="mb-4">
      <label className="block mb-1 font-medium text-gray-700">Select Coin</label>
      <select
        value={selectedCoin}
        onChange={(e) => setSelectedCoin(e.target.value)}
        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="">-- Choose Coin --</option>
        {portfolio.map((coin) => (
          <option key={coin} value={coin}>
            {coin}
          </option>
        ))}
      </select>
    </div>
  );
}
