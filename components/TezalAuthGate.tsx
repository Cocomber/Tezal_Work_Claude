import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NeoButton } from './ui/NeoButton';
import { NeoInput } from './ui/NeoInput';
import { NeoCard } from './ui/NeoCard';
import { ChevronLeft, Phone, Camera, CheckCircle2, ArrowRight } from 'lucide-react';

interface TezalAuthGateProps {
  onAuthComplete: (name: string) => void;
  onBack: () => void;
}

type AuthStep = 'phone' | 'otp' | 'questionnaire';

const SKILL_CHIPS = [
  { id: 'delivery', label: '🚴 Доставка' },
  { id: 'cleaning', label: '🧹 Уборка' },
  { id: 'repair', label: '🔧 Ремонт' },
  { id: 'tutoring', label: '📚 Репетиторство' },
  { id: 'moving', label: '📦 Переезд' },
  { id: 'other', label: '⚡ Прочее' },
];

const CITIES = ['Алматы', 'Астана', 'Шымкент', 'Қарағанды', 'Актобе'];

// Demo: phone numbers ending in 42 are "new", all others are "existing"
const isNewUser = (phone: string) => !phone.endsWith('42');

export const TezalAuthGate: React.FC<TezalAuthGateProps> = ({ onAuthComplete, onBack }) => {
  const [step, setStep] = useState<AuthStep>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [city, setCity] = useState('Алматы');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [phoneError, setPhoneError] = useState('');
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  // OTP countdown timer
  useEffect(() => {
    if (step !== 'otp') return;
    setTimer(60);
    setCanResend(false);
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [step]);

  const formatPhone = (raw: string) => {
    const digits = raw.replace(/\D/g, '');
    return digits;
  };

  const handlePhoneChange = (val: string) => {
    const digits = formatPhone(val);
    if (digits.length <= 10) setPhone(digits);
    setPhoneError('');
  };

  const displayPhone = () => {
    if (!phone) return '';
    const d = phone;
    if (d.length <= 3) return `+7 (${d}`;
    if (d.length <= 6) return `+7 (${d.slice(0, 3)}) ${d.slice(3)}`;
    if (d.length <= 8) return `+7 (${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
    return `+7 (${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6, 8)}-${d.slice(8)}`;
  };

  const maskedPhone = () => {
    const d = phone;
    return `+7 (***) ***-${d.slice(6, 8)}-${d.slice(8)}`;
  };

  const handleSendCode = () => {
    if (phone.length < 10) {
      setPhoneError('Введите корректный номер');
      return;
    }
    setStep('otp');
  };

  const handleOtpChange = (val: string, idx: number) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...otp];
    next[idx] = val;
    setOtp(next);
    if (val && idx < 3) otpRefs.current[idx + 1]?.focus();

    // Auto-submit when all filled
    if (val && idx === 3 && next.every(v => v !== '')) {
      setTimeout(() => handleOtpSubmit(next), 200);
    }
  };

  const handleOtpKeyDown = (e: React.KeyboardEvent, idx: number) => {
    if (e.key === 'Backspace' && !otp[idx] && idx > 0) {
      otpRefs.current[idx - 1]?.focus();
    }
  };

  const handleOtpSubmit = (digits = otp) => {
    const code = digits.join('');
    if (code.length < 4) return;
    // Demo: any 4 digits work
    if (isNewUser(phone)) {
      setStep('questionnaire');
    } else {
      onAuthComplete('Пользователь');
    }
  };

  const handleSkillToggle = (id: string) => {
    setSelectedSkills(prev =>
      prev.includes(id)
        ? prev.filter(s => s !== id)
        : prev.length < 3 ? [...prev, id] : prev
    );
  };

  const handleCompleteProfile = () => {
    if (!firstName.trim()) return;
    onAuthComplete(firstName.trim());
  };

  return (
    <div className="flex flex-col h-full min-h-screen bg-[#FDF6E3] overflow-hidden">
      {/* Back button */}
      <div className="p-4 pt-3">
        <button
          onClick={step === 'phone' ? onBack : () => setStep(step === 'otp' ? 'phone' : 'otp')}
          className="p-2 border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] bg-white transition-all inline-flex"
        >
          <ChevronLeft size={24} />
        </button>
      </div>

      <AnimatePresence mode="wait">
        {/* ── STEP 1: PHONE ── */}
        {step === 'phone' && (
          <motion.div
            key="phone"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            className="flex-1 flex flex-col px-6 pb-8"
          >
            <div className="mb-8">
              <div className="w-16 h-16 bg-neo-accent4 border-4 border-black rounded-2xl flex items-center justify-center shadow-neo mb-5">
                <Phone size={32} />
              </div>
              <h2 className="text-3xl font-black uppercase leading-tight mb-2">
                Войдите<br />или создайте<br />аккаунт
              </h2>
              <p className="font-bold text-gray-500 text-sm">
                Чтобы откликнуться на задание, войдите или зарегистрируйтесь
              </p>
            </div>

            <NeoCard className="bg-neo-accent3/20 !p-3 mb-6">
              <p className="text-xs font-bold text-gray-700">
                <span className="font-black">Демо:</span> любой 10-значный номер. Номера оканчивающиеся на <span className="font-black">42</span> — уже зарегистрированы
              </p>
            </NeoCard>

            <div className="mb-4">
              <label className="block text-sm font-black mb-2 uppercase tracking-wider text-gray-700">
                Номер телефона
              </label>
              <div className={`flex items-center gap-2 bg-white border-2 ${phoneError ? 'border-neo-accent1' : 'border-black'} rounded-lg px-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus-within:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus-within:-translate-x-0.5 focus-within:-translate-y-0.5 transition-all`}>
                <span className="font-black text-gray-500 select-none">+7</span>
                <div className="w-px h-6 bg-black/20" />
                <input
                  type="tel"
                  placeholder="(700) 000-00-00"
                  value={displayPhone().replace('+7 ', '')}
                  onChange={e => handlePhoneChange(e.target.value)}
                  className="flex-1 py-4 font-bold text-lg bg-transparent focus:outline-none placeholder-gray-300"
                  maxLength={17}
                />
              </div>
              {phoneError && <p className="text-neo-accent1 text-xs font-bold mt-1">{phoneError}</p>}
            </div>

            <NeoButton fullWidth variant="primary" onClick={handleSendCode} className="py-4 text-base" icon={<ArrowRight size={20} />}>
              Получить код
            </NeoButton>

            <p className="text-center text-xs font-bold text-gray-400 mt-4 leading-relaxed">
              Нажимая кнопку, вы соглашаетесь с <span className="underline">офертой</span> и <span className="underline">политикой конфиденциальности</span>
            </p>
          </motion.div>
        )}

        {/* ── STEP 2: OTP ── */}
        {step === 'otp' && (
          <motion.div
            key="otp"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            className="flex-1 flex flex-col px-6 pb-8"
          >
            <div className="mb-8">
              <h2 className="text-3xl font-black uppercase leading-tight mb-2">
                Введите<br />код
              </h2>
              <p className="font-bold text-gray-600 text-sm">
                Мы отправили SMS на{' '}
                <span className="font-black text-black">{maskedPhone()}</span>
              </p>
            </div>

            {/* OTP Fields */}
            <div className="flex justify-center gap-3 mb-8">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  ref={el => { otpRefs.current[idx] = el; }}
                  type="tel"
                  maxLength={1}
                  value={digit}
                  onChange={e => handleOtpChange(e.target.value, idx)}
                  onKeyDown={e => handleOtpKeyDown(e, idx)}
                  className={`
                    w-16 h-16 text-center text-2xl font-black border-4 border-black rounded-xl
                    focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:-translate-x-0.5 focus:-translate-y-0.5
                    transition-all bg-white
                    ${digit ? 'bg-neo-accent4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' : 'shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'}
                  `}
                />
              ))}
            </div>

            <NeoButton
              fullWidth
              variant="primary"
              onClick={() => handleOtpSubmit()}
              disabled={otp.some(d => d === '')}
              className="py-4 text-base mb-6"
            >
              Подтвердить
            </NeoButton>

            {/* Resend */}
            <div className="text-center">
              {canResend ? (
                <button
                  onClick={() => { setOtp(['', '', '', '']); setStep('phone'); }}
                  className="font-black text-sm underline"
                >
                  Отправить код повторно
                </button>
              ) : (
                <p className="font-bold text-sm text-gray-500">
                  Повторная отправка через{' '}
                  <span className="font-black text-black">{timer} сек</span>
                </p>
              )}
            </div>

            <NeoCard className="mt-6 bg-neo-accent3/20 !p-3">
              <p className="text-xs font-bold text-gray-600">
                <span className="font-black">Демо:</span> введите любые 4 цифры чтобы продолжить
              </p>
            </NeoCard>
          </motion.div>
        )}

        {/* ── STEP 3: QUESTIONNAIRE ── */}
        {step === 'questionnaire' && (
          <motion.div
            key="questionnaire"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            className="flex-1 flex flex-col px-6 pb-8 overflow-y-auto no-scrollbar"
          >
            <div className="mb-6">
              <h2 className="text-3xl font-black uppercase leading-tight mb-1">
                Расскажите<br />о себе
              </h2>
              <p className="font-bold text-gray-500 text-sm">Заполните за 1 минуту — это разовая процедура</p>
            </div>

            {/* Avatar picker */}
            <div className="flex justify-center mb-6">
              <button className="relative w-24 h-24 rounded-full bg-gray-100 border-4 border-black shadow-neo flex items-center justify-center group hover:bg-gray-200 transition-colors">
                <div className="text-center">
                  <Camera size={24} className="mx-auto text-gray-400" />
                  <span className="text-[10px] font-bold text-gray-400 mt-1 block">Фото</span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-neo-accent4 border-2 border-black rounded-full flex items-center justify-center shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                  <span className="text-sm font-black">+</span>
                </div>
              </button>
            </div>

            {/* Name fields */}
            <div className="space-y-4 mb-5">
              <NeoInput
                label="Имя *"
                placeholder="Азамат"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
              />
              <NeoInput
                label="Фамилия"
                placeholder="Сейтқали"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
              />
            </div>

            {/* City */}
            <div className="mb-5">
              <label className="block text-sm font-black mb-2 uppercase tracking-wider text-gray-700">Город</label>
              <div className="flex flex-wrap gap-2">
                {CITIES.map(c => (
                  <button
                    key={c}
                    onClick={() => setCity(c)}
                    className={`px-3 py-1.5 border-2 border-black rounded-full font-bold text-sm transition-all
                      ${city === c ? 'bg-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' : 'bg-white text-black hover:bg-gray-50'}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-black uppercase tracking-wider text-gray-700">
                  Что умеете делать?
                </label>
                <span className="text-xs font-bold text-gray-400">Выберите 1–3</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {SKILL_CHIPS.map(skill => {
                  const selected = selectedSkills.includes(skill.id);
                  return (
                    <button
                      key={skill.id}
                      onClick={() => handleSkillToggle(skill.id)}
                      className={`flex items-center gap-1.5 px-3 py-2 border-2 border-black rounded-xl font-bold text-sm transition-all
                        ${selected
                          ? 'bg-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                          : 'bg-white text-black hover:bg-gray-50'
                        }`}
                    >
                      {selected && <CheckCircle2 size={14} className="text-neo-accent4" />}
                      {skill.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Submit */}
            <NeoButton
              fullWidth
              variant="accent"
              onClick={handleCompleteProfile}
              disabled={!firstName.trim()}
              className="py-4 text-base"
              icon={<ArrowRight size={20} />}
            >
              Готово — найти задания!
            </NeoButton>

            <button
              onClick={() => onAuthComplete('Пользователь')}
              className="mt-3 w-full py-2 text-center font-bold text-sm text-gray-400 hover:text-gray-600 transition-colors"
            >
              Пропустить
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
