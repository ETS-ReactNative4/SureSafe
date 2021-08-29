import React, { FC } from "react";

export const H1: FC<any> = ({ className, children, ...props }) => (
  <h1
    className={`font-gilroy font-black phone:text-3xl tablet:text-4xl laptop:text-5xl desktop:text-6xl ${className}`}
    {...props}
  >
    {children}
  </h1>
);
