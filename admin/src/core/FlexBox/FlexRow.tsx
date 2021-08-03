import React, { FC } from "react";

export const FlexRow: FC<any> = ({ className, ...props }) => (
  <div
    className={`w-full h-full flex flex-row bg-primary ${className}`}
    {...props}
  ></div>
);
