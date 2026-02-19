export type AuthStatus = 'onboarding' | 'login' | 'signup' | 'authenticated';

export type Tab = 'tasks' | 'my_tasks' | 'profile';

export interface Account {
  id: string;
  name: string;
  balance: string;
  currency: string;
  color: string;
  btnColor: string;
}

export interface Transaction {
  id: string;
  title: string;
  subtitle: string;
  amount: number;
  currency: string;
  date: string;
}

export interface Task {
  id: string;
  title: string;
  price: number;
  currency: string;
  company: string;
  distance: string;
  startTime: string;
  address: string;
  description: string;
  tags: string[];
  status: 'open' | 'active' | 'completed';
  category: string;
}