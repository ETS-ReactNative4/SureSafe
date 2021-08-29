import React, { useState } from "react";
import { Flex, Div, Images, FlexCenter } from "@suresafe/core";
import { TextInput, SubmitButton } from "@suresafe/components";
import { useHistory } from "react-router-dom";

export const Authentication = () => {
  const history = useHistory();
  const [submited, setSubmited] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const username = e.target[0].value;
    const password = e.target[1].value;
    setSubmited(true);
    if (username !== "" && password !== "") {
      history.push("/dashboard");
    }
  };

  return (
    <FlexCenter className={`fixed h-full w-full z-1 top-0 left-0 bg-secondary`}>
      <Div className={`h-20 w-full mb-auto bg-main`}></Div>
      <Div
        className={`h-3/4 phone:w-11/12 tablet:w-6/12 laptop:w-4/12 desktop:w-1/3 mb-auto rounded-xl flex flex-col justify-center items-center p-10 bg-primary`}
      >
        <img
          alt="SureSafe Logo"
          className="w-72 h-20 mb-auto"
          src={Images.sureSafeLogo}
        />
        <form
          className={`w-full h-full py-14 phone:px-7 tablet:px-10 laptop:px-12 desktop:px-14`}
          onSubmit={(e) => handleSubmit(e)}
        >
          <Flex className={`w-full h-full items-center`}>
            <TextInput
              name="Username"
              placeholder="Enter your username"
              type="text"
              isSubmited={submited}
            />
            <TextInput
              name="Password"
              placeholder="Enter your password"
              type="password"
              isSubmited={submited}
            />
            <SubmitButton value="Sign In" />
          </Flex>
        </form>
      </Div>
    </FlexCenter>
  );
};
