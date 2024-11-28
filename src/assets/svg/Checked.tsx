import * as React from "react";
import type { SVGProps } from "react";
const SvgChecked = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 20 21"
    {...props}
  >
    <path
      fill="#FF084A"
      d="M10 .18c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10m-2 15-5-5 1.41-1.41L8 12.35l7.59-7.59L17 6.18z"
    />
  </svg>
);
export default SvgChecked;
