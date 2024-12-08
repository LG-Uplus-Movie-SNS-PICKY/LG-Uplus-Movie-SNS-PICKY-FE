import type { StoryObj } from "@storybook/react";
import { MovieLog } from "./";
declare const meta: {
    title: string;
    component: typeof MovieLog;
    parameters: {
        layout: string;
    };
    tags: string[];
    argTypes: {};
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const BasicFileInput: Story;
