import type { Meta, StoryObj } from "@storybook/react";

import { GenreTab } from "./";

const meta = {
  title: "GlobalComponent/GenreTab", // title -> Storybook Directory
  component: GenreTab, // Storybook props -> 컴포넌트 Props
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    backgroundColor: { control: "color" },
  },
} satisfies Meta<typeof GenreTab>;

export default meta;
type Story = StoryObj<typeof meta>;

// GenreTab 컴포넌트의 스토리북(Storybook) 종류 선언
export const Rectangle: Story = {
  args: {
    primary: true,
    label: "GenreTab",
    btnType: "Rectangle",
  },
};

export const Round: Story = {
  args: {
    primary: true,
    label: "GenreTab",
    btnType: "Round",
  },
};
