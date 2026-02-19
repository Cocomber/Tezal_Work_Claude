import React from 'react';
import { Battery, Wifi, Signal } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <div className="flex justify-between items-center px-4 py-3 bg-white border-b-4 border-black sticky top-0 z-50">
      <div className="flex items-center gap-1">
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-black"></div>
          <div className="w-2 h-2 rounded-full bg-black"></div>
          <div className="w-2 h-2 rounded-full bg-black"></div>
          <div className="w-2 h-2 rounded-full border border-black"></div>
        </div>
        <span className="font-bold text-sm ml-1">GS</span>
        <Wifi size={16} className="ml-1" />
      </div>
      
      <span className="font-bold text-lg tracking-tighter">09:41 AM</span>
      
      <div className="flex items-center gap-2">
        <span className="font-bold text-sm">58%</span>
        <Battery size={20} className="fill-black" />
      </div>
    </div>
  );
};