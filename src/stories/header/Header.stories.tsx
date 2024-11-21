import type { Meta, StoryObj } from "@storybook/react";

import { Header } from "./";

import AddCircle from "@assets/icons/add_circle.svg?react";
import Notification from "@assets/icons/notification.svg?react";
import Search from "@assets/icons/search.svg?react";

// Header meta 설정 정의
const meta = {
  title: "GlobalComponent/Header", // 스토리 탐색 경로 정의
  component: Header, // 연결시킬 React Component

  // 스토리 렌더링에 영향을 미치는 Stroybook 전역 또는 특정 스토리 설정을 정의
  parameters: {
    layout: "padded",
  },

  // 스토리와 관련된 태그를 지정
  tags: ["autodocs"],

  // 조작 가능한 args 설정
  argTypes: {
    label: { control: "text" },
  },

  // 기본으로 전달될 Props를 설정
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Header 스토리 정의
export const BasicHeader: Story = {
  args: {
    type: "basic",
  },
};

// Login Header 스토리 정의 (비로그인 유저)
export const LoginHeader: Story = {
  args: {
    type: "login",
  },
};

// Main Header 스토리 정의
export const MainHeader: Story = {
  args: {
    type: "main",
    activeBtn: [
      <AddCircle
        className="active-icon-btn"
        onClick={() => console.log("Hello")}
      />,
      <Notification
        className="active-icon-btn"
        onClick={() => console.log("알림 Hello")}
      />,
      <Search
        className="active-icon-btn"
        onClick={() => console.log("서치 Hello")}
      />,
    ],
  },
};

// Title Header 스토리 정의
export const TitleHeader: Story = {
  args: {
    type: "title",
    label: "title",
    activeBtn: [
      <AddCircle
        className="active-icon-btn"
        onClick={() => console.log("Hello")}
      />,
      <Notification
        className="active-icon-btn"
        onClick={() => console.log("알림 Hello")}
      />,
      <Search
        className="active-icon-btn"
        onClick={() => console.log("서치 Hello")}
      />,
    ],
  },
};
