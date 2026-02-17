import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DropdownMenu } from '@/registry/versions/0.2.0/components/dropdown-menu';
import { Button } from '@/registry/versions/0.2.0/components/button';

const meta = {
  title: 'Components/DropdownMenu',
  component: DropdownMenu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DropdownMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <DropdownMenu
      trigger={<Button>Open Menu</Button>}
      items={[
        { label: 'Profile', value: 'profile' },
        { label: 'Settings', value: 'settings' },
        { label: 'Logout', value: 'logout' },
      ]}
      onSelect={(value) => console.info('Selected:', value)}
    />
  ),
};

export const WithDisabledItems: Story = {
  render: () => (
    <DropdownMenu
      trigger={<Button>Actions</Button>}
      items={[
        { label: 'Edit', value: 'edit' },
        { label: 'Delete', value: 'delete', disabled: true },
        { label: 'Archive', value: 'archive' },
      ]}
      onSelect={(value) => console.info('Selected:', value)}
    />
  ),
};
