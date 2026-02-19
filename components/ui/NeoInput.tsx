import React from 'react';

interface NeoInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const NeoInput: React.FC<NeoInputProps> = ({ label, error, className = '', ...props }) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-bold mb-1 uppercase tracking-wider text-gray-700">
          {label}
        </label>
      )}
      <input
        className={`
          w-full px-4 py-3 bg-white border-2 border-black rounded-lg
          font-medium text-black placeholder-gray-400
          focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:-translate-y-1 focus:-translate-x-1 transition-all
          disabled:bg-gray-100 disabled:cursor-not-allowed
          ${error ? 'border-neo-accent1' : ''}
          ${className}
        `}
        {...props}
      />
      {error && (
        <span className="text-neo-accent1 text-xs font-bold mt-1 block">{error}</span>
      )}
    </div>
  );
};