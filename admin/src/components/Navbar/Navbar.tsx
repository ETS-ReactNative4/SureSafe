import React from "react";
import { Div, H3 } from "@suresafe/core";

export const Navbar = ({ title }: any) => {
  return (
    <Div
      className={`w-full h-20 bg-main py-5 px-5 items-center justify-center`}
    >
      <H3 className={`text-primary`}>{title}</H3>
    </Div>
  );
};
