import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NeoButton } from './ui/NeoButton';
import { X } from 'lucide-react';

export interface FilterState {
  priceMin: string;
  priceMax: string;
  district: string;
  dateRange: 'any' | 'today' | 'tomorrow' | 'week';
}

interface FilterSheetProps {
  visible: boolean;
  onClose: () => void;
  onApply: (filters: FilterState) => void;
  currentFilters: FilterState;
}

const DISTRICTS = [
  { id: 'all', label: 'Все районы' },
  { id: 'Бостандыкский', label: 'Бостандыкский' },
  { id: 'Медеуский', label: 'Медеуский' },
  { id: 'Алмалинский', label: 'Алмалинский' },
  { id: 'Ауэзовский', label: 'Ауэзовский' },
  { id: 'Жетысуский', label: 'Жетысуский' },
  { id: 'Наурызбайский', label: 'Наурызбайский' },
];

const DATE_OPTIONS: { id: FilterState['dateRange']; label: string }[] = [
  { id: 'any', label: 'Любая дата' },
  { id: 'today', label: 'Сегодня' },
  { id: 'tomorrow', label: 'Завтра' },
  { id: 'week', label: 'Эта неделя' },
];

export const FilterSheet: React.FC<FilterSheetProps> = ({ visible, onClose, onApply, currentFilters }) => {
  const [local, setLocal] = useState<FilterState>(currentFilters);

  const handleApply = () => {
    onApply(local);
  };

  const handleReset = () => {
    const reset: FilterState = { priceMin: '', priceMax: '', district: 'all', dateRange: 'any' };
    setLocal(reset);
    onApply(reset);
  };

  // Sync local state when sheet opens
  React.useEffect(() => {
    if (visible) setLocal(currentFilters);
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Sheet */}
          <motion.div
            key="sheet"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 350 }}
            className="fixed bottom-0 left-0 right-0 z-50 max-w-md mx-auto"
          >
            <div className="bg-white border-t-4 border-x-4 border-black rounded-t-3xl p-6 pb-10 shadow-[0_-8px_0px_0px_rgba(0,0,0,1)]">
              {/* Handle */}
              <div className="w-12 h-1.5 bg-black rounded-full mx-auto mb-6" />

              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-black uppercase">Фильтры</h2>
                <button
                  onClick={onClose}
                  className="p-2 border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all bg-white"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <p className="font-black uppercase text-sm mb-3 tracking-wider">Цена (₸)</p>
                <div className="flex gap-3 items-center">
                  <div className="flex-1">
                    <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">От</label>
                    <input
                      type="number"
                      placeholder="0"
                      value={local.priceMin}
                      onChange={e => setLocal(prev => ({ ...prev, priceMin: e.target.value }))}
                      className="w-full px-4 py-3 border-2 border-black rounded-lg font-bold text-sm focus:outline-none focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all bg-white"
                    />
                  </div>
                  <div className="pt-5 font-black text-gray-400">—</div>
                  <div className="flex-1">
                    <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">До</label>
                    <input
                      type="number"
                      placeholder="∞"
                      value={local.priceMax}
                      onChange={e => setLocal(prev => ({ ...prev, priceMax: e.target.value }))}
                      className="w-full px-4 py-3 border-2 border-black rounded-lg font-bold text-sm focus:outline-none focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Date */}
              <div className="mb-6">
                <p className="font-black uppercase text-sm mb-3 tracking-wider">Дата</p>
                <div className="grid grid-cols-2 gap-2">
                  {DATE_OPTIONS.map(opt => (
                    <button
                      key={opt.id}
                      onClick={() => setLocal(prev => ({ ...prev, dateRange: opt.id }))}
                      className={`py-3 px-4 border-2 border-black rounded-xl font-bold text-sm transition-all
                        ${local.dateRange === opt.id
                          ? 'bg-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                          : 'bg-white text-black hover:bg-gray-50'
                        }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* District */}
              <div className="mb-8">
                <p className="font-black uppercase text-sm mb-3 tracking-wider">Район</p>
                <div className="flex flex-wrap gap-2">
                  {DISTRICTS.map(d => (
                    <button
                      key={d.id}
                      onClick={() => setLocal(prev => ({ ...prev, district: d.id }))}
                      className={`px-3 py-1.5 border-2 border-black rounded-full font-bold text-xs transition-all
                        ${local.district === d.id
                          ? 'bg-black text-white'
                          : 'bg-white text-black hover:bg-gray-50'
                        }`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <NeoButton variant="secondary" onClick={handleReset} className="flex-1">
                  Сбросить
                </NeoButton>
                <NeoButton variant="primary" onClick={handleApply} className="flex-1">
                  Показать задания
                </NeoButton>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
