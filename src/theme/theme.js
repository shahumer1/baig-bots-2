export function getSystemTheme() {
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function followSystemTheme(root, onChange) {
  const preference = window.matchMedia?.('(prefers-color-scheme: dark)');
  const apply = () => {
    const mode = preference?.matches ? 'dark' : 'light';
    root.dataset.theme = mode;
    document.documentElement.dataset.theme = mode;
    onChange(mode === 'dark');
  };
  apply();
  preference?.addEventListener?.('change', apply);
  return () => preference?.removeEventListener?.('change', apply);
}

export function themeColor(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(`--${name}`).trim();
}

