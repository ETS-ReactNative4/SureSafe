import React, { FC } from "react";

export const H3: FC<any> = ({ className, children, ...props }) => (
  <h3 className={`font-gilroy font-extrabold text-4xl ${className}`} {...props}>
    {children}
  </h3>
);
