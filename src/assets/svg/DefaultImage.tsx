import * as React from "react";
import type { SVGProps } from "react";
const SvgDefaultImage = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 241 240"
    {...props}
  >
    <g clipPath="url(#defaultImage_svg__a)">
      <rect width={240} height={240} x={0.5} fill="#D9D9D9" rx={10} />
      <g fill="#5E5E5E" clipPath="url(#defaultImage_svg__b)">
        <path d="M120.5 120c6.627 0 12-5.373 12-12s-5.373-12-12-12-12 5.373-12 12 5.373 12 12 12" />
        <path d="M152.5 76h-12.68l-4.96-5.4a7.96 7.96 0 0 0-5.88-2.6h-16.96c-2.24 0-4.4.96-5.92 2.6l-4.92 5.4H88.5c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h64c4.4 0 8-3.6 8-8V84c0-4.4-3.6-8-8-8m-32 52c-11.04 0-20-8.96-20-20s8.96-20 20-20 20 8.96 20 20-8.96 20-20 20" />
      </g>
      <path
        fill="#9D9D9D"
        d="M63.876 163.887c0 3.066 2.031 6.211 4.492 7.422l-.937 1.23c-1.915-1.006-3.516-3.057-4.278-5.469-.781 2.569-2.422 4.756-4.375 5.801l-.976-1.23c2.539-1.25 4.55-4.59 4.57-7.754v-3.164h1.504zm7.617-4.668v7.051h2.91v1.328h-2.91v8.984H69.97v-17.363zm9.298 3.73c0 2.344 1.855 4.453 4.453 5.274l-.781 1.23c-2.022-.683-3.633-2.109-4.415-3.945-.761 1.982-2.392 3.545-4.453 4.297l-.8-1.231c2.597-.918 4.453-3.164 4.453-5.625v-1.015h-4.063v-1.25h9.61v1.25H80.79zm8.086-3.711v12.735h-1.524v-12.735zm.546 15.684v1.289H77.666v-5.449h1.523v4.16zm7.286-14.727-4.57 16.934h-1.523l4.55-16.934zm16.036 7.617v1.231h-15.84v-1.231h7.168v-2.031h-5.156v-5.742h11.856v1.231h-10.352v3.261h10.469v1.25h-5.332v2.031zm-7.929 2.5c3.73 0 5.957 1.133 5.976 3.126-.019 2.011-2.246 3.124-5.976 3.144-3.75-.02-5.996-1.133-5.996-3.144 0-1.993 2.246-3.126 5.996-3.126m0 1.211c-2.793 0-4.453.723-4.434 1.915-.019 1.21 1.641 1.914 4.434 1.914 2.754 0 4.433-.704 4.433-1.914 0-1.192-1.679-1.915-4.433-1.915m13.36-11.25c1.465-.009 2.715.538 3.515 1.465h4.551v-2.519h1.543v10.293h-1.543v-2.481h-4.531c-.82.928-2.07 1.475-3.535 1.465-2.598.02-4.512-1.68-4.512-4.101 0-2.442 1.914-4.141 4.512-4.122m0 1.329c-1.778-.02-3.047 1.152-3.047 2.793 0 1.621 1.269 2.793 3.047 2.793 1.719 0 3.008-1.172 3.008-2.793 0-1.641-1.289-2.813-3.008-2.793m3.847 8.32c3.594 0 5.821 1.211 5.821 3.301 0 2.109-2.227 3.32-5.821 3.32-3.613 0-5.82-1.211-5.82-3.32 0-2.09 2.207-3.301 5.82-3.301m0 1.191c-2.656 0-4.316.801-4.316 2.11s1.66 2.089 4.316 2.089c2.676 0 4.317-.781 4.317-2.089 0-1.309-1.641-2.11-4.317-2.11m.411-8.125c.146.43.234.899.234 1.407 0 .488-.088.947-.234 1.367h3.808v-2.774zm13.243-.957c0 2.364 1.796 4.531 4.316 5.391l-.84 1.211c-1.924-.703-3.437-2.139-4.199-3.945-.742 2.041-2.285 3.652-4.317 4.433l-.82-1.23c2.598-.977 4.336-3.301 4.356-5.977v-1.797h1.504zm7.773-2.812v4.531h2.617v1.289h-2.617v4.746h-1.523v-10.566zm-5.566 11.015c3.574 0 5.722 1.153 5.722 3.145 0 2.031-2.148 3.164-5.722 3.164s-5.762-1.133-5.762-3.164c0-1.992 2.187-3.145 5.762-3.145m0 1.231c-2.618 0-4.239.723-4.219 1.914-.02 1.23 1.601 1.933 4.219 1.953 2.636-.02 4.238-.723 4.238-1.953 0-1.191-1.602-1.914-4.238-1.914m28.517-1.738v1.289h-7.168v5.605h-1.504v-5.605h-7.149v-1.289zm-7.149-7.071c0 2.168 3.028 4.063 6.133 4.492l-.566 1.231c-2.686-.41-5.215-1.758-6.309-3.652-1.113 1.914-3.681 3.242-6.367 3.652l-.566-1.231c3.086-.429 6.152-2.304 6.152-4.492v-.019h-5.606v-1.25h5.606v-2.168h1.504v2.168h5.644v1.25h-5.625zm21.251-3.437v7.07h2.813v1.289h-2.813v9.004h-1.523v-17.363zm-4.492 1.875c0 4.922-2.305 9.394-7.969 12.187l-.859-1.211c4.492-2.236 6.933-5.576 7.285-9.687h-6.484v-1.289z"
      />
    </g>
    <defs>
      <clipPath id="defaultImage_svg__a">
        <rect width={240} height={240} x={0.5} fill="#fff" rx={10} />
      </clipPath>
      <clipPath id="defaultImage_svg__b">
        <path fill="#fff" d="M72.5 60h96v96h-96z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgDefaultImage;
