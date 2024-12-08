import type { StoryObj } from "@storybook/react";
import { Header } from "./";
declare const meta: {
    title: string;
    component: typeof Header;
    parameters: {
        layout: string;
    };
    tags: string[];
    argTypes: {
        label: {
            control: "text";
        };
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const BasicHeader: Story;
export declare const LoginHeader: Story;
export declare const MainHeader: Story;
export declare const TitleHeader: Story;
