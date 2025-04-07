import { create } from 'zustand';

interface AuthStore {
  token: string | null;
  isLoggedIn: boolean;
  setToken: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  token: null,
  isLoggedIn: false,
  setToken: (token) =>
    set(() => {
      localStorage.setItem('token', token);
      return { token, isLoggedIn: true };
    }),
  logout: () =>
    set(() => {
      localStorage.removeItem('token');
      return { token: null, isLoggedIn: false };
    }),
}));
