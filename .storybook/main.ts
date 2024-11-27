import type { StorybookConfig } from "@storybook/react-vite";

import { InlineConfig } from "vite";

import svgr from "vite-plugin-svgr";
import path from "path";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  viteFinal: (config: InlineConfig) => {
    config.plugins = [...(config.plugins || []), svgr()];
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      "@assets": path.resolve(__dirname, "../src/assets"),
    };
    return config;
  },
};
export default config;
