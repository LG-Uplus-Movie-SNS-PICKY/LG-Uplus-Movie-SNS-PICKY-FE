import * as React from "react";
import type { SVGProps } from "react";
const SvgBtnNaver = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 20 20"
    {...props}
  >
    <g clipPath="url(#btn_naver_svg__a)">
      <path
        fill="#03C75A"
        d="M18 20H2c-1.1 0-2-.9-2-2V2C0 .9.9 0 2 0h16c1.1 0 2 .9 2 2v16c0 1.1-.9 2-2 2"
      />
      <path
        fill="#fff"
        d="M11.35 10.25 8.5 6.2H6.15v7.6h2.5V9.75l2.85 4.05h2.35V6.2h-2.5z"
      />
    </g>
    <defs>
      <clipPath id="btn_naver_svg__a">
        <path fill="#fff" d="M0 0h20v20H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgBtnNaver;
