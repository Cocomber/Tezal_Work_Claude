import React, { useState } from 'react';
import { ProfileScreen } from './components/ProfileScreen';
import { AuthFlow } from './components/Auth/AuthFlow';
import { TaskFeed } from './components/TaskFeed';
import { TaskDetails } from './components/TaskDetails';
import { MyTasksScreen } from './components/MyTasksScreen';
import { BottomNav } from './components/BottomNav';
import { Header } from './components/Header';
import { TezalAuthGate } from './components/TezalAuthGate';
import { Tab, Task } from './types';
import { AnimatePresence, motion } from 'framer-motion';

const MOCK_TASKS: Task[] = [
  {
    id: '1',
    title: 'Доставить документы в ЦОН',
    price: 3500,
    currency: '₸',
    company: 'Алиев Марат',
    distance: '1.2 км',
    startTime: 'Сегодня, 14:00',
    address: 'мкр. Алатау, ул. Сатпаева 22',
    description: 'Нужно забрать пакет документов с ул. Абая 45 и доставить в ЦОН Бостандыкского района. Документы не секретные, просто нет времени ехать самому. Оплата сразу после доставки.',
    tags: ['Срочно', 'Алматы'],
    status: 'open',
    category: 'delivery',
    clientRating: 4.8,
    clientTaskCount: 24,
    district: 'Бостандыкский',
    date: '2026-02-19',
    hasPhoto: false,
  },
  {
    id: '2',
    title: 'Уборка 3-комнатной квартиры',
    price: 12000,
    currency: '₸',
    company: 'Нуртаева Айгуль',
    distance: '0.8 км',
    startTime: 'Завтра, 10:00',
    address: 'пр. Достык 180, кв. 34',
    description: 'Генеральная уборка после ремонта. 3 комнаты, кухня, 2 санузла. Нужны свои чистящие средства. Пылесос есть. Ориентировочно 4–5 часов работы.',
    tags: ['Уборка', 'Медеуский'],
    status: 'open',
    category: 'cleaning',
    clientRating: 4.9,
    clientTaskCount: 57,
    district: 'Медеуский',
    date: '2026-02-20',
    hasPhoto: true,
  },
  {
    id: '3',
    title: 'Починить кран на кухне',
    price: 8000,
    currency: '₸',
    company: 'Джаксыбеков Ерлан',
    distance: '2.1 км',
    startTime: 'Сегодня, 18:00',
    address: 'ул. Толе Би 59, кв. 12',
    description: 'Подтекает кран на кухне. Нужен опытный сантехник. Смеситель однорычажный, возможно требует замены картриджа или полной замены смесителя. Запчасти куплю сам если надо.',
    tags: ['Ремонт', 'Алмалинский'],
    status: 'open',
    category: 'repair',
    clientRating: 4.6,
    clientTaskCount: 8,
    district: 'Алмалинский',
    date: '2026-02-19',
    hasPhoto: false,
  },
  {
    id: '4',
    title: 'Репетитор по математике (9 класс)',
    price: 5000,
    currency: '₸',
    company: 'Сейткали Динара',
    distance: '3.4 км',
    startTime: 'Завтра, 16:00',
    address: 'мкр. Мамыр-4, ул. Шаляпина 17',
    description: 'Ищу репетитора по алгебре и геометрии для дочери. 9 класс, готовимся к ЕНТ. 2 раза в неделю по 1.5 часа. Оплата за каждое занятие. Возможно онлайн.',
    tags: ['Образование', 'Ауэзовский'],
    status: 'open',
    category: 'tutoring',
    clientRating: 5.0,
    clientTaskCount: 3,
    district: 'Ауэзовский',
    date: '2026-02-20',
    hasPhoto: false,
  },
  {
    id: '5',
    title: 'Перевезти мебель (диван + шкаф)',
    price: 15000,
    currency: '₸',
    company: 'Ахметов Руслан',
    distance: '4.0 км',
    startTime: 'Эта неделя',
    address: 'ул. Райымбека 212 → ул. Жандосова 58',
    description: 'Нужны 2 человека и Газель. Перевезти 2-местный диван и 3-дверный шкаф-купе. Оба адреса в Алматы. Грузчики нужны обязательно — есть лестница.',
    tags: ['Переезд', 'Алматы'],
    status: 'open',
    category: 'other',
    clientRating: 4.7,
    clientTaskCount: 12,
    district: 'Жетысуский',
    date: '2026-02-21',
    hasPhoto: true,
  },
  {
    id: '6',
    title: 'Поклейка обоев в 2 комнатах',
    price: 25000,
    currency: '₸',
    company: 'Байжанов Азамат',
    distance: '5.2 км',
    startTime: '22 февраля, 09:00',
    address: 'мкр. Калкаман-2, ул. Бекхожина 11',
    description: 'Нужен опытный мастер по поклейке обоев. 2 комнаты: 16 и 18 кв.м. Обои флизелиновые, куплены. Потолки 2.7м. Стены подготовлены. Работа занимает 1–2 дня.',
    tags: ['Ремонт', 'Наурызбайский'],
    status: 'open',
    category: 'repair',
    clientRating: 4.5,
    clientTaskCount: 19,
    district: 'Наурызбайский',
    date: '2026-02-22',
    hasPhoto: true,
  },
  {
    id: '7',
    title: 'Выгул собаки (хаски) 1 час',
    price: 2000,
    currency: '₸',
    company: 'Мухамедова Жанна',
    distance: '0.5 км',
    startTime: 'Сегодня, 20:00',
    address: 'мкр. Самал-2, ул. Жолдасбекова 12',
    description: 'Нужен человек для ежедневного выгула хаски. Сегодня срочно — я задержусь на работе. Собака дружелюбная, на поводке ходит хорошо. Парк рядом с домом.',
    tags: ['Прочее', 'Бостандыкский'],
    status: 'open',
    category: 'other',
    clientRating: 4.9,
    clientTaskCount: 31,
    district: 'Бостандыкский',
    date: '2026-02-19',
    hasPhoto: false,
  },
];

type AppView = 'feed' | 'task_detail';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [activeTab, setActiveTab] = useState<Tab>('tasks');
  const [appView, setAppView] = useState<AppView>('feed');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showAuthGate, setShowAuthGate] = useState(false);

  const handleAuthComplete = (isNew: boolean, email: string) => {
    setUserEmail(email);
    setIsAuthenticated(true);
  };

  const handleTezalAuthComplete = (name: string) => {
    setUserName(name);
    setIsAuthenticated(true);
    setShowAuthGate(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserEmail('');
    setUserName('');
    setActiveTab('tasks');
    setAppView('feed');
  };

  const handleSelectTask = (task: Task) => {
    setSelectedTask(task);
    setAppView('task_detail');
  };

  const handleBackToFeed = () => {
    setSelectedTask(null);
    setAppView('feed');
  };

  const handleRespond = () => {
    if (!isAuthenticated) {
      setShowAuthGate(true);
    } else {
      alert('Вы успешно откликнулись на задание!');
    }
  };

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    if (tab === 'tasks') setAppView('feed');
  };

  return (
    <div className="min-h-screen bg-[#FDF6E3] text-black font-sans selection:bg-neo-accent1 selection:text-white">
      <div className="max-w-md mx-auto min-h-screen bg-white relative shadow-2xl flex flex-col border-x-4 border-black">
        <Header />

        <main className="flex-1 overflow-y-auto no-scrollbar relative">
          {/* AUTH GATE OVERLAY */}
          <AnimatePresence>
            {showAuthGate && (
              <motion.div
                key="auth-gate-overlay"
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                className="absolute inset-0 z-50 bg-white"
              >
                <TezalAuthGate
                  onAuthComplete={handleTezalAuthComplete}
                  onBack={() => setShowAuthGate(false)}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* TASKS TAB */}
          {activeTab === 'tasks' && (
            <AnimatePresence mode="wait">
              {appView === 'feed' ? (
                <motion.div key="feed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <TaskFeed
                    tasks={MOCK_TASKS}
                    onSelectTask={handleSelectTask}
                  />
                </motion.div>
              ) : (
                selectedTask && (
                  <motion.div key="detail" initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 40, opacity: 0 }}>
                    <TaskDetails
                      task={selectedTask}
                      onBack={handleBackToFeed}
                      onRespond={handleRespond}
                      isAuthenticated={isAuthenticated}
                    />
                  </motion.div>
                )
              )}
            </AnimatePresence>
          )}

          {/* MY TASKS TAB */}
          {activeTab === 'my_tasks' && (
            <MyTasksScreen
              isAuthenticated={isAuthenticated}
              onLoginPress={() => setShowAuthGate(true)}
            />
          )}

          {/* PROFILE TAB */}
          {activeTab === 'profile' && (
            isAuthenticated ? (
              <ProfileScreen onLogout={handleLogout} email={userEmail || userName} />
            ) : (
              <AuthFlow onAuthComplete={handleAuthComplete} />
            )
          )}
        </main>

        {!showAuthGate && (
          <BottomNav activeTab={activeTab} setActiveTab={handleTabChange} />
        )}
      </div>
    </div>
  );
};

export default App;
