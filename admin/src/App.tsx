import React from "react";
import { FlexRow, Div, Text, H3, Flex } from "@suresafe/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Sidebar } from "@suresafe/components";
import { Dashboard } from "@suresafe/pages";

export const App = () => {
  return (
    <Router>
      <Flex className="bg-main pl-72">
        <Sidebar />
        <Flex className={`bg-secondary`}>
          <Switch>
            <Route exact path="/dashboard" component={Dashboard} />
          </Switch>
        </Flex>
      </Flex>
    </Router>
  );
};
