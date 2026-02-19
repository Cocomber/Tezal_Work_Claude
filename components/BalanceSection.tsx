import React from 'react';
import { motion } from 'framer-motion';

interface BalanceSectionProps {
  totalBalance: string;
}

export const BalanceSection: React.FC<BalanceSectionProps> = ({ totalBalance }) => {
  return (
    <div className="px-4 pt-8 pb-4 text-center">
      <motion.p 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-gray-600 font-bold mb-2 uppercase tracking-wider"
      >
        На вашем счету
      </motion.p>
      <motion.h1 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
        className="text-5xl font-black mb-1 tracking-tighter"
      >
        {totalBalance} <span className="text-4xl">₸</span>
      </motion.h1>
    </div>
  );
};