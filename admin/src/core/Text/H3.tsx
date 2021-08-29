import React, { FC } from "react";

export const H3: FC<any> = ({ className, children, ...props }) => (
  <h3
    className={`font-gilroy font-extrabold phone:text-2xl tablet:text-2xl laptop:text-3xl desktop:text-4xl ${className}`}
    {...props}
  >
    {children}
  </h3>
);
