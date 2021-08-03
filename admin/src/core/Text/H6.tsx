import React, { FC } from "react";

export const H6: FC<any> = ({ className, children, ...props }) => (
  <h6 className={`font-gilroy font-bold text-1xl ${className}`} {...props}>
    {children}
  </h6>
);
