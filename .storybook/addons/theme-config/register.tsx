import React, { useState, useEffect } from 'react';
import { addons, types } from 'storybook/manager-api';

const ADDON_ID = 'bct-theme-config';
const PANEL_ID = `${ADDON_ID}/panel`;

const ThemeConfigPanel = () => {
  const [customTokens, setCustomTokens] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('bct-storybook-theme-tokens');
      return saved ? JSON.parse(saved) : {};
    }
    return {};
  });

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

      <div style={{ display: 'grid', gap: '12px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>
            Primary Color
          </label>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <input
              type="color"
              value={customTokens['color-primary'] || '#007bff'}
              onChange={(e) => handleTokenChange('color-primary', e.target.value)}
              style={{ width: '40px', height: '28px', border: '1px solid #ddd', borderRadius: '4px' }}
            />
            <input
              type="text"
              value={customTokens['color-primary'] || '#007bff'}
              onChange={(e) => handleTokenChange('color-primary', e.target.value)}
              style={{
                flex: 1,
                padding: '4px 8px',
                fontSize: '12px',
                border: '1px solid #ddd',
                borderRadius: '4px',
              }}
            />
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>
            Background Color
          </label>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <input
              type="color"
              value={customTokens['color-background'] || '#ffffff'}
              onChange={(e) => handleTokenChange('color-background', e.target.value)}
              style={{ width: '40px', height: '28px', border: '1px solid #ddd', borderRadius: '4px' }}
            />
            <input
              type="text"
              value={customTokens['color-background'] || '#ffffff'}
              onChange={(e) => handleTokenChange('color-background', e.target.value)}
              style={{
                flex: 1,
                padding: '4px 8px',
                fontSize: '12px',
                border: '1px solid #ddd',
                borderRadius: '4px',
              }}
            />
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>
            Border Radius
          </label>
          <input
            type="text"
            value={customTokens['radius-md'] || '8px'}
            onChange={(e) => handleTokenChange('radius-md', e.target.value)}
            placeholder="e.g., 8px"
            style={{
              width: '100%',
              padding: '4px 8px',
              fontSize: '12px',
              border: '1px solid #ddd',
              borderRadius: '4px',
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>
            Shadow
          </label>
          <input
            type="text"
            value={customTokens['shadow-md'] || '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}
            onChange={(e) => handleTokenChange('shadow-md', e.target.value)}
            placeholder="e.g., 0 4px 6px rgba(0,0,0,0.1)"
            style={{
              width: '100%',
              padding: '4px 8px',
              fontSize: '12px',
              border: '1px solid #ddd',
              borderRadius: '4px',
            }}
          />
        </div>
      </div>

      <div style={{ padding: '12px', background: '#f8f9fa', borderRadius: '4px', fontSize: '11px', color: '#666', marginTop: '16px' }}>
        <strong>Note:</strong> Custom tokens are stored in localStorage with the key <code>bct-storybook-theme-tokens</code>
      </div>
    </div>
  );
};

addons.register(ADDON_ID, () => {
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: 'Theme Config',
    render: () => <ThemeConfigPanel />,
  });
});
