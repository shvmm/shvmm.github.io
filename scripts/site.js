(() => {
  const root = document.documentElement;
  const toggle = document.querySelector('.theme-toggle');
  const themeColor = document.querySelector('meta[name="theme-color"]');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  function syncTheme() {
    const light = root.dataset.theme === 'light';
    if (toggle) {
      toggle.setAttribute('aria-label', 'Switch to ' + (light ? 'dark' : 'light') + ' theme');
      toggle.title = toggle.getAttribute('aria-label');
    }
    if (themeColor) themeColor.content = light ? '#f7f6ef' : '#151714';
  }
  syncTheme();
  if (toggle) {
    toggle.hidden = false;
    toggle.addEventListener('click', () => {
      const apply = () => {
        root.dataset.theme = root.dataset.theme === 'light' ? 'dark' : 'light';
        try { localStorage.setItem('shvm-theme', root.dataset.theme); } catch { /* Optional persistence. */ }
        syncTheme();
      };
      if (document.startViewTransition && !reducedMotion.matches) document.startViewTransition(apply);
      else apply();
    });
  }
  const systemTheme = window.matchMedia('(prefers-color-scheme: light)');
  systemTheme.addEventListener('change', event => {
    try { if (localStorage.getItem('shvm-theme')) return; } catch { /* Use the system preference. */ }
    root.dataset.theme = event.matches ? 'light' : 'dark';
    syncTheme();
  });
  window.addEventListener('storage', event => {
    if (event.key !== 'shvm-theme') return;
    root.dataset.theme = ['light', 'dark'].includes(event.newValue) ? event.newValue : (systemTheme.matches ? 'light' : 'dark');
    syncTheme();
  });
  document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });
  const clocks = document.querySelectorAll('[data-clock]');
  if (clocks.length) {
    const formatter = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hour12: false });
    function updateClock() { clocks.forEach(el => { el.textContent = formatter.format(new Date()) + ' IST'; }); }
    updateClock();
    setInterval(updateClock, 30000);
  }
  // Preserve the original calculation functions and validate inputs before invoking them.
  document.querySelectorAll('[data-calculate]').forEach(button => {
    button.addEventListener('click', () => {
      const panel = button.closest('.calculator-panel');
      const error = panel.querySelector('.form-error');
      error.textContent = '';
      const fields = button.dataset.inputs.split(' ').map(id => document.getElementById(id));
      for (const field of fields) {
        if (!field.value.trim() || !Number.isFinite(Number(field.value)) || !field.checkValidity() || (field.hasAttribute('data-nonzero') && Number(field.value) === 0)) {
          error.textContent = 'Enter valid numbers in all required fields before calculating.';
          field.focus();
          field.reportValidity();
          return;
        }
      }
      window[button.dataset.calculate]();
    });
  });
})();
