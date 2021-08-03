import React, { FC } from "react";

export const H5: FC<any> = ({ className, children, ...props }) => (
  <h5 className={`font-gilroy font-extrabold text-2xl ${className}`} {...props}>
    {children}
  </h5>
);
