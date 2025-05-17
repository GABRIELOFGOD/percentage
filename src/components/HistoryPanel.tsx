"use client";
import { motion } from "framer-motion";

type Props = {
  history: string[];
  clearHistory: () => void;
};

export function HistoryPanel({ history, clearHistory }: Props) {
  return (
    <motion.div
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 50, opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full md:w-1/3 bg-white shadow-lg rounded-2xl p-4 ml-0 md:ml-6 mt-6 md:mt-0 max-h-[500px] overflow-y-auto"
    >
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold text-gray-800">History</h2>
        {history.length > 0 && (
          <button
            onClick={clearHistory}
            className="text-sm text-red-500 hover:underline"
          >
            Clear
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="text-gray-400 italic mt-4 text-center">
          No calculations yet.
        </div>
      ) : (
        <ul className="space-y-2 text-sm text-gray-700">
          {history.map((entry, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="border-b pb-1"
            >
              {entry}
            </motion.li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}
