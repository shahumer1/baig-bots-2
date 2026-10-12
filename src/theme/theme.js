const THEME_KEY = 'baig-bots-theme';

export function getSavedTheme() {
  try { return window.localStorage.getItem(THEME_KEY) === 'dark' ? 'dark' : 'light'; }
  catch { return 'light'; }
}

export function saveTheme(mode) {
  try { window.localStorage.setItem(THEME_KEY, mode); } catch { /* Storage can be unavailable. */ }
}

export function applyTheme(root, mode, onChange) {
  root.dataset.theme = mode;
  document.documentElement.dataset.theme = mode;
  onChange(mode === 'dark');
}

export function themeColor(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(`--${name}`).trim();
}

