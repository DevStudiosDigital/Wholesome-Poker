import React from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const Typography = ({ size, children, className, ...props }: Props) => {
  let styles = "";
  if (size === 120) {
    styles =
      "text-[48px] md:text-[56px] lg:text-[64px] xl:text-[72px] 2xl:text-[120px]";
  } else if (size === 72) {
    styles = "text-[48px] md:text-[56px] lg:text-[64px] xl:text-[72px]";
  } else if (size === 60) {
    styles = "text-[32px] lg:text-[36px] xl:text-[40px] 2xl:text-[60px]";
  } else if (size === 40) {
    styles =
      "text-[24px] md:text-[28px] lg:text-[30px] xl:text-[32px] 2xl:text-[40px]";
  } else if (size === 36) {
    styles = "text-[24px] lg:text-[28px] 2xl:text-[36px]";
  } else if (size === 28) {
    styles =
      "text-[18px] md:text-[20px] lg:text-[22px] xl:text-[26px] 2xl:text-[28px]";
  } else if (size === 26) {
    styles =
      "text-[14px] md:text-[16px] lg:text-[18px] xl:text-[22px] 2xl:text-[26px]";
  } else if (size === 20) {
    styles = "text-[16px] xl:text-[20px]";
  } else {
    styles = "text-[14px] md:text-[16px] lg:text-[18px] 2xl:text-[24px]";
  }
  return (
    <div className={`${styles} ${className}`} {...props}>
      {children}
    </div>
  );
};

export default Typography;
