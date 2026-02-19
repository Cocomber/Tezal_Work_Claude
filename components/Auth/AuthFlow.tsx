import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NeoButton } from '../ui/NeoButton';
import { NeoInput } from '../ui/NeoInput';
import { NeoCard } from '../ui/NeoCard';
import { Sparkles, ArrowRight, Wallet, Zap, Info, Briefcase, MapPin, Clock } from 'lucide-react';
import { AuthStatus } from '../../types';

interface AuthFlowProps {
  onAuthComplete: (isNew: boolean, email: string) => void;
}

export const AuthFlow: React.FC<AuthFlowProps> = ({ onAuthComplete }) => {
  const [status, setStatus] = useState<AuthStatus>('onboarding');
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const onboardingSteps = [
    {
      title: "Tezal Работа",
      desc: "Сервис поиска заданий от надежных компаний. Выбирайте то, что подходит именно вам.",
      icon: <Briefcase size={48} />,
      color: "bg-neo-accent3"
    },
    {
      title: "Задания рядом",
      desc: "Находите подработку рядом с домом. Доставка, погрузка, клининг и многое другое.",
      icon: <MapPin size={48} />,
      color: "bg-neo-accent4"
    },
    {
      title: "Свободный график",
      desc: "Берите задания когда удобно. Работайте на себя и получайте оплату после выполнения.",
      icon: <Clock size={48} />,
      color: "bg-neo-accent2"
    }
  ];

  const handleNextOnboarding = () => {
    if (onboardingStep < onboardingSteps.length - 1) {
      setOnboardingStep(prev => prev + 1);
    } else {
      setStatus('login');
    }
  };

  const handleLogin = () => {
    if (email && password) {
      onAuthComplete(false, email);
    } else {
      setError('Введите email и пароль');
    }
  };

  const handleSignup = () => {
    if (!email || !password || password !== confirmPassword) {
      setError('Проверьте заполнение всех полей');
      return;
    }
    if (password.length < 6) {
      setError('Пароль должен быть не менее 6 символов');
      return;
    }
    onAuthComplete(true, email);
  };

  return (
    <div className="h-screen bg-[#FDF6E3] flex flex-col p-6 overflow-hidden">
      <AnimatePresence mode="wait">
        {status === 'onboarding' && (
          <motion.div
            key="onboarding"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="flex-1 flex flex-col h-full"
          >
            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8">
              <div className={`${onboardingSteps[onboardingStep].color} p-10 border-4 border-black rounded-full shadow-neo mb-4 transition-colors duration-500`}>
                {onboardingSteps[onboardingStep].icon}
              </div>
              <div>
                <h1 className="text-4xl font-black uppercase mb-4 leading-none text-black">
                  {onboardingSteps[onboardingStep].title}
                </h1>
                <p className="font-bold text-gray-800 px-4">
                  {onboardingSteps[onboardingStep].desc}
                </p>
              </div>
            </div>
            
            <div className="flex flex-col items-center gap-8 mt-auto pb-4">
              <div className="flex gap-2">
                {onboardingSteps.map((_, i) => (
                  <div key={i} className={`w-3 h-3 rounded-full border-2 border-black ${i === onboardingStep ? 'bg-black' : 'bg-transparent'}`} />
                ))}
              </div>

              <NeoButton fullWidth onClick={handleNextOnboarding} icon={<ArrowRight size={20} />}>
                {onboardingStep === onboardingSteps.length - 1 ? "Начать" : "Далее"}
              </NeoButton>
            </div>
          </motion.div>
        )}

        {status === 'login' && (
          <motion.div
            key="login"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="flex-1 flex flex-col justify-center space-y-6"
          >
            <div className="mb-4 text-black">
              <h2 className="text-4xl font-black uppercase">Вход</h2>
              <p className="font-bold text-gray-500">Войдите, чтобы видеть задания</p>
            </div>

            <NeoCard className="bg-neo-accent3 mb-4 flex items-start gap-3 !p-4">
               <Info className="flex-shrink-0 mt-1" size={20} />
               <div className="text-xs font-bold uppercase leading-tight text-black">
                  Демо доступ:<br/>
                  <span className="text-gray-700">Любой email / пароль</span>
               </div>
            </NeoCard>

            <div className="space-y-4">
              <NeoInput 
                label="Email" 
                placeholder="worker@mail.ru" 
                value={email} 
                onChange={e => {setEmail(e.target.value); setError('');}}
              />
              <NeoInput 
                label="Пароль" 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={e => {setPassword(e.target.value); setError('');}}
              />
              {error && <p className="text-neo-accent1 font-bold text-xs">{error}</p>}
            </div>

            <NeoButton fullWidth onClick={handleLogin}>Войти</NeoButton>
            
            <p className="text-center font-bold text-sm text-black">
              Нет аккаунта? <button onClick={() => setStatus('signup')} className="underline text-neo-accent2">Регистрация</button>
            </p>
          </motion.div>
        )}

        {status === 'signup' && (
          <motion.div
            key="signup"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="flex-1 flex flex-col justify-center space-y-6"
          >
            <div className="mb-4 text-black">
              <h2 className="text-4xl font-black uppercase">Регистрация</h2>
              <p className="font-bold text-gray-500">Начните зарабатывать с Tezal</p>
            </div>

            <div className="space-y-4">
              <NeoInput 
                label="Ваш Email" 
                placeholder="worker@mail.ru" 
                value={email}
                onChange={e => {setEmail(e.target.value); setError('');}}
              />
              <NeoInput 
                label="Пароль" 
                type="password" 
                placeholder="Придумайте пароль" 
                value={password}
                onChange={e => {setPassword(e.target.value); setError('');}}
              />
              <NeoInput 
                label="Подтвердите пароль" 
                type="password" 
                placeholder="Повторите пароль" 
                value={confirmPassword}
                onChange={e => {setConfirmPassword(e.target.value); setError('');}}
              />
              {error && <p className="text-neo-accent1 font-bold text-xs">{error}</p>}
            </div>

            <NeoButton fullWidth variant="accent" onClick={handleSignup}>Создать аккаунт</NeoButton>
            
            <p className="text-center font-bold text-sm text-black">
              Уже есть аккаунт? <button onClick={() => setStatus('login')} className="underline text-neo-accent2">Войти</button>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};