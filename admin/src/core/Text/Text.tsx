import React, { FC } from "react";

export const Text: FC<any> = ({ className, children, ...props }) => (
  <p
    className={`font-gilroy font-light text-2xl text-fonts-100 ${className}`}
    {...props}
  >
    {children}
  </p>
);
