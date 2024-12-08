import type { StoryObj } from "@storybook/react";
import { FileInput } from "./";
declare const meta: {
    title: string;
    component: typeof FileInput;
    parameters: {
        layout: string;
    };
    tags: string[];
    argTypes: {};
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const BasicFileInput: Story;
export declare const MediaFileInput: Story;
