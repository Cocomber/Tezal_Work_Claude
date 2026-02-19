import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface NeoCheckboxProps {
  label?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export const NeoCheckbox: React.FC<NeoCheckboxProps> = ({ 
  label, 
  checked, 
  onChange,
  disabled = false 
}) => {
  return (
    <div 
      onClick={() => !disabled && onChange(!checked)}
      className={`
        flex items-center gap-3 cursor-pointer group select-none
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
      `}
    >
      <div className="relative">
        {/* Background shadow box */}
        <div className={`
            absolute top-1 left-1 w-6 h-6 rounded bg-black transition-all
            ${checked ? 'translate-x-0 translate-y-0' : 'opacity-0'}
        `}></div>

        {/* Main box */}
        <motion.div
          whileTap={!disabled ? { scale: 0.9 } : {}}
          className={`
            relative w-6 h-6 border-2 border-black rounded flex items-center justify-center z-10
            transition-colors duration-200
            ${checked ? 'bg-neo-accent4' : 'bg-white group-hover:bg-gray-50'}
          `}
        >
          <motion.div
            initial={false}
            animate={{ scale: checked ? 1 : 0, opacity: checked ? 1 : 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            <Check size={16} strokeWidth={4} className="text-black" />
          </motion.div>
        </motion.div>
      </div>

      {label && (
        <span className="font-bold text-base leading-none pt-[2px]">
          {label}
        </span>
      )}
    </div>
  );
};