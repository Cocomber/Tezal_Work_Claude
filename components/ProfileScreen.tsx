import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NeoCard } from './ui/NeoCard';
import { NeoButton } from './ui/NeoButton';
import { NeoInput } from './ui/NeoInput';
import { 
  User, CreditCard, FileSignature, HelpCircle, 
  Globe, Shield, FileText, Trash2, LogOut, ChevronRight,
  ChevronLeft, Plus, Download, CheckCircle2, Languages
} from 'lucide-react';

interface ProfileScreenProps {
  onLogout: () => void;
  email: string;
}

type ProfileSubView = 'main' | 'payout_methods' | 'add_card' | 'delete_account' | 'acts' | 'faq' | 'lang' | 'privacy' | 'tos';

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ onLogout, email }) => {
  const [view, setView] = useState<ProfileSubView>('main');
  const [cardNumber, setCardNumber] = useState('');
  const [currentLang, setCurrentLang] = useState('Русский');

  const menuItems = [
    { id: 'payout_methods', icon: <CreditCard size={20} />, label: 'Способы вывода средств' },
    { id: 'acts', icon: <FileSignature size={20} />, label: 'Подписанные акты' },
    { id: 'faq', icon: <HelpCircle size={20} />, label: 'Популярные вопросы' },
    { id: 'lang', icon: <Globe size={20} />, label: 'Язык приложения', value: currentLang },
    { id: 'privacy', icon: <Shield size={20} />, label: 'Политика конфиденциальности' },
    { id: 'tos', icon: <FileText size={20} />, label: 'Оферта' },
    { id: 'delete_account', icon: <Trash2 size={20} />, label: 'Удаление аккаунта', isDestructive: true },
  ];

  const handleBack = () => {
    if (view === 'add_card') setView('payout_methods');
    else setView('main');
  };

  const renderHeader = (title: string, backToMain = true) => (
    <div className="flex items-center gap-4 mb-8">
      <button 
        onClick={backToMain ? () => setView('main') : handleBack} 
        className="p-2 border-2 border-black rounded-lg shadow-neo-sm active:shadow-none translate-y-0 active:translate-y-[2px] bg-white"
      >
        <ChevronLeft size={24} />
      </button>
      <h2 className="text-xl font-black uppercase text-center flex-1 pr-10">{title}</h2>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <AnimatePresence mode="wait">
        {view === 'main' && (
          <motion.div
            key="main"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="p-4 pb-24"
          >
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-black uppercase">Профиль</h2>
            </div>

            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="mb-8">
              <NeoCard className="bg-white flex items-center gap-4 !p-6">
                <div className="w-16 h-16 rounded-full border-2 border-black bg-neo-accent4 flex items-center justify-center flex-shrink-0 shadow-neo-sm">
                  <User size={32} className="text-black" />
                </div>
                <div className="overflow-hidden">
                  <h3 className="text-xl font-black tracking-tight truncate">{email}</h3>
                  <p className="text-gray-500 font-bold text-sm">Мой профиль</p>
                </div>
              </NeoCard>
            </motion.div>

            <div className="space-y-3">
              {menuItems.map((item, idx) => (
                <motion.div key={idx} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: idx * 0.05 }}>
                  <button 
                    onClick={() => setView(item.id as ProfileSubView)}
                    className="w-full bg-white border-2 border-black p-4 rounded-xl flex justify-between items-center group active:bg-gray-50 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg border-2 border-black ${item.isDestructive ? 'bg-neo-accent1 text-black' : 'bg-gray-100 text-gray-800'}`}>
                        {item.icon}
                      </div>
                      <span className={`font-bold text-sm sm:text-base ${item.isDestructive ? 'text-red-600' : 'text-black'}`}>
                        {item.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {item.value && <span className="text-xs font-bold bg-black text-white px-2 py-1 rounded">{item.value}</span>}
                      <ChevronRight size={20} className="text-gray-400 group-hover:text-black transition-colors" />
                    </div>
                  </button>
                </motion.div>
              ))}
            </div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-8">
              <NeoButton onClick={onLogout} variant="secondary" fullWidth icon={<LogOut size={18} />}>
                Выйти
              </NeoButton>
            </motion.div>
          </motion.div>
        )}

        {view === 'payout_methods' && (
          <motion.div key="payout_methods" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="flex flex-col h-full min-h-[85vh] p-4">
            {renderHeader('Способы вывода')}
            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
              <div className="w-24 h-24 rounded-full border-2 border-black bg-gray-50 flex items-center justify-center shadow-neo-sm">
                <FileText size={40} className="text-black" />
              </div>
              <h3 className="text-2xl font-black max-w-[280px]">Вы пока не добавили способ вывода средств</h3>
              <NeoButton onClick={() => setView('add_card')} variant="accent" icon={<Plus size={20} />} fullWidth>Добавить</NeoButton>
            </div>
          </motion.div>
        )}

        {view === 'add_card' && (
          <motion.div key="add_card" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="flex flex-col h-full min-h-[85vh] p-4">
            {renderHeader('Новая карта', false)}
            <div className="space-y-6">
              <NeoInput label="Номер" placeholder="0000 0000 0000 0000" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} className="text-lg tracking-widest" />
            </div>
            <div className="mt-auto pb-4 flex gap-4">
              <NeoButton onClick={() => setView('payout_methods')} variant="primary" className="flex-1">Создать</NeoButton>
              <NeoButton onClick={handleBack} variant="secondary" className="flex-1">Отмена</NeoButton>
            </div>
          </motion.div>
        )}

        {view === 'acts' && (
          <motion.div key="acts" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="flex flex-col h-full min-h-[85vh] p-4">
            {renderHeader('Подписанные акты')}
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <NeoCard key={i} className="bg-white flex justify-between items-center !p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-neo-accent4 border-2 border-black rounded shadow-neo-sm"><FileSignature size={20} /></div>
                    <div>
                      <p className="font-black text-sm uppercase">Акт выплат №{440 + i}</p>
                      <p className="text-xs font-bold text-gray-500">от 0{i}.03.2023</p>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors"><Download size={20} /></button>
                </NeoCard>
              ))}
            </div>
          </motion.div>
        )}

        {view === 'faq' && (
          <motion.div key="faq" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="flex flex-col h-full min-h-[85vh] p-4">
            {renderHeader('Популярные вопросы')}
            <div className="space-y-4 overflow-y-auto no-scrollbar pb-10">
              {[
                { q: "Как изменить карту?", a: "Перейдите в 'Способы вывода' и добавьте новую карту. Старую можно будет удалить после подтверждения новой." },
                { q: "Когда придут деньги?", a: "Выплаты производятся мгновенно после подтверждения реестра вашей компанией. Обычно это занимает не более 5-10 минут." },
                { q: "Есть ли комиссия?", a: "Комиссия за вывод средств зависит от условий вашего договора с компанией-партнером." }
              ].map((item, i) => (
                <NeoCard key={i} className="bg-neo-accent3/10 !p-5">
                  <h4 className="font-black text-sm uppercase mb-2 flex gap-2">
                    <span className="text-neo-accent2">Q:</span> {item.q}
                  </h4>
                  <p className="text-xs font-bold text-gray-700 leading-relaxed">{item.a}</p>
                </NeoCard>
              ))}
            </div>
          </motion.div>
        )}

        {view === 'lang' && (
          <motion.div key="lang" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="flex flex-col h-full min-h-[85vh] p-4">
            {renderHeader('Язык приложения')}
            <div className="space-y-3">
              {['Русский', 'Қазақша', 'English'].map(l => (
                <button 
                  key={l}
                  onClick={() => { setCurrentLang(l); setView('main'); }}
                  className={`
                    w-full p-5 border-2 border-black rounded-xl flex justify-between items-center transition-all
                    ${currentLang === l ? 'bg-neo-accent4 shadow-neo' : 'bg-white shadow-neo-sm hover:shadow-neo'}
                  `}
                >
                  <span className="font-black uppercase">{l}</span>
                  {currentLang === l && <CheckCircle2 size={24} />}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {view === 'privacy' && (
          <motion.div key="privacy" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="flex flex-col h-full min-h-[85vh] p-4">
            {renderHeader('Конфиденциальность')}
            <div className="flex-1 overflow-y-auto no-scrollbar bg-gray-50 border-2 border-black p-4 rounded-xl">
              <h3 className="font-black uppercase mb-4">Политика обработки данных</h3>
              <div className="text-xs font-bold text-gray-600 space-y-4">
                <p>Мы серьезно относимся к вашим данным. Tezaneo использует современные методы шифрования для защиты вашей финансовой информации.</p>
                <p>1. Сбор данных: мы собираем только ту информацию, которая необходима для проведения выплат.</p>
                <p>2. Хранение: данные хранятся на защищенных серверах в соответствии с законодательством.</p>
                <p>3. Передача: мы не передаем данные третьим лицам без вашего согласия, за исключением случаев, предусмотренных законом.</p>
              </div>
            </div>
          </motion.div>
        )}

        {view === 'tos' && (
          <motion.div key="tos" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="flex flex-col h-full min-h-[85vh] p-4">
            {renderHeader('Оферта')}
            <div className="flex-1 overflow-y-auto no-scrollbar bg-neo-accent3/5 border-2 border-black p-4 rounded-xl">
              <h3 className="font-black uppercase mb-4">Публичная оферта</h3>
              <p className="text-xs font-bold text-gray-600 leading-relaxed italic border-l-4 border-black pl-3 mb-4">
                Использование приложения Tezaneo означает ваше полное согласие с условиями данного договора.
              </p>
              <div className="text-[10px] font-bold text-gray-500 space-y-2 uppercase tracking-tight">
                <p>Раздел 1. Предмет договора...</p>
                <p>Раздел 2. Права и обязанности сторон...</p>
                <p>Раздел 3. Порядок расчетов...</p>
                <p>Раздел 4. Ответственность...</p>
              </div>
            </div>
          </motion.div>
        )}

        {view === 'delete_account' && (
          <motion.div key="delete_account" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="flex flex-col h-full min-h-[85vh] p-4">
            {renderHeader('Удаление')}
            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
              <div className="w-24 h-24 rounded-full border-2 border-neo-accent1 bg-red-50 flex items-center justify-center shadow-neo-sm">
                <Trash2 size={40} className="text-neo-accent1" />
              </div>
              <h3 className="text-2xl font-black max-w-[280px]">Вы действительно хотите удалить аккаунт?</h3>
              <p className="text-xs font-bold text-gray-500 uppercase">Это действие нельзя будет отменить.</p>
            </div>
            <div className="mt-auto pb-4 flex gap-4">
              <NeoButton onClick={handleBack} variant="secondary" className="flex-1">Отмена</NeoButton>
              <NeoButton onClick={onLogout} variant="danger" className="flex-1">Удалить</NeoButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};