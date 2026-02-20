import React, { useState, useEffect } from 'react';
import { DEFAULT_THEME_TOKENS, DARK_THEME_TOKENS } from './constants';

interface ThemeConfigPanelProps {
  active: boolean;
}

export const ThemeConfigPanel: React.FC<ThemeConfigPanelProps> = ({ active }) => {
  const [customTokens, setCustomTokens] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('bct-storybook-theme-tokens');
      return saved ? JSON.parse(saved) : {};
    }
    return {};
  });

  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('bct-storybook-theme') === 'dark';
    }
    return false;
  });

  useEffect(() => {
    const handleThemeChange = () => {
      const newIsDark = localStorage.getItem('bct-storybook-theme') === 'dark';
      setIsDark(newIsDark);
    };

    window.addEventListener('storage', handleThemeChange);
    return () => window.removeEventListener('storage', handleThemeChange);
  }, []);

  useEffect(() => {
    const iframe = document.querySelector('#storybook-preview-iframe') as HTMLIFrameElement;
    if (iframe?.contentDocument?.documentElement) {
      const root = iframe.contentDocument.documentElement;
      
      // Apply custom tokens
      Object.entries(customTokens).forEach(([key, value]) => {
        root.style.setProperty(`--${key}`, value as string);
      });
    }
  }, [customTokens]);

  const handleTokenChange = (key: string, value: string) => {
    const newTokens = { ...customTokens, [key]: value };
    setCustomTokens(newTokens);
    localStorage.setItem('bct-storybook-theme-tokens', JSON.stringify(newTokens));
  };

  const handleReset = () => {
    setCustomTokens({});
    localStorage.removeItem('bct-storybook-theme-tokens');
    
    const iframe = document.querySelector('#storybook-preview-iframe') as HTMLIFrameElement;
    if (iframe?.contentDocument?.documentElement) {
      const root = iframe.contentDocument.documentElement;
      Object.keys(customTokens).forEach((key) => {
        root.style.removeProperty(`--${key}`);
      });
    }
  };

  const currentTheme = (isDark ? DARK_THEME_TOKENS : DEFAULT_THEME_TOKENS) as any;

  if (!active) return null;

  return (
    <div style={{ padding: '16px', height: '100%', overflow: 'auto' }}>
      <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>Theme Configuration</h3>
        <button
          onClick={handleReset}
          style={{
            padding: '6px 12px',
            fontSize: '12px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            background: 'white',
            cursor: 'pointer',
          }}
        >
          Reset to Defaults
        </button>
      </div>

      <p style={{ fontSize: '12px', color: '#666', marginBottom: '16px' }}>
        Customize design tokens. Changes are saved to localStorage and persist across sessions.
      </p>

      {/* Colors Section */}
      <div style={{ marginBottom: '24px' }}>
        <h4 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '12px' }}>Colors</h4>
        <div style={{ display: 'grid', gap: '12px' }}>
          {Object.entries(currentTheme.colors).map(([key, defaultValue]) => (
            <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <label style={{ flex: 1, fontSize: '12px', color: '#333' }}>
                {key}
              </label>
              <input
                type="color"
                value={customTokens[`color-${key}`] || defaultValue}
                onChange={(e) => handleTokenChange(`color-${key}`, e.target.value)}
                style={{ width: '40px', height: '28px', border: '1px solid #ddd', borderRadius: '4px' }}
              />
              <input
                type="text"
                value={customTokens[`color-${key}`] || defaultValue}
                onChange={(e) => handleTokenChange(`color-${key}`, e.target.value)}
                style={{
                  width: '100px',
                  padding: '4px 8px',
                  fontSize: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Spacing Section */}
      <div style={{ marginBottom: '24px' }}>
        <h4 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '12px' }}>Spacing</h4>
        <div style={{ display: 'grid', gap: '12px' }}>
          {Object.entries(currentTheme.spacing).map(([key, defaultValue]) => (
            <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <label style={{ flex: 1, fontSize: '12px', color: '#333' }}>
                {key}
              </label>
              <input
                type="text"
                value={customTokens[`spacing-${key}`] || defaultValue}
                onChange={(e) => handleTokenChange(`spacing-${key}`, e.target.value)}
                placeholder="e.g., 4px"
                style={{
                  width: '140px',
                  padding: '4px 8px',
                  fontSize: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Radius Section */}
      <div style={{ marginBottom: '24px' }}>
        <h4 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '12px' }}>Border Radius</h4>
        <div style={{ display: 'grid', gap: '12px' }}>
          {Object.entries(currentTheme.radius).map(([key, defaultValue]) => (
            <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <label style={{ flex: 1, fontSize: '12px', color: '#333' }}>
                {key}
              </label>
              <input
                type="text"
                value={customTokens[`radius-${key}`] || defaultValue}
                onChange={(e) => handleTokenChange(`radius-${key}`, e.target.value)}
                placeholder="e.g., 8px"
                style={{
                  width: '140px',
                  padding: '4px 8px',
                  fontSize: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Shadows Section */}
      <div style={{ marginBottom: '24px' }}>
        <h4 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '12px' }}>Shadows</h4>
        <div style={{ display: 'grid', gap: '12px' }}>
          {Object.entries(currentTheme.shadows).map(([key, defaultValue]) => (
            <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <label style={{ flex: 1, fontSize: '12px', color: '#333' }}>
                {key}
              </label>
              <input
                type="text"
                value={customTokens[`shadow-${key}`] || defaultValue}
                onChange={(e) => handleTokenChange(`shadow-${key}`, e.target.value)}
                placeholder="e.g., 0 1px 2px rgba(0,0,0,0.1)"
                style={{
                  width: '140px',
                  padding: '4px 8px',
                  fontSize: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '12px', background: '#f8f9fa', borderRadius: '4px', fontSize: '11px', color: '#666' }}>
        <strong>Note:</strong> Custom tokens are stored in localStorage with the key <code>bct-storybook-theme-tokens</code>
      </div>
    </div>
  );
};
