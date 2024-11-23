import type { Meta, StoryObj } from "@storybook/react";
import { FileInput } from "./";

const meta = {
  title: "GlobalComponent/FileInput",
  component: FileInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof FileInput>;

export default meta;
type Story = StoryObj<typeof meta>;

// 이미지만 등록할 수 있는 File type Input 태그
export const BasicFileInput: Story = {
  args: {
    type: "basic",
  },
};

// 이미지, 영상 파일 모두 등록할 수 있는 File type Input 태그
export const MediaFileInput: Story = {
  args: {
    type: "media",
  },
};
