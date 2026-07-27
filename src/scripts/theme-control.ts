type ThemePreference = 'light' | 'dark' | 'system';

const storageKey = 'theme';
const root = document.documentElement;
const metaTheme = document.querySelector('meta[name="theme-color"]');
const control = document.querySelector('[data-theme-control]');

const lightColor = '#fafafa';
const darkColor = '#121212';

function preferredScheme(): 'light' | 'dark' {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

function readStoredTheme(): ThemePreference {
  const value = window.localStorage.getItem(storageKey);
  if (value === 'light' || value === 'dark' || value === 'system') {
    return value;
  }
  return 'system';
}

function resolvedTheme(preference: ThemePreference): 'light' | 'dark' {
  return preference === 'system' ? preferredScheme() : preference;
}

function applyTheme(preference: ThemePreference): void {
  root.dataset.theme = preference;
  const resolved = resolvedTheme(preference);
  if (metaTheme) {
    metaTheme.setAttribute(
      'content',
      resolved === 'dark' ? darkColor : lightColor
    );
  }
  if (!(control instanceof HTMLElement)) {
    return;
  }
  for (const input of control.querySelectorAll('[data-theme-value]')) {
    if (!(input instanceof HTMLInputElement)) {
      continue;
    }
    input.checked = input.dataset.themeValue === preference;
  }
}

const initial = readStoredTheme();
applyTheme(initial);

if (control instanceof HTMLElement) {
  control.addEventListener('change', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLInputElement)) {
      return;
    }
    const value = target.value;
    if (value !== 'light' && value !== 'dark' && value !== 'system') {
      return;
    }
    window.localStorage.setItem(storageKey, value);
    applyTheme(value);
  });
}

window
  .matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', () => {
    if (readStoredTheme() === 'system') {
      applyTheme('system');
    }
  });
