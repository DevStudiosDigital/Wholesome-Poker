import React, { SVGProps } from "react";

const TwitterIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M0.0760975 1L12.1233 17.1571L0 30.2898H2.73L13.3409 18.7885L21.9161 30.2898H31.2L18.4774 13.2263L29.7589 1H27.0337L17.2599 11.5901L9.36476 1H0.0760975ZM4.09024 3.01308H8.35646L27.1906 28.2719H22.9244L4.09024 3.01308Z"
        fill="white"
      />
    </svg>
  );
};

export default TwitterIcon;
