import React, { FC } from "react";

export const H1: FC<any> = ({ className, children, ...props }) => (
  <h1 className={`font-gilroy font-black text-6xl ${className}`} {...props}>
    {children}
  </h1>
);
