import React from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const Typography = ({ size, children, className, ...props }: Props) => {
  let styles = "";
  if (size === 80) {
    styles =
      "text-[48px] md:text-[56px] lg:text-[64px] xl:text-[72px] 2xl:text-[80px]";
  } else if (size === 72) {
    styles = "text-[48px] md:text-[56px] lg:text-[64px] xl:text-[72px]";
  } else if (size === 48) {
    styles = "text-[32px] lg:text-[36px] xl:text-[40px] 2xl:text-[48px]";
  } else if (size === 40) {
    styles =
      "text-[24px] md:text-[28px] lg:text-[30px] xl:text-[32px] 2xl:text-[40px]";
  } else if (size === 36) {
    styles = "text-[24px] lg:text-[28px] 2xl:text-[36px]";
  } else if (size === 28) {
    styles = "text-[24px] lg:text-[26px] 2xl:text-[28px]";
  } else if (size === 24) {
    styles =
      "text-[14px] md:text-[16px] lg:text-[18px] xl:text-[22px] 2xl:text-[24px]";
  } else if (size === 20) {
    styles = "text-[16px] xl:text-[20px]";
  } else {
    styles = "text-[14px] md:text-[16px] lg:text-[18px] 2xl:text-[20px]";
  }
  return (
    <div className={`${styles} ${className}`} {...props}>
      {children}
    </div>
  );
};

export default Typography;
