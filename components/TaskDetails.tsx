import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, MapPin, Clock, Star, ImageIcon, Navigation, CheckCircle2 } from 'lucide-react';
import { NeoButton } from './ui/NeoButton';
import { NeoCard } from './ui/NeoCard';
import { Task } from '../types';

interface TaskDetailsProps {
  task: Task;
  onBack: () => void;
  onRespond: () => void;
  isAuthenticated: boolean;
}

const CATEGORY_COLORS: Record<string, string> = {
  delivery: 'bg-neo-accent4',
  cleaning: 'bg-neo-accent3',
  repair: 'bg-neo-accent2',
  tutoring: 'bg-[#E8DDFF]',
  other: 'bg-neo-accent1',
};

const CATEGORY_LABELS: Record<string, string> = {
  delivery: '🚴 Доставка',
  cleaning: '🧹 Уборка',
  repair: '🔧 Ремонт',
  tutoring: '📚 Репетиторство',
  other: '⚡ Прочее',
};

export const TaskDetails: React.FC<TaskDetailsProps> = ({ task, onBack, onRespond, isAuthenticated }) => {
  const catColor = CATEGORY_COLORS[task.category] || 'bg-gray-100';
  const catLabel = CATEGORY_LABELS[task.category] || task.category;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Navbar */}
      <div className="flex items-center gap-3 p-4 border-b-4 border-black sticky top-0 bg-white z-20">
        <button
          onClick={onBack}
          className="p-2 border-2 border-black rounded-lg shadow-neo-sm active:shadow-none active:translate-x-[2px] active:translate-y-[2px] bg-white transition-all"
        >
          <ChevronLeft size={24} />
        </button>
        <span className="font-black uppercase text-lg flex-1">Задание</span>
        <span className={`${catColor} border-2 border-black px-2 py-1 rounded-lg text-xs font-black`}>
          {catLabel}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto pb-32 no-scrollbar">
        <motion.div initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>

          {/* Photo placeholder */}
          {task.hasPhoto && (
            <div className="mx-4 mt-4 h-44 bg-gray-100 border-4 border-black rounded-xl overflow-hidden shadow-neo flex items-center justify-center">
              <div className="flex flex-col items-center gap-2 text-gray-400">
                <ImageIcon size={32} />
                <span className="text-xs font-bold">Фото задания</span>
              </div>
              {/* Decorative grid pattern */}
              <div className="absolute inset-0 opacity-5" style={{backgroundImage: 'repeating-linear-gradient(0deg, #000 0, #000 1px, transparent 1px, transparent 20px), repeating-linear-gradient(90deg, #000 0, #000 1px, transparent 1px, transparent 20px)'}} />
            </div>
          )}

          <div className="p-4 space-y-5">
            {/* Title + Price */}
            <div>
              <div className="flex flex-wrap gap-2 mb-2">
                {task.tags.map(tag => (
                  <span key={tag} className="px-2 py-1 bg-neo-accent3 border-2 border-black text-xs font-black rounded shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="text-2xl font-black uppercase leading-tight mb-3">{task.title}</h1>

              <NeoCard className={`${catColor} !p-4 flex items-center justify-between`}>
                <div>
                  <p className="text-xs font-bold uppercase text-black/60 mb-0.5">Оплата</p>
                  <p className="text-3xl font-black text-black">
                    {task.price.toLocaleString('ru-KZ')} <span className="text-2xl">{task.currency}</span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-black/60">За задание</p>
                  <p className="text-xs font-bold text-black/60 mt-1">Наличные / Kaspi</p>
                </div>
              </NeoCard>
            </div>

            {/* Client block */}
            <section>
              <h3 className="font-black uppercase text-sm mb-2 tracking-wider text-gray-500">Заказчик</h3>
              <div className="bg-gray-50 border-2 border-black rounded-xl p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex-shrink-0">
                  <span className="text-xl font-black">{task.company[0]}</span>
                </div>
                <div className="flex-1">
                  <p className="font-black text-base">{task.company}</p>
                  <div className="flex items-center gap-3 mt-0.5">
                    <div className="flex items-center gap-1">
                      <Star size={13} className="fill-neo-accent3 text-neo-accent3" />
                      <span className="text-sm font-black">{task.clientRating ?? '—'}</span>
                    </div>
                    <span className="text-xs font-bold text-gray-500">
                      {task.clientTaskCount ?? 0} задан{(task.clientTaskCount ?? 0) === 1 ? 'ие' : 'ий'}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-neo-accent4 border-2 border-black rounded-lg px-2 py-1">
                  <CheckCircle2 size={14} />
                  <span className="text-xs font-black">Проверен</span>
                </div>
              </div>
            </section>

            {/* When & Where */}
            <section>
              <h3 className="font-black uppercase text-sm mb-2 tracking-wider text-gray-500">Когда и где</h3>
              <div className="bg-gray-50 border-2 border-black rounded-xl overflow-hidden">
                <div className="flex items-start gap-3 p-4">
                  <div className="p-2 bg-white border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex-shrink-0">
                    <Clock size={18} />
                  </div>
                  <div>
                    <p className="font-black">{task.startTime}</p>
                    <p className="text-xs text-gray-500 font-bold mt-0.5">Длительность ~ 3–5 часов</p>
                  </div>
                </div>
                <div className="h-px bg-black/10 mx-4" />
                <div className="flex items-start gap-3 p-4">
                  <div className="p-2 bg-white border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex-shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div className="flex-1">
                    <p className="font-black">{task.address}</p>
                    <p className="text-xs text-gray-500 font-bold mt-0.5">{task.district} • {task.distance} от вас</p>
                  </div>
                </div>

                {/* Mini map mockup */}
                <div className="relative h-28 bg-[#e8f4e8] border-t-2 border-black overflow-hidden">
                  {/* Stylized map grid */}
                  <div className="absolute inset-0 opacity-20" style={{backgroundImage: 'repeating-linear-gradient(0deg, #2a5a2a 0, #2a5a2a 1px, transparent 1px, transparent 28px), repeating-linear-gradient(90deg, #2a5a2a 0, #2a5a2a 1px, transparent 1px, transparent 48px)'}} />
                  {/* Fake roads */}
                  <div className="absolute top-1/3 left-0 right-0 h-2 bg-white border-y border-black/20 opacity-70" />
                  <div className="absolute top-0 bottom-0 left-1/3 w-1.5 bg-white border-x border-black/20 opacity-70" />
                  {/* Pin */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full">
                    <div className="w-8 h-8 bg-neo-accent1 border-2 border-black rounded-full flex items-center justify-center shadow-neo-sm">
                      <MapPin size={16} className="text-white" />
                    </div>
                    <div className="w-2 h-2 bg-black rounded-full mx-auto -mt-1" />
                  </div>
                  {/* Navigation button */}
                  <button className="absolute bottom-2 right-2 bg-white border-2 border-black rounded-lg p-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center gap-1">
                    <Navigation size={12} />
                    <span className="text-[10px] font-black">Маршрут</span>
                  </button>
                </div>
              </div>
            </section>

            {/* Description */}
            <section>
              <h3 className="font-black uppercase text-sm mb-2 tracking-wider text-gray-500">Описание</h3>
              <div className="border-l-4 border-black pl-4 py-1">
                <p className="font-bold text-gray-800 leading-relaxed text-sm">{task.description}</p>
              </div>
            </section>

            {/* Requirements hint */}
            <NeoCard className="bg-neo-accent3/20 !p-4">
              <p className="font-black text-xs uppercase tracking-wider mb-1">Что нужно знать</p>
              <ul className="text-xs font-bold text-gray-700 space-y-1">
                <li>• Оплата наличными или переводом после выполнения</li>
                <li>• Самозанятый статус приветствуется</li>
                <li>• Связь с заказчиком через чат приложения</li>
              </ul>
            </NeoCard>
          </div>
        </motion.div>
      </div>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-4 bg-white border-t-4 border-black z-30">
        {isAuthenticated ? (
          <NeoButton fullWidth variant="accent" onClick={onRespond} className="py-4 text-base">
            ✓ Откликнуться на задание
          </NeoButton>
        ) : (
          <div className="space-y-2">
            <p className="text-center text-xs font-bold text-gray-500 uppercase tracking-wide">
              Войдите, чтобы откликнуться
            </p>
            <NeoButton fullWidth variant="primary" onClick={onRespond} className="py-4 text-base">
              Войти и откликнуться
            </NeoButton>
          </div>
        )}
      </div>
    </div>
  );
};
