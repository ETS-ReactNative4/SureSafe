import React from "react";
import { FlexRow, Div, Text, Images, Flex } from "@suresafe/core";
import { BrowserRouter } from "react-router-dom";
import { Sidebar } from "@suresafe/components";

export const App = () => {
  return (
    <BrowserRouter>
      <FlexRow className="bg-main">
        <Sidebar />
      </FlexRow>
    </BrowserRouter>
  );
};
