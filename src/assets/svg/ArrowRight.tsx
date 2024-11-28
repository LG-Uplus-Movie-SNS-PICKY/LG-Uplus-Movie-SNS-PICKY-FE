import * as React from "react";
import type { SVGProps } from "react";
const SvgArrowRight = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 25 25"
    width={24}
    height={24}
    {...props}
  >
    <g clipPath="url(#arrowRight_svg__a)">
      <path
        fill="#C8C8C8"
        d="M2.5 12.5c0 5.52 4.48 10 10 10s10-4.48 10-10-4.48-10-10-10-10 4.48-10 10m12 0-4 4v-8z"
      />
    </g>
    <defs>
      <clipPath id="arrowRight_svg__a">
        <path fill="#fff" d="M.5 24.5V.5h24v24z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgArrowRight;
