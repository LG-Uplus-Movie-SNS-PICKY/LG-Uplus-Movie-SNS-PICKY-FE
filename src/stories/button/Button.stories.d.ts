import type { StoryObj } from "@storybook/react";
import Button from "./index";
declare const meta: {
    title: string;
    component: typeof Button;
    parameters: {
        layout: string;
    };
    tags: string[];
    argTypes: {
        backgroundColor: {
            control: "color";
        };
    };
    args: {
        onClick: import("@vitest/spy").Mock<(...args: any[]) => any>;
        size: "Small";
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Active: Story;
export declare const Social: Story;
export declare const More: Story;
