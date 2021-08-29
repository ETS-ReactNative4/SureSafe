import React, { FC } from "react";
import { Div, H6, H2 } from "@suresafe/core";

interface OverviewItemProps {
  color?: string;
  title?: string;
  value?: string;
  icon?: string;
}

export const OverviewItem: FC<OverviewItemProps> = ({
  color,
  title,
  value,
  icon,
}) => {
  return (
    <Div className={`w-full rounded-xl px-6 py-6 flex flex-row bg-primary`}>
      <Div
        className={`h-full w-24 px-5 rounded-xl flex justify-center items-center text-primary phone:w-14 tablet:w-16 laptop:w-20 desktop:w-24 ${color}`}
      >
        <i
          className={`${icon} text-center text-5xl text-primary phone:text-2xl tablet:text-3xl laptop:text-4xl desktop:text-5xl`}
        ></i>
      </Div>
      <Div className={`w-full h-full pl-3 flex flex-col justify-center`}>
        <H6 className="text-fonts-100">{title}</H6>
        <H2 className="text-fonts-100">{value}</H2>
      </Div>
    </Div>
  );
};
