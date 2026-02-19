import React from 'react';
import { motion } from 'framer-motion';

interface NeoButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'accent' | 'ghost';
  size?: 'sm' | 'md';
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

export const NeoButton: React.FC<NeoButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  fullWidth = false,
  className = '',
  icon,
  ...props 
}) => {
  const baseStyle = "font-black uppercase border-2 border-black rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed";
  
  // Strict 4px grid sizing:
  // md: Border(2+2) + Py(12+12) + LineHeight(20) = 48px Height.
  // sm: Border(2+2) + Py(8+8) + LineHeight(16) = 36px Height.
  const sizeStyles = {
    md: "text-sm leading-5 px-6 py-3", 
    sm: "text-xs leading-4 px-4 py-2"
  };

  const variants = {
    primary: "bg-neo-main text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[4px] active:translate-y-[4px]",
    secondary: "bg-white text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-50 active:shadow-none active:translate-x-[4px] active:translate-y-[4px]",
    danger: "bg-neo-accent1 text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[4px] active:translate-y-[4px]",
    accent: "bg-neo-accent4 text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[4px] active:translate-y-[4px]",
    ghost: "bg-transparent border-transparent text-gray-600 hover:bg-gray-100 shadow-none",
  };

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      className={`
        ${baseStyle}
        ${sizeStyles[size]}
        ${variants[variant]}
        ${fullWidth ? 'w-full' : ''}
        ${fullWidth && size === 'md' ? 'py-4' : ''} 
        ${className}
      `}
      {...props}
    >
      {icon && <span>{icon}</span>}
      {children}
    </motion.button>
  );
};