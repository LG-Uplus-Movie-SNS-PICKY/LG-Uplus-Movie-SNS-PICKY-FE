import type { Meta, StoryObj } from '@storybook/react';

import { Toast } from './';

const meta = {
  title: 'GlobalComponent/Toast',
  component: Toast,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: {
        type: 'radio',
        options: ['none', 'up', 'down']
      },
      defaultValue: 'none',
    },
    message: {
      control: 'text',
      defaultValue: 'Toast Message',
    }
  }
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    message: 'Toast Message',
    direction: 'none'
  }
};