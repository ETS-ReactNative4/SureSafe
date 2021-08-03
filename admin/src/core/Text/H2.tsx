import React, { FC } from "react";

export const H2: FC<any> = ({ className, children, ...props }) => (
  <h2 className={`font-gilroy font-black text-5xl ${className}`} {...props}>
    {children}
  </h2>
);
