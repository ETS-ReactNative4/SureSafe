import React, { FC } from "react";

export const H6: FC<any> = ({ className, children, ...props }) => (
  <h6
    className={`font-gilroy font-bold phone:text-sm tablet:text-base laptop:text-base desktop:text-lg ${className}`}
    {...props}
  >
    {children}
  </h6>
);
