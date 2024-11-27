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

// src?: string;
//   title?: string;
//   rate?: number;
//   like?: number;
//   comment?: number;
//   state: string;
//   name: string;

export const BasicMovieItem: Story = {
  args: {
    type: "basic",
    src: "https://i.namu.wiki/i/fBt_IWG9AADxLWh-QjXKZR_PsD-IpY1EhD50Sg4UhbkPTVcMUaIPz-soaZlh1BUyYgavsEHqqmfZIV7-unONBw.webp",
    title: "어바웃타임",
    name: "abouttime",
  },
};
export const RateMovieItem: Story = {
  args: {
    type: "rate",
    src: "https://i.namu.wiki/i/J-AwFq-6xzVxDQpE3q3CwCL_QBzYfL6MPINXL1kWPeNlZXWNjayXfzXqqyi8luo4m4GM9Bsh_nhy9Ig3m5a8FQ.webp",
    rate: 4.9,
    like: 274,
    comment: 49,
    title: "타이타닉",
    name: "titanic",
  },
};
export const AllInfoMovieItem: Story = {
  args: {
    type: "all",
    src: "https://i.namu.wiki/i/-zJTS_4c7nAKP4XhoLGBWUY1iyb8NYJuRFJjBJzPEXzKit-BYEfNuaLwQjReAI4bdODTDEKwxt5m-xvPEidyNQ.webp",
    rate: 4.2,
    like: 129,
    comment: 21,
    title: "록키 1",
    name: "rocky-1",
  },
};
