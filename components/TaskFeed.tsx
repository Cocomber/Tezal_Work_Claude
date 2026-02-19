import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { NeoCard } from './ui/NeoCard';
import { NeoButton } from './ui/NeoButton';
import { MapPin, Clock, Briefcase, Filter, ChevronRight } from 'lucide-react';
import { Task } from '../types';

interface TaskFeedProps {
  tasks: Task[];
  onSelectTask: (task: Task) => void;
}

const CATEGORIES = [
  { id: 'all', label: 'Все' },
  { id: 'delivery', label: 'Доставка' },
  { id: 'loading', label: 'Грузчики' },
  { id: 'cleaning', label: 'Клининг' },
];

export const TaskFeed: React.FC<TaskFeedProps> = ({ tasks, onSelectTask }) => {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredTasks = activeCategory === 'all' 
    ? tasks.filter(t => t.status === 'open') 
    : tasks.filter(t => t.category === activeCategory && t.status === 'open');

  return (
    <div className="pb-24">
      {/* Search Header */}
      <div className="sticky top-0 z-30 bg-[#FDF6E3] pt-4 pb-2 px-4 border-b-4 border-black">
        <h1 className="text-3xl font-black uppercase mb-4">Найти<br/>Задание</h1>
        
        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`
                px-4 py-2 rounded-full border-2 border-black font-bold text-sm whitespace-nowrap transition-all
                ${activeCategory === cat.id 
                  ? 'bg-black text-white shadow-neo-sm' 
                  : 'bg-white text-black hover:bg-gray-100'}
              `}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Task List */}
      <div className="p-4 space-y-4">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gray-200 border-2 border-black rounded-full flex items-center justify-center mx-auto mb-4">
              <Filter size={32} className="text-gray-500" />
            </div>
            <p className="font-bold text-gray-500">Нет доступных заданий в этой категории</p>
          </div>
        ) : (
          filteredTasks.map((task, i) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <NeoCard 
                className="bg-white group active:translate-y-1 active:translate-x-1 active:shadow-none transition-all cursor-pointer"
                onClick={() => onSelectTask(task)}
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-black leading-tight flex-1 pr-2">{task.title}</h3>
                  <div className="bg-neo-accent4 border-2 border-black px-2 py-1 rounded text-sm font-black whitespace-nowrap">
                    {task.price} {task.currency}
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-4 text-sm font-bold text-gray-600">
                  <Briefcase size={16} />
                  <span className="truncate">{task.company}</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                   <div className="flex items-center gap-1 text-xs font-bold border-2 border-black/10 rounded px-2 py-1 bg-gray-50">
                      <MapPin size={12} />
                      {task.distance}
                   </div>
                   <div className="flex items-center gap-1 text-xs font-bold border-2 border-black/10 rounded px-2 py-1 bg-gray-50">
                      <Clock size={12} />
                      {task.startTime}
                   </div>
                </div>

                <NeoButton 
                  size="sm" 
                  fullWidth 
                  variant="secondary"
                  className="!justify-between !bg-[#F8F4FF] !border-black"
                >
                  <span>Подробнее</span>
                  <ChevronRight size={16} />
                </NeoButton>
              </NeoCard>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};