import React, { FC } from "react";

export const H4: FC<any> = ({ className, children, ...props }) => (
  <h4 className={`font-gilroy font-bold text-3xl ${className}`} {...props}>
    {children}
  </h4>
);
