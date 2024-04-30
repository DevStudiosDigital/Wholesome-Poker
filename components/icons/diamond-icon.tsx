import React, { SVGProps } from "react";

const DiamondIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="12"
      height="21"
      viewBox="0 0 12 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M6 0.5L12 10.5L6 20.5L0 10.5L6 0.5Z" fill="white" />
    </svg>
  );
};

export default DiamondIcon;
