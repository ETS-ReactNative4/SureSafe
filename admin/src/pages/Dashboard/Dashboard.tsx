import React from "react";
import { FlexRow, Div, Text, H4, Flex, H6, H2 } from "@suresafe/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar, OverviewItem } from "@suresafe/components";

export const Dashboard = () => {
  return (
    <Flex>
      <Navbar title="Dashboard" />
      <Flex className={`p-8 bg-secondary`}>
        <H4 className={`text-fonts-100`}>Overview</H4>
        <Div className={`w-full h-32 mt-3 flex flex-row space-x-4`}>
          <OverviewItem
            title="Total Cases"
            value="24k"
            color="bg-main"
            icon="fas fa-users"
          />
          <OverviewItem
            title="Recovered"
            value="12k"
            color="bg-green-200"
            icon="fas fa-heartbeat"
          />
          <OverviewItem
            title="Suspected"
            value="7k"
            color="bg-yellow-200"
            icon="fas fa-exclamation"
          />
          <OverviewItem
            title="Deaths"
            value="5k"
            color="bg-lightred"
            icon="fas fa-skull-crossbones"
          />
        </Div>
      </Flex>
    </Flex>
  );
};
