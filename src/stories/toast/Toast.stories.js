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
};
export default meta;
export const Default = {
    args: {
        message: 'Toast Message',
        direction: 'none'
    }
};
