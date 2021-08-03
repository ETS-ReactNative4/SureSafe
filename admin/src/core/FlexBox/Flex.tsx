import React, { FC } from "react";

export const Flex: FC<any> = ({ className, ...props }) => (
  <div
    className={`w-full h-full flex flex-col bg-primary ${className}`}
    {...props}
  ></div>
);
