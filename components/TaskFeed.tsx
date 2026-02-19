import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NeoCard } from './ui/NeoCard';
import { MapPin, Clock, SlidersHorizontal, Search, Star, ChevronRight, ImageIcon, MapPinned } from 'lucide-react';
import { Task } from '../types';
import { FilterSheet, FilterState } from './FilterSheet';

interface TaskFeedProps {
  tasks: Task[];
  onSelectTask: (task: Task) => void;
}

const CATEGORIES = [
  { id: 'all', label: 'Все', emoji: '✦' },
  { id: 'delivery', label: 'Доставка', emoji: '🚴' },
  { id: 'cleaning', label: 'Уборка', emoji: '🧹' },
  { id: 'repair', label: 'Ремонт', emoji: '🔧' },
  { id: 'tutoring', label: 'Репетитор', emoji: '📚' },
  { id: 'other', label: 'Прочее', emoji: '⚡' },
];

const CATEGORY_COLORS: Record<string, string> = {
  delivery: 'bg-neo-accent4',
  cleaning: 'bg-neo-accent3',
  repair: 'bg-neo-accent2',
  tutoring: 'bg-[#E8DDFF]',
  other: 'bg-neo-accent1',
};

const CITIES = ['Алматы', 'Астана', 'Шымкент', 'Қарағанды'];

export const TaskFeed: React.FC<TaskFeedProps> = ({ tasks, onSelectTask }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [selectedCity, setSelectedCity] = useState('Алматы');
  const [showCityPicker, setShowCityPicker] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    priceMin: '',
    priceMax: '',
    district: 'all',
    dateRange: 'any',
  });

  const applyFilters = (f: FilterState) => {
    setFilters(f);
    setShowFilter(false);
  };

  const filteredTasks = tasks.filter(task => {
    if (task.status !== 'open') return false;
    if (activeCategory !== 'all' && task.category !== activeCategory) return false;
    if (searchQuery && !task.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (filters.priceMin && task.price < Number(filters.priceMin)) return false;
    if (filters.priceMax && task.price > Number(filters.priceMax)) return false;
    if (filters.district !== 'all' && task.district !== filters.district) return false;
    if (filters.dateRange === 'today' && task.date !== '2026-02-19') return false;
    if (filters.dateRange === 'tomorrow' && task.date !== '2026-02-20') return false;
    return true;
  });

  const hasActiveFilters =
    filters.priceMin !== '' ||
    filters.priceMax !== '' ||
    filters.district !== 'all' ||
    filters.dateRange !== 'any';

  return (
    <div className="pb-28">
      {/* Sticky Header */}
      <div className="sticky top-0 z-30 bg-[#FDF6E3] pt-4 px-4 pb-3 border-b-4 border-black">
        {/* City selector */}
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={() => setShowCityPicker(v => !v)}
            className="flex items-center gap-1 bg-white border-2 border-black rounded-lg px-3 py-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all"
          >
            <MapPinned size={14} className="text-black" />
            <span className="font-black text-sm">{selectedCity}</span>
            <span className="text-gray-400 text-xs">▾</span>
          </button>
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">
            {filteredTasks.length} задан{filteredTasks.length === 1 ? 'ие' : filteredTasks.length < 5 ? 'ия' : 'ий'}
          </p>
        </div>

        {/* City Picker Dropdown */}
        <AnimatePresence>
          {showCityPicker && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="absolute top-[72px] left-4 z-50 bg-white border-2 border-black rounded-xl shadow-neo overflow-hidden"
            >
              {CITIES.map(city => (
                <button
                  key={city}
                  onClick={() => { setSelectedCity(city); setShowCityPicker(false); }}
                  className={`w-full px-5 py-3 text-left font-bold text-sm border-b border-black/10 last:border-0 hover:bg-neo-accent4 transition-colors ${selectedCity === city ? 'bg-neo-accent4' : ''}`}
                >
                  {city}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <h1 className="text-3xl font-black uppercase leading-none mb-3">
          Найти<br />задание
        </h1>

        {/* Search + Filter */}
        <div className="flex gap-2 mb-3">
          <div className="flex-1 flex items-center gap-2 bg-white border-2 border-black rounded-lg px-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <Search size={16} className="text-gray-400 flex-shrink-0" />
            <input
              className="flex-1 py-2.5 font-medium text-sm bg-transparent focus:outline-none placeholder-gray-400"
              placeholder="Поиск заданий..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            onClick={() => setShowFilter(true)}
            className={`relative p-3 border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all ${hasActiveFilters ? 'bg-black text-white' : 'bg-white'}`}
          >
            <SlidersHorizontal size={20} />
            {hasActiveFilters && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-neo-accent1 border-2 border-black rounded-full text-[8px] font-black flex items-center justify-center text-white">!</span>
            )}
          </button>
        </div>

        {/* Category Chips */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`
                flex items-center gap-1.5 px-3 py-1.5 rounded-full border-2 border-black font-bold text-xs whitespace-nowrap transition-all
                ${activeCategory === cat.id
                  ? 'bg-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                  : 'bg-white text-black hover:bg-gray-100'}
              `}
            >
              <span>{cat.emoji}</span>
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Task List */}
      <div className="p-4 space-y-4">
        {filteredTasks.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
            <div className="w-20 h-20 bg-gray-100 border-2 border-black rounded-full flex items-center justify-center mx-auto mb-4">
              <Search size={32} className="text-gray-400" />
            </div>
            <p className="font-black text-lg">Ничего не нашли</p>
            <p className="font-bold text-gray-500 text-sm mt-1">Попробуйте изменить фильтры</p>
          </motion.div>
        ) : (
          filteredTasks.map((task, i) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <TaskCard task={task} onSelect={() => onSelectTask(task)} />
            </motion.div>
          ))
        )}
      </div>

      {/* Filter Sheet */}
      <FilterSheet
        visible={showFilter}
        onClose={() => setShowFilter(false)}
        onApply={applyFilters}
        currentFilters={filters}
      />
    </div>
  );
};

const TaskCard: React.FC<{ task: Task; onSelect: () => void }> = ({ task, onSelect }) => {
  const catColor = CATEGORY_COLORS[task.category] || 'bg-gray-100';

  return (
    <NeoCard
      className="bg-white cursor-pointer !p-0 overflow-hidden"
      onClick={onSelect}
    >
      {/* Top color accent strip */}
      <div className={`${catColor} px-4 pt-3 pb-2 border-b-2 border-black flex items-center justify-between`}>
        <div className="flex items-center gap-2">
          <span className="text-xs font-black uppercase tracking-wider opacity-70">
            {CATEGORIES.find(c => c.id === task.category)?.emoji} {CATEGORIES.find(c => c.id === task.category)?.label}
          </span>
          {task.hasPhoto && (
            <span className="flex items-center gap-0.5 text-[10px] font-bold bg-black/10 rounded px-1.5 py-0.5">
              <ImageIcon size={10} /> фото
            </span>
          )}
        </div>
        <span className="text-xs font-bold opacity-60">{task.startTime}</span>
      </div>

      <div className="p-4">
        {/* Title + Price */}
        <div className="flex justify-between items-start gap-3 mb-3">
          <h3 className="text-lg font-black leading-tight flex-1">{task.title}</h3>
          <div className="bg-neo-accent4 border-2 border-black px-3 py-1 rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex-shrink-0">
            <span className="font-black text-sm">{task.price.toLocaleString('ru-KZ')}</span>
            <span className="font-black text-sm ml-1">{task.currency}</span>
          </div>
        </div>

        {/* Client */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-full bg-gray-200 border-2 border-black flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-black">{task.company[0]}</span>
          </div>
          <span className="font-bold text-sm text-gray-700 flex-1 truncate">{task.company}</span>
          {task.clientRating && (
            <div className="flex items-center gap-0.5">
              <Star size={12} className="fill-neo-accent3 text-neo-accent3" />
              <span className="text-xs font-black">{task.clientRating}</span>
            </div>
          )}
        </div>

        {/* Meta row */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1 text-xs font-bold bg-gray-50 border border-black/10 rounded-md px-2 py-1">
            <MapPin size={11} className="text-gray-500" />
            <span>{task.district || task.distance}</span>
          </div>
          <div className="flex items-center gap-1 text-xs font-bold bg-gray-50 border border-black/10 rounded-md px-2 py-1">
            <Clock size={11} className="text-gray-500" />
            <span>{task.startTime}</span>
          </div>
          <div className="ml-auto">
            <ChevronRight size={18} className="text-gray-400" />
          </div>
        </div>
      </div>
    </NeoCard>
  );
};
