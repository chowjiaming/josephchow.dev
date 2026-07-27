(() => {
  const key = 'theme';
  try {
    const value = localStorage.getItem(key);
    if (value === 'light' || value === 'dark' || value === 'system') {
      document.documentElement.dataset.theme = value;
    } else {
      document.documentElement.dataset.theme = 'system';
    }
  } catch {
    document.documentElement.dataset.theme = 'system';
  }
})();
