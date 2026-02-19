
import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, PackageCheck } from 'lucide-react';
import { NeoCard } from './ui/NeoCard';
import { Transaction } from '../types';

interface TransactionListProps {
  transactions: Transaction[];
}

export const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  if (transactions.length === 0) {
    return (
      <div className="px-4 py-16 flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 border-4 border-black bg-neo-accent1 rounded-full flex items-center justify-center shadow-neo-sm mb-6 rotate-6">
           <PackageCheck size={40} className="text-black" />
        </div>
        <h3 className="text-xl font-black uppercase mb-2">История пуста</h3>
        <p className="font-bold text-sm text-gray-500 max-w-[240px] leading-snug">
          Как только компания-партнер начислит выплату, она появится здесь.
        </p>
      </div>
    );
  }

  // Group by date for visual structure
  const grouped = transactions.reduce((acc, tx) => {
    const date = tx.date;
    if (!acc[date]) acc[date] = [];
    acc[date].push(tx);
    return acc;
  }, {} as Record<string, Transaction[]>);

  const formatDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split('-');
    const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
    return `${parseInt(day)} ${months[parseInt(month) - 1]}`;
  };

  return (
    <div className="px-4 space-y-8">
      {/* Fix: Explicitly cast Object.entries to ensure 'items' is inferred as Transaction[] instead of unknown */}
      {(Object.entries(grouped) as [string, Transaction[]][]).map(([date, items], groupIdx) => (
        <div key={date} className="space-y-4">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-2xl font-black flex items-center gap-2"
          >
            <span className="bg-black text-white px-2 py-1 transform -rotate-2 border-2 border-transparent">
              {formatDate(date).split(' ')[0]}
            </span>
            <span>{formatDate(date).split(' ')[1]}</span>
          </motion.h2>

          <div className="space-y-4">
            {items.map((tx, idx) => (
              <motion.div
                key={tx.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <NeoCard className="bg-white flex justify-between items-start !p-5" color={groupIdx % 2 === 0 ? 'bg-white' : 'bg-neo-accent3'}>
                  <div className="flex gap-3">
                    <div className="mt-1">
                       <div className="w-10 h-10 border-2 border-black rounded flex items-center justify-center bg-neo-accent4 text-black shadow-neo-sm">
                          <Briefcase size={20} />
                       </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-sm sm:text-base leading-tight mb-2 text-black">{tx.title}</h3>
                      <div className="flex items-center text-xs font-bold text-gray-600 gap-2 mb-2">
                        <PackageCheck size={12} />
                        <span>{tx.subtitle}</span>
                      </div>
                      <div className="flex items-center text-xs font-bold text-black bg-neo-accent4 px-3 py-1 rounded border-2 border-black inline-block shadow-neo-sm">
                        <span>Выполнено</span>
                      </div>
                    </div>
                  </div>
                  <div className="font-black text-lg whitespace-nowrap text-black">
                    {tx.amount > 0 ? '+' : ''} {tx.amount.toLocaleString()} {tx.currency}
                  </div>
                </NeoCard>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
