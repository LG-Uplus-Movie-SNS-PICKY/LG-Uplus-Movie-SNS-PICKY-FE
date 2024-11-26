import { css } from "@emotion/react";
import emotionReset from "emotion-reset";

export const globalStyle = css`
  ${emotionReset}

  @font-face {
    font-family: "Pretendard";
    src: url("/fonts/PretendardVariable.woff2") format("woff2-variations");
    font-weight: 400 600 900;
    font-style: normal;
  }

  @font-face {
    font-family: "Roboto";
    src: url("/fonts/Roboto-Regular.ttf") format("truetype");
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: "Roboto";
    src: url("/fonts/Roboto-Bold.ttf") format("truetype");
    font-weight: 700;
    font-style: normal;
  }

  * {
    font-family: "Pretendard", sans-serif;
  }

  html {
    font-family: "Pretendard Variable", Pretendard, -apple-system,
      BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI",
      "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic",
      "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
    box-sizing: border-box;
    line-height: 1.5;
  }

  body {
    margin: 0 auto;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    font-family: "Pretendard", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /* background-color: #f8f8f8; */
    width: 100%;
    min-height: 100vh;
    letter-spacing: -0.4px; //자간 -4%
  }

  .page {
    width: 100%;
    max-width: 393px;
    margin: 0 auto;
}

  body::-webkit-scrollbar {
    display: none;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
`;
