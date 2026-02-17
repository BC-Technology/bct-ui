import React, { useCallback, useEffect, useState } from 'react';
import { addons, types } from 'storybook/internal/manager-api';
import { IconButton } from 'storybook/internal/components';

const ADDON_ID = 'bct-theme-toggle';
const TOOL_ID = `${ADDON_ID}/tool`;

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('bct-storybook-theme') === 'dark';
    }
    return false;
  });

  useEffect(() => {
    const iframe = document.querySelector('#storybook-preview-iframe') as HTMLIFrameElement;
    if (iframe?.contentDocument?.documentElement) {
      if (isDark) {
        iframe.contentDocument.documentElement.classList.add('dark');
        iframe.contentDocument.documentElement.setAttribute('data-theme', 'dark');
      } else {
        iframe.contentDocument.documentElement.classList.remove('dark');
        iframe.contentDocument.documentElement.setAttribute('data-theme', 'light');
      }
    }
  }, [isDark]);

  const toggleTheme = useCallback(() => {
    setIsDark((prev) => {
      const newValue = !prev;
      localStorage.setItem('bct-storybook-theme', newValue ? 'dark' : 'light');
      return newValue;
    });
  }, []);

  return (
    <IconButton
      key={TOOL_ID}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={toggleTheme}
    >
      {isDark ? '☀️' : '🌙'}
    </IconButton>
  );
};

addons.register(ADDON_ID, () => {
  addons.add(TOOL_ID, {
    type: types.TOOL,
    title: 'Theme Toggle',
    match: ({ viewMode, tabId }) => !tabId && viewMode === 'story',
    render: () => <ThemeToggle />,
  });
});
