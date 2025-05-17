"use client";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  result: string | null;
  diff: number | null;
};

export function ResultDisplay({ result, diff }: Props) {
  const color =
    diff === null
      ? "text-black"
      : diff > 0
      ? "text-green-600"
      : diff < 0
      ? "text-red-600"
      : "text-black";

  return (
    <AnimatePresence>
      {result && (
        <motion.div
          key={result}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className={`text-center text-xl font-bold ${color}`}
        >
          {result}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
