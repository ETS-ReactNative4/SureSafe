import React, { FC } from "react";

export const H4: FC<any> = ({ className, children, ...props }) => (
  <h4
    className={`font-gilroy font-bold text-3xl phone:text-xl tablet:text-2xl laptop:text-2xl desktop:text-3xl ${className}`}
    {...props}
  >
    {children}
  </h4>
);
