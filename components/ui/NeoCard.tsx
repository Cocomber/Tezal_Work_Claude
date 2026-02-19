import React from 'react';
import { motion } from 'framer-motion';

interface NeoCardProps {
  children: React.ReactNode;
  className?: string;
  noShadow?: boolean;
  onClick?: () => void;
  color?: string;
}

export const NeoCard: React.FC<NeoCardProps> = ({ 
  children, 
  className = "", 
  noShadow = false,
  onClick,
  color = "bg-white"
}) => {
  return (
    <motion.div
      whileTap={onClick ? { x: 2, y: 2, boxShadow: "0px 0px 0px 0px #000" } : {}}
      className={`
        relative border-4 border-black rounded-xl p-4
        ${noShadow ? '' : 'shadow-neo'}
        ${color}
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};