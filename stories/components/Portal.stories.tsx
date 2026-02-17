import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Portal } from '@/registry/versions/0.2.0/components/portal';
import { Button } from '@/registry/versions/0.2.0/components/button';
import { useState } from 'react';

const meta = {
  title: 'Components/Portal',
  component: Portal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Portal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [show, setShow] = useState(false);
    return (
      <div>
        <Button onClick={() => setShow(!show)}>
          {show ? 'Hide' : 'Show'} Portal Content
        </Button>
        {show && (
          <Portal>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
              <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-surface-1">
                <h2 className="mb-4 text-xl font-semibold">Portal Content</h2>
                <p className="mb-4">This content is rendered in a portal at the document root.</p>
                <Button onClick={() => setShow(false)}>Close</Button>
              </div>
            </div>
          </Portal>
        )}
      </div>
    );
  },
};
