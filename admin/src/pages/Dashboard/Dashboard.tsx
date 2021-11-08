import React from "react";
import { FlexRow, Div, H4, Flex } from "@suresafe/core";
import { Sidebar, Navbar, OverviewItem, Chart } from "@suresafe/components";

export const Dashboard = () => {
  return (
    <Flex>
      <Sidebar />
      <Navbar title="Dashboard" />
      <Flex className={`p-8 bg-secondary overflow-y-scroll`}>
        <H4 className={`text-fonts-100`}>Overview</H4>
        <Div
          className={`w-full mt-3 grid gap-4 phone:grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-4 desktop:grid-cols-4`}
        >
          <OverviewItem
            title="Total Cases"
            value="24k"
            color="bg-orange-200"
            icon="fas fa-users"
          />
          <OverviewItem
            title="Recovered"
            value="12k"
            color="bg-lightblue"
            icon="fas fa-heartbeat"
          />
          <OverviewItem
            title="Infected"
            value="7k"
            color="bg-yellow-200"
            icon="fas fa-disease"
          />
          <OverviewItem
            title="Deaths"
            value="5k"
            color="bg-lightred"
            icon="fas fa-skull-crossbones"
          />
        </Div>
        <Div
          className={`w-full mt-3 grid gap-4 phone:grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-4 desktop:grid-cols-4`}
        >
          <OverviewItem
            title="Exposed"
            value="24k"
            color="bg-orange-200"
            icon="fas fa-exclamation"
          />
          <OverviewItem
            title="Vaccinated"
            value="12k"
            color="bg-lightblue"
            icon="fas fa-syringe"
          />
          <OverviewItem
            title="Users"
            value="7k"
            color="bg-yellow-200"
            icon="fas fa-user"
          />
          <OverviewItem
            title="Tracers"
            value="5k"
            color="bg-lightred"
            icon="fas fa-user-nurse"
          />
        </Div>
        <Div
          className={`bg-secondary grid gap-4 phone:grid-cols-1 tablet:grid-cols-1 laptop:grid-cols-2 desktop:grid-cols-2`}
        >
          <Flex className={`bg-secondary`}>
            <H4 className={`text-fonts-100 mt-5 mb-3`}>Chart</H4>
            <Chart
              labels={[
                "Potential",
                "Quarantined",
                "Tested",
                "Vacinated",
                "Infected",
                "Recovered",
              ]}
              datas={[12, 19, 3, 5, 2, 3]}
            />
          </Flex>
          <Flex className={`bg-secondary `}>
            <H4 className={`text-fonts-100 mt-5 mb-3`}>Chart</H4>
            <Chart
              labels={[
                "Potential",
                "Quarantined",
                "Tested",
                "Vacinated",
                "Infected",
                "Recovered",
              ]}
              datas={[12, 19, 3, 5, 2, 3]}
            />
          </Flex>
        </Div>
      </Flex>
    </Flex>
  );
};
