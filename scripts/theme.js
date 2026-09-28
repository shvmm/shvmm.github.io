// Apply the saved preference before paint; storage is optional.
(() => {
  let theme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  try {
    const saved = localStorage.getItem('shvm-theme');
    if (saved === 'light' || saved === 'dark') theme = saved;
  } catch { /* Use the system preference when storage is unavailable. */ }
  document.documentElement.dataset.theme = theme;
})();
