import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, MapPin, Clock, Briefcase, DollarSign, Navigation } from 'lucide-react';
import { NeoButton } from './ui/NeoButton';
import { NeoCard } from './ui/NeoCard';
import { Task } from '../types';

interface TaskDetailsProps {
  task: Task;
  onBack: () => void;
  onTakeTask: (taskId: string) => void;
}

export const TaskDetails: React.FC<TaskDetailsProps> = ({ task, onBack, onTakeTask }) => {
  return (
    <div className="flex flex-col h-full min-h-screen bg-white">
      {/* Navbar */}
      <div className="flex items-center gap-4 p-4 border-b-4 border-black sticky top-0 bg-white z-20">
        <button onClick={onBack} className="p-2 border-2 border-black rounded-lg shadow-neo-sm active:shadow-none bg-white">
          <ChevronLeft size={24} />
        </button>
        <span className="font-black uppercase text-lg">Детали задания</span>
      </div>

      <div className="p-4 flex-1 overflow-y-auto pb-24">
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          
          <h1 className="text-3xl font-black uppercase mb-4 leading-tight">{task.title}</h1>
          
          <div className="flex gap-2 mb-6">
            {task.tags.map(tag => (
              <span key={tag} className="px-2 py-1 bg-neo-accent3 border-2 border-black text-xs font-bold rounded shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                {tag}
              </span>
            ))}
          </div>

          <NeoCard className="bg-[#E8DDFF] !p-6 mb-6 flex items-center gap-4">
             <div className="w-12 h-12 bg-neo-main text-white rounded-full border-2 border-black flex items-center justify-center shadow-neo-sm">
                <DollarSign size={24} />
             </div>
             <div>
                <p className="text-xs font-bold uppercase text-gray-600">Оплата за задание</p>
                <p className="text-3xl font-black text-neo-main">{task.price} {task.currency}</p>
             </div>
          </NeoCard>

          <div className="space-y-6">
            <section>
              <h3 className="font-black uppercase text-lg mb-2 flex items-center gap-2">
                <Briefcase size={20} />
                Заказчик
              </h3>
              <div className="bg-gray-50 border-2 border-black rounded-xl p-4">
                <p className="font-bold text-lg">{task.company}</p>
                <p className="text-sm text-gray-500 font-bold">Рейтинг 4.9 • 150+ заданий</p>
              </div>
            </section>

            <section>
              <h3 className="font-black uppercase text-lg mb-2 flex items-center gap-2">
                <Clock size={20} />
                Когда и где
              </h3>
              <div className="bg-gray-50 border-2 border-black rounded-xl p-4 space-y-3">
                 <div className="flex items-start gap-3">
                    <Clock size={20} className="mt-0.5 text-gray-500" />
                    <div>
                      <p className="font-bold">{task.startTime}</p>
                      <p className="text-xs text-gray-500 font-bold">Длительность ~ 4 часа</p>
                    </div>
                 </div>
                 <div className="w-full h-px bg-black/10"></div>
                 <div className="flex items-start gap-3">
                    <MapPin size={20} className="mt-0.5 text-gray-500" />
                    <div>
                      <p className="font-bold">{task.address}</p>
                      <p className="text-xs text-gray-500 font-bold">{task.distance} от вас</p>
                    </div>
                 </div>
              </div>
            </section>

            <section>
               <h3 className="font-black uppercase text-lg mb-2">Описание</h3>
               <p className="font-bold text-gray-700 leading-relaxed border-l-4 border-neo-accent2 pl-4 py-1">
                 {task.description}
               </p>
            </section>
          </div>
        </motion.div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t-4 border-black z-30 max-w-md mx-auto">
        <NeoButton 
          fullWidth 
          variant="primary" 
          onClick={() => onTakeTask(task.id)}
          className="py-4 text-lg"
        >
          Взять задание
        </NeoButton>
      </div>
    </div>
  );
};