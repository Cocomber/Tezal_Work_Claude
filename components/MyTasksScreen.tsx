import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { NeoCard } from './ui/NeoCard';
import { NeoButton } from './ui/NeoButton';
import { ClipboardList, Clock, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';

interface MyTasksScreenProps {
  isAuthenticated: boolean;
  onLoginPress: () => void;
}

type TaskTab = 'active' | 'completed' | 'cancelled';

const MOCK_MY_TASKS = [
  {
    id: 'm1',
    title: 'Доставить документы в ЦОН',
    price: 3500,
    date: 'Сегодня, 14:00',
    status: 'active' as TaskTab,
    category: 'delivery',
    catColor: 'bg-neo-accent4',
  },
  {
    id: 'm2',
    title: 'Уборка офиса на Абая',
    price: 8000,
    date: '15 фев, 09:00',
    status: 'completed' as TaskTab,
    category: 'cleaning',
    catColor: 'bg-neo-accent3',
  },
  {
    id: 'm3',
    title: 'Переезд — 2 комнаты',
    price: 12000,
    date: '10 фев, 10:00',
    status: 'cancelled' as TaskTab,
    category: 'other',
    catColor: 'bg-neo-accent1',
  },
];

const TAB_CONFIG: { id: TaskTab; label: string; icon: React.ReactNode }[] = [
  { id: 'active', label: 'Активные', icon: <Clock size={16} /> },
  { id: 'completed', label: 'Выполненные', icon: <CheckCircle2 size={16} /> },
  { id: 'cancelled', label: 'Отменённые', icon: <XCircle size={16} /> },
];

export const MyTasksScreen: React.FC<MyTasksScreenProps> = ({ isAuthenticated, onLoginPress }) => {
  const [activeTab, setActiveTab] = useState<TaskTab>('active');

  if (!isAuthenticated) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center min-h-[70vh] p-8 text-center"
      >
        <div className="w-24 h-24 bg-gray-100 border-4 border-black rounded-2xl flex items-center justify-center shadow-neo mb-6">
          <ClipboardList size={40} className="text-gray-400" />
        </div>
        <h2 className="text-2xl font-black uppercase mb-2">Мои задания</h2>
        <p className="font-bold text-gray-500 text-sm mb-8 max-w-[240px]">
          Войдите, чтобы видеть задания на которые вы откликнулись
        </p>
        <NeoButton variant="primary" fullWidth onClick={onLoginPress} icon={<ArrowRight size={20} />}>
          Войти в аккаунт
        </NeoButton>
      </motion.div>
    );
  }

  const currentTasks = MOCK_MY_TASKS.filter(t => t.status === activeTab);

  return (
    <div className="pb-28">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-[#FDF6E3] pt-4 px-4 pb-3 border-b-4 border-black">
        <h1 className="text-3xl font-black uppercase mb-4">Мои<br />задания</h1>

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {TAB_CONFIG.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full border-2 border-black font-bold text-xs whitespace-nowrap transition-all
                ${activeTab === tab.id
                  ? 'bg-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                  : 'bg-white text-black hover:bg-gray-100'
                }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 space-y-4">
        {currentTasks.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
            <div className="w-16 h-16 bg-gray-100 border-2 border-black rounded-full flex items-center justify-center mx-auto mb-4">
              <ClipboardList size={24} className="text-gray-400" />
            </div>
            <p className="font-black">Здесь пока пусто</p>
            <p className="font-bold text-sm text-gray-500 mt-1">
              {activeTab === 'active' ? 'Откликнитесь на задание из ленты' : 'Нет заданий в этом разделе'}
            </p>
          </motion.div>
        ) : (
          currentTasks.map((task, i) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <NeoCard className="bg-white !p-0 overflow-hidden">
                <div className={`${task.catColor} px-4 py-2 border-b-2 border-black flex items-center justify-between`}>
                  <span className="text-xs font-black uppercase opacity-70">{task.category}</span>
                  <StatusBadge status={task.status} />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start gap-3">
                    <h3 className="font-black text-base leading-tight flex-1">{task.title}</h3>
                    <div className="bg-neo-accent4 border-2 border-black px-2 py-1 rounded-lg flex-shrink-0">
                      <span className="font-black text-sm">{task.price.toLocaleString('ru-KZ')} ₸</span>
                    </div>
                  </div>
                  <p className="text-xs font-bold text-gray-500 mt-2 flex items-center gap-1">
                    <Clock size={12} />
                    {task.date}
                  </p>
                  {task.status === 'active' && (
                    <div className="mt-3 pt-3 border-t-2 border-dashed border-black/20">
                      <NeoButton size="sm" variant="accent" fullWidth>
                        Связаться с заказчиком
                      </NeoButton>
                    </div>
                  )}
                </div>
              </NeoCard>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

const StatusBadge: React.FC<{ status: TaskTab }> = ({ status }) => {
  const config = {
    active: { label: 'Активно', bg: 'bg-white', text: 'text-black' },
    completed: { label: 'Выполнено', bg: 'bg-black', text: 'text-neo-accent4' },
    cancelled: { label: 'Отменено', bg: 'bg-neo-accent1', text: 'text-black' },
  }[status];

  return (
    <span className={`${config.bg} ${config.text} border-2 border-black px-2 py-0.5 rounded-full text-[10px] font-black`}>
      {config.label}
    </span>
  );
};
