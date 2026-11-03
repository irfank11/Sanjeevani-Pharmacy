import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';
type MotionPref = 'full' | 'reduced';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  motion: MotionPref;
  toggleMotion: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
  motion: 'full',
  toggleMotion: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const [motion, setMotion] = useState<MotionPref>(() => {
    const saved = localStorage.getItem('motion');
    if (saved === 'reduced') return 'reduced';
    return 'full';
  });

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    if (motion === 'reduced') {
      document.documentElement.classList.add('reduce-motion');
    } else {
      document.documentElement.classList.remove('reduce-motion');
    }
    localStorage.setItem('motion', motion);
  }, [motion]);

  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');
  const toggleMotion = () => setMotion(m => m === 'full' ? 'reduced' : 'full');

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, motion, toggleMotion }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
