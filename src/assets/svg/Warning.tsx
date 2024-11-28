import * as React from "react";
import type { SVGProps } from "react";
const SvgWarning = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 15 15"
    {...props}
  >
    <path
      fill="#FF084A"
      d="M7.5 1.25a6.25 6.25 0 1 0 0 12.5 6.25 6.25 0 0 0 0-12.5m0 10a.626.626 0 1 1 0-1.251.626.626 0 0 1 0 1.251m.625-3.125a.625.625 0 0 1-1.25 0v-3.75a.625.625 0 0 1 1.25 0z"
    />
  </svg>
);
export default SvgWarning;
