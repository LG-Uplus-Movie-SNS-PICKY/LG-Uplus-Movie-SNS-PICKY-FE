import type { StoryObj } from "@storybook/react";
import { NavigaterBar } from "./";
declare const meta: {
    title: string;
    component: typeof NavigaterBar;
    parameters: {
        layout: string;
    };
    tags: string[];
    argTypes: {};
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const BasicNavigaterBar: Story;
