import React, { FC } from "react";

export const FlexCenter: FC<any> = ({ className, ...props }) => (
  <div
    className={`w-full h-full flex flex-col justify-center items-center bg-primary ${className}`}
    {...props}
  ></div>
);
