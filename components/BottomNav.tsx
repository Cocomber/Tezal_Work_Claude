import React from 'react';
import { Search, ClipboardList, User } from 'lucide-react';
import { Tab } from '../types';

interface BottomNavProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  const tabs: { id: Tab; icon: React.ReactNode; label: string }[] = [
    { id: 'tasks', icon: <Search size={24} />, label: 'Задания' },
    { id: 'my_tasks', icon: <ClipboardList size={24} />, label: 'Мои' },
    { id: 'profile', icon: <User size={24} />, label: 'Профиль' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-4 border-black px-6 py-2 pb-6 z-40">
      <div className="flex justify-between items-center max-w-md mx-auto">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex flex-col items-center group relative w-20"
            >
              {isActive && (
                <div className="absolute -top-12 bg-black text-white text-xs font-bold px-2 py-1 rounded border-2 border-neo-accent4 animate-bounce">
                  ТУТ
                </div>
              )}
              <div 
                className={`
                  p-2 rounded-xl border-2 transition-all duration-300
                  ${isActive 
                    ? 'bg-neo-accent4 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] -translate-y-2' 
                    : 'bg-transparent border-transparent hover:bg-gray-100'}
                `}
              >
                {tab.icon}
              </div>
              <span className={`text-xs font-bold mt-1 ${isActive ? 'text-black' : 'text-gray-500'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};