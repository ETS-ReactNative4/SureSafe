import React, { FC } from "react";

export const H2: FC<any> = ({ className, children, ...props }) => (
  <h2
    className={`font-gilroy font-black phone:text-2xl tablet:text-3xl laptop:text-4xl desktop:text-5xl ${className}`}
    {...props}
  >
    {children}
  </h2>
);
