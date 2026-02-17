import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Card } from '@/registry/versions/0.2.0/components/card';
import { Button } from '@/registry/versions/0.2.0/components/button';

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="w-80">
      <Card.Header>
        <Card.Title>Card Title</Card.Title>
        <Card.Description>Card description goes here</Card.Description>
      </Card.Header>
      <Card.Content>
        <p>This is the main content of the card.</p>
      </Card.Content>
      <Card.Footer>
        <Button variant="tertiary">Cancel</Button>
        <Button>Confirm</Button>
      </Card.Footer>
    </Card>
  ),
};

export const WithoutFooter: Story = {
  render: () => (
    <Card className="w-80">
      <Card.Header>
        <Card.Title>Notification</Card.Title>
        <Card.Description>You have 3 unread messages</Card.Description>
      </Card.Header>
      <Card.Content>
        <p>Check your inbox for new messages.</p>
      </Card.Content>
    </Card>
  ),
};

export const ContentOnly: Story = {
  render: () => (
    <Card className="w-80">
      <Card.Content>
        <p>This card only has content, no header or footer.</p>
      </Card.Content>
    </Card>
  ),
};
