import React from "react";
import { Flex } from "@suresafe/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Dashboard, Authentication, Exposed, Infected } from "@suresafe/pages";

export const App = () => {
  return (
    <Router>
      <Flex className="bg-main phone:pl-24 tablet:pl-64 laptop:pl-64 desktop:pl-72 scrollbar-hide">
        <Flex className={`bg-secondary scrollbar-hide`}>
          <Switch>
            <Route exact path="/" component={Authentication} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/exposed" component={Exposed} />
            <Route exact path="/infected" component={Infected} />
          </Switch>
        </Flex>
      </Flex>
    </Router>
  );
};
