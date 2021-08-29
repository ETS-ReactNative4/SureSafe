import React, { useState, FC } from "react";
import { Div } from "@suresafe/core";

interface TextInputProps {
  name?: string;
  placeholder?: string;
  type?: string;
  isSubmited?: boolean;
}

export const TextInput: FC<TextInputProps> = ({
  type,
  name,
  placeholder,
  isSubmited,
}) => {
  const [value, setValue] = useState("");

  return (
    <Div className={`w-full pb-3`}>
      <label
        className={`font-gilroy font-semibold text-xl text-main pb-1 pl-2`}
      >
        {name}
      </label>
      <input
        type={type}
        value={value}
        name={name}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className={`w-full h-16 rounded-xl ${
          isSubmited && value === "" ? "border-2 border-lightred" : "border-0"
        } mb-3 px-6 bg-secondary font-gilroy text-lg text-fonts-100`}
      />
      {isSubmited && value === "" ? (
        <p className="text-lightred text-sm text font-gilroy pl-2">
          Please fill out this field.
        </p>
      ) : (
        <></>
      )}
    </Div>
  );
};
