import React, { FC } from "react";

export const Div: FC<any> = ({ className, ...props }) => (
  <div className={`${className}`} {...props}></div>
);
