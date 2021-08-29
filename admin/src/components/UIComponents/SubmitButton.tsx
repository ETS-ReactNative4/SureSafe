import React, { FC } from "react";

interface SubmitButtonProps {
  value?: string;
}

export const SubmitButton: FC<SubmitButtonProps> = ({ value }) => {
  return (
    <input
      className={`w-56 h-16 shadow mt-5 bg-main hover:bg-green-200 cursor-pointer phone:text-xl tablet:text-xl laptop:text-2xl desktop:text-2xl text-primary font-gilroy font-bold py-2 px-4 rounded`}
      type="submit"
      value={value}
    />
  );
};
