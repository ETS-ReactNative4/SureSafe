import React, { FC } from "react";

export const FlexRowCenter: FC<any> = ({ className, ...props }) => (
  <div
    className={`w-full h-full flex flex-row justify-center items-center bg-primary ${className}`}
    {...props}
  ></div>
);
