import type { Meta, StoryObj } from "@storybook/react";
import { NavigaterBar } from "./";

const meta = {
  title: "GlobalComponent/NavigaterBar", // 스토리 탐색 경로 정의
  component: NavigaterBar, // 연결시킬 React Component

  // 스토리 렌더링에 영향을 미치는 Stroybook 전역 또는 특정 스토리 설정을 정의
  parameters: {
    layout: "padded",
  },

  // 스토리와 관련된 태그를 지정
  tags: ["autodocs"],

  // 조작 가능한 args 설정
  argTypes: {},

  // 기본으로 전달될 Props를 설정
} satisfies Meta<typeof NavigaterBar>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 Global Navigater Bar 스토리 정의
export const BasicNavigaterBar: Story = {
  args: {
    state: "home",
    onClick: (event, name) => {},
  },
};
