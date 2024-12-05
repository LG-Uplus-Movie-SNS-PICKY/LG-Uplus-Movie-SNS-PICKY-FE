import { Meta, StoryObj } from '@storybook/react';

import { Modal } from './index';

const meta: Meta<typeof Modal> = {
    title: 'GlobalComponent/Modal',
    component: Modal,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {
        onConfirm: { action: 'confirmed' },
        onCancel: { action: 'cancelled' }
    }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        message: 'Modal Message',
        confirmText: 'Confirm Text',
        cancelText: 'Cancel Text',
        onConfirm: () => console.log('로그아웃'),
        onCancel: () => console.log('취소'),
    }
};