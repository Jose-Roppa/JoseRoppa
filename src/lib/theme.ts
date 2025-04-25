type Theme = 'dark';

export const getTheme = (): Theme => {
  return 'dark';
};

export const setTheme = (theme: Theme): void => {
  const root = document.documentElement;
  root.classList.remove('dark');
  root.classList.add('dark');
};

export const toggleTheme = (): Theme => {
  setTheme('dark');
  return 'dark';
};

export const debugTheme = () => {
  console.log('Current theme: dark');
}; 