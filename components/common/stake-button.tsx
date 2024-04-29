import React, { ButtonHTMLAttributes } from "react";

const StakeButton = ({
  className,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={
        "bg-white text-black rounded-[12px] xl:rounded-[16px] text-[16px] lg:text-[20px] py-3.5 w-full flex items-center justify-center " +
        className
      }
      {...props}
    >
      {children}
    </button>
  );
};

export default StakeButton;
