import type { StoryObj } from "@storybook/react";
import { MovieItem } from "./";
declare const meta: {
    title: string;
    component: typeof MovieItem;
    tags: string[];
    argTypes: {};
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const BasicMovieItem: Story;
export declare const RateMovieItem: Story;
export declare const AllInfoMovieItem: Story;
