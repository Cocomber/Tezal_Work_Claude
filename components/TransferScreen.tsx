import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Info, Plus, ArrowRight, CheckCircle2, Lock, CreditCard as CardIcon, Eye, EyeOff } from 'lucide-react';
import { NeoCard } from './ui/NeoCard';
import { NeoButton } from './ui/NeoButton';
import { NeoInput } from './ui/NeoInput';
import { Account } from '../types';

interface TransferScreenProps {
  account: Account;
  onBack: () => void;
  onAddMethod: () => void;
  onComplete: () => void;
  hasLinkedCard?: boolean;
}

type Step = 'details' | 'password' | 'success';

export const TransferScreen: React.FC<TransferScreenProps> = ({ 
  account, 
  onBack, 
  onAddMethod,
  onComplete,
  hasLinkedCard = false
}) => {
  const [step, setStep] = useState<Step>('details');
  const [amount, setAmount] = useState(account.balance);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLinked, setIsLinked] = useState(hasLinkedCard);

  const handleDetailsSubmit = () => {
    setStep('password');
  };

  const handlePasswordSubmit = () => {
    setStep('success');
    setTimeout(() => {
      onComplete();
    }, 2500);
  };

  if (step === 'success') {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center h-[80vh] p-6 text-center"
      >
        <div className="w-24 h-24 bg-neo-accent4 border-4 border-black rounded-full flex items-center justify-center shadow-neo mb-6">
          <CheckCircle2 size={48} className="text-black" />
        </div>
        <h2 className="text-3xl font-black uppercase mb-2">Успешно!</h2>
        <p className="font-bold text-gray-600 uppercase text-sm leading-tight">
          Запрос на вывод {amount} {account.currency} принят в обработку
        </p>
      </motion.div>
    );
  }

  if (step === 'password') {
    return (
      <motion.div 
        key="password-step"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        className="flex flex-col h-full min-h-[85vh] p-4 pb-24"
      >
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => setStep('details')} className="p-2 border-2 border-black rounded-lg shadow-neo-sm active:shadow-none bg-white">
            <ChevronLeft size={24} />
          </button>
          <h2 className="text-xl font-black uppercase text-center flex-1 pr-10">Подтверждение</h2>
        </div>

        <div className="flex-1 flex flex-col justify-center space-y-8">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-neo-accent3 border-4 border-black rounded-full flex items-center justify-center shadow-neo-sm mx-auto mb-4">
              <Lock size={32} />
            </div>
            <h3 className="text-2xl font-black uppercase">Введите пароль</h3>
            <p className="font-bold text-gray-500 text-sm">Для подтверждения перевода {amount} ₸</p>
          </div>

          <div className="relative">
            <NeoInput 
              type={showPassword ? "text" : "password"}
              label="Пароль от аккаунта" 
              placeholder="••••••••" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="text-center text-2xl tracking-widest !py-5"
            />
            <button 
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 bottom-4 p-2 text-gray-500"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <div className="mt-auto">
          <NeoButton 
            fullWidth 
            variant="primary" 
            disabled={password.length < 4}
            onClick={handlePasswordSubmit}
            icon={<ArrowRight size={20} />}
          >
            Подтвердить
          </NeoButton>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="flex flex-col h-full min-h-[85vh] p-4 pb-24">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={onBack} 
          className="p-2 border-2 border-black rounded-lg shadow-neo-sm active:shadow-none translate-y-0 active:translate-y-[2px] bg-white"
        >
          <ChevronLeft size={24} />
        </button>
        <h2 className="text-xl font-black uppercase text-center flex-1 pr-10">Перевод</h2>
      </div>

      <div className="space-y-8 flex-1">
        {/* From Section */}
        <section className="space-y-3">
          <h3 className="text-xl font-black uppercase tracking-tight">Откуда</h3>
          <NeoCard className="bg-white border-4 border-black !p-5 relative overflow-hidden">
            <div className="flex justify-between items-start mb-2">
              <span className="text-2xl font-black">{account.balance} {account.currency}</span>
              <span className="bg-neo-accent3 border-2 border-black text-[10px] font-black px-2 py-0.5 rounded uppercase shadow-neo-sm">ИП</span>
            </div>
            <p className="text-sm font-bold text-gray-500 uppercase tracking-tight">{account.name}</p>
          </NeoCard>
        </section>

        {/* To Section */}
        <section className="space-y-4">
          <h3 className="text-xl font-black uppercase tracking-tight">Куда</h3>
          
          <div className="bg-neo-accent4/10 border-2 border-black/5 rounded-xl p-4 flex gap-3">
            <div className="w-6 h-6 rounded-full bg-white border-2 border-black flex items-center justify-center flex-shrink-0">
              <Info size={14} className="text-black" />
            </div>
            <p className="text-xs font-bold text-black leading-snug">
              С типом договора «ГПХ» вывести деньги можно только на банк. счет
            </p>
          </div>

          {isLinked ? (
            <NeoCard 
              className="bg-white border-4 border-black !p-5 flex justify-between items-center group cursor-pointer"
              onClick={() => {}}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-10 bg-neo-main text-white rounded border-2 border-black flex items-center justify-center">
                  <CardIcon size={24} />
                </div>
                <div>
                  <p className="font-black text-sm uppercase">Kaspi Gold</p>
                  <p className="text-xs font-bold text-gray-500 tracking-widest">•••• 4242</p>
                </div>
              </div>
              <button onClick={() => setIsLinked(false)} className="text-[10px] font-black uppercase underline text-neo-accent1">Изменить</button>
            </NeoCard>
          ) : (
            <NeoButton 
              variant="secondary" 
              fullWidth 
              onClick={() => {
                onAddMethod();
                // Simulation: if we navigate to profile to add card, it would come back as isLinked=true
                // but for this demo let's just toggle locally
                setIsLinked(true);
              }}
              className="py-6 !rounded-2xl"
              icon={<Plus size={20} />}
            >
              Добавить способ вывода
            </NeoButton>
          )}
        </section>

        {/* Amount Section */}
        <section className="space-y-3">
          <div className="flex justify-between items-end">
            <h3 className="text-xl font-black uppercase tracking-tight">Сумма</h3>
            <button 
              onClick={() => setAmount(account.balance)}
              className="text-neo-accent1 font-black text-sm uppercase border-b-2 border-neo-accent1"
            >
              Макс.
            </button>
          </div>
          <NeoInput 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)}
            className="text-2xl font-black !py-5"
            placeholder="0.00 ₸"
          />
        </section>
      </div>

      {/* Footer */}
      <div className="mt-auto pt-6">
        <NeoButton 
          fullWidth 
          variant="accent" 
          disabled={!amount || parseFloat(amount) <= 0 || !isLinked}
          onClick={handleDetailsSubmit}
          className="py-5 !rounded-2xl"
        >
          Далее
        </NeoButton>
      </div>
    </div>
  );
};