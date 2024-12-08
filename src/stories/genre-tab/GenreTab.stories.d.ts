import type { StoryObj } from "@storybook/react";
import { GenreTabButton } from "./";
declare const meta: {
    title: string;
    component: typeof GenreTabButton;
    parameters: {
        layout: string;
    };
    tags: string[];
    argTypes: {
        backgroundColor: {
            control: "color";
        };
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Rectangle: Story;
export declare const Round: Story;
