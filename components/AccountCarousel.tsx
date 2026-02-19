import React from 'react';
import { motion } from 'framer-motion';
import { NeoCard } from './ui/NeoCard';
import { MoveRight } from 'lucide-react';
import { Account } from '../types';

interface AccountCarouselProps {
  accounts: Account[];
  onTransfer: (account: Account) => void;
}

export const AccountCarousel: React.FC<AccountCarouselProps> = ({ accounts, onTransfer }) => {
  return (
    <div className="w-full overflow-x-auto no-scrollbar pb-8 pt-2 pl-4">
      <div className="flex gap-4 pr-4 w-max">
        {accounts.map((acc, index) => (
          <motion.div
            key={acc.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <NeoCard className={`w-[280px] h-[220px] flex flex-col justify-between ${acc.color}`}>
              <div>
                <div className="flex justify-between items-start">
                   <h3 className="text-3xl font-black">{acc.balance} ₸</h3>
                </div>
                <p className="text-gray-700 font-bold mt-2 truncate w-full text-sm opacity-70">
                  {acc.name}
                </p>
              </div>
              
              <button 
                onClick={() => onTransfer(acc)}
                className={`
                w-full py-3 px-4 font-black uppercase text-sm border-2 border-black rounded-lg 
                flex items-center justify-center gap-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all
                ${acc.btnColor}
              `}>
                <span>Вывести</span>
                <MoveRight size={16} />
              </button>
            </NeoCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
};