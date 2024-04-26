import React, { ButtonHTMLAttributes } from "react";

const StakeButton = ({
  className,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={
        "bg-white text-black rounded-[16px] lg:rounded-[24px] text-[16px] lg:text-[24px] py-5 w-full flex items-center justify-center " +
        className
      }
      {...props}
    >
      {children}
    </button>
  );
};

export default StakeButton;
