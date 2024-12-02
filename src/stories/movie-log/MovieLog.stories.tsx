import type { Meta, StoryObj } from "@storybook/react";
import { MovieLog } from "./";

const meta = {
  title: "GlobalComponent/MovieLog",
  component: MovieLog,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof MovieLog>;

export default meta;
type Story = StoryObj<typeof meta>;

// 무비로그 일반
export const BasicFileInput: Story = {
  args: {},
};
