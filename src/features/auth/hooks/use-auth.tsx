import { create } from 'zustand';

interface AuthStore {
  type: 'none' | 'login' | 'sign-up';
  onClose: VoidFunction;
  onLogin: VoidFunction;
  onSignUp: VoidFunction;
}

export const useAuthStore = create<AuthStore>((set) => ({
  type: 'none',
  onClose: () => set({ type: 'none' }),
  onLogin: () => set({ type: 'login' }),
  onSignUp: () => set({ type: 'sign-up' }),
}));
