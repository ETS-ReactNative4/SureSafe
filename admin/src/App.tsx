import React from "react";
import { Flex } from "@suresafe/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Dashboard, Authentication, Exposed } from "@suresafe/pages";

export const App = () => {
  return (
    <Router>
      <Flex className="bg-main phone:pl-24 tablet:pl-64 laptop:pl-64 desktop:pl-72">
        <Flex className={`bg-secondary`}>
          <Switch>
            <Route exact path="/" component={Authentication} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/exposed" component={Exposed} />
          </Switch>
        </Flex>
      </Flex>
    </Router>
  );
};
