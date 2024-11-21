import type { Meta, StoryObj } from "@storybook/react";
import { MovieItem } from "./";

const meta = {
  title: "GlobalComponent/MovieItem", // 스토리 탐색 경로 정의
  component: MovieItem, // 연결시킬 React Component
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof MovieItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicMovieItem: Story = {
  args: {
    type: "basic",
  },
};
export const RateMovieItem: Story = {
  args: {
    type: "rate",
    rate: 4.2,
  },
};
export const AllInfoMovieItem: Story = {
  args: {
    type: "all",
    rate: 2.7,
  },
};
