import * as React from "react";
import type { SVGProps } from "react";
const SvgArrowLeft = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 25 25"
    width={24}
    height={24}
    {...props}
  >
    <g clipPath="url(#arrowLeft_svg__a)">
      <path
        fill="#C8C8C8"
        d="M22.5 12.5c0-5.52-4.48-10-10-10s-10 4.48-10 10 4.48 10 10 10 10-4.48 10-10m-12 0 4-4v8z"
      />
    </g>
    <defs>
      <clipPath id="arrowLeft_svg__a">
        <path fill="#fff" d="M24.5.5v24H.5V.5z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgArrowLeft;
