import type { StoryObj } from '@storybook/react';
import { Toast } from './';
declare const meta: {
    title: string;
    component: typeof Toast;
    parameters: {
        layout: string;
    };
    tags: string[];
    argTypes: {
        direction: {
            control: {
                type: "radio";
                options: string[];
            };
            defaultValue: string;
        };
        message: {
            control: "text";
            defaultValue: string;
        };
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
