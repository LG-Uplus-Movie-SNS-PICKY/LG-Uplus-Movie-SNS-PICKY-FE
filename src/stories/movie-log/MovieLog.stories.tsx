import type { Meta, StoryObj } from "@storybook/react";
import { MovieLog } from "./";

import image1 from "@assets/images/dummy/image1.jpeg";
import image2 from "@assets/images/dummy/image2.jpeg";
import image3 from "@assets/images/dummy/image3.jpeg";

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
  args: {
    boardContent: [
      {
        board_content_id: 1,
        board_content_url: image1,
        board_content_type: "Image",
      },
      {
        board_content_id: 2,
        board_content_url: image2,
        board_content_type: "Image",
      },
      {
        board_content_id: 3,
        board_content_url: image3,
        board_content_type: "Image",
      },
    ],
  },
};
