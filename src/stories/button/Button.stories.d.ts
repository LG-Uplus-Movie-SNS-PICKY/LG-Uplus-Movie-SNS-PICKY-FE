import type { StoryObj } from "@storybook/react";
import { Button } from "./";
declare const meta: {
    title: string;
    component: typeof Button;
    parameters: {
        layout: string;
    };
    tags: string[];
    args: {
        size: "Small";
    };
    argTypes: {
        backgroundColor: {
            control: "color";
        };
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Active: Story;
export declare const Social: Story;
export declare const More: Story;
