import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./";

const meta = {
  title: "GlobalComponent/Button", // title -> Storybook Directory
  component: Button, // Storybook props -> 컴포넌트 Props
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    size: "Small",
  },
  argTypes: {
    backgroundColor: { control: "color" },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Button 컴포넌트의 스토리북(Storybook) 종류 선언
export const Active: Story = {
  args: {
    primary: true,
    label: "Button",
    btnType: "Active",
  },
};

export const Social: Story = {
  args: {
    primary: true,
    label: "Button",
    btnType: "Social",
  },
};

export const More: Story = {
  args: {
    btnType: "More",
    label: "Button",
  },
};
