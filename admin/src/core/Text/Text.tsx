import React, { FC } from "react";

export const Text: FC<any> = ({ className, children, ...props }) => (
  <p className={`font-gilroy font-light ${className}`} {...props}>
    {children}
  </p>
);
