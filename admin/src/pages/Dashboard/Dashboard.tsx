import React from "react";
import { FlexRow, Div, H4, Flex } from "@suresafe/core";
import { API } from "@suresafe/constants";
import { Sidebar, Navbar, OverviewItem, Chart } from "@suresafe/components";

export const Dashboard = () => {
  const [main, setMain] = React.useState<any>([]);

  const getData = async () => {
    const res = await fetch(`${API}/suresafe/api/admin/dashboard`);
    const data = await res.json();
    setMain(data.data);
  };

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <Flex>
      <Sidebar />
      <Navbar title="Dashboard" />
      <Flex className={`p-8 bg-secondary overflow-y-scroll`}>
        <H4 className={`text-fonts-100`}>Total Overview</H4>
        <Div
          className={`w-full mt-3 grid gap-4 phone:grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-4 desktop:grid-cols-4`}
        >
          <OverviewItem
            title="Cases"
            value={main?.totalCases || "0"}
            color="bg-orange-200"
            icon="fas fa-hospital-user"
          />
          <OverviewItem
            title="Infected"
            value={main?.infected || "0"}
            color="bg-lightred"
            icon="fas fa-radiation"
          />
          <OverviewItem
            title="Exposed"
            value={main?.exposed || "0"}
            color="bg-yellow-200"
            icon="fas fa-exclamation"
          />
          <OverviewItem
            title="Potential"
            value={main?.potential || "0"}
            color="bg-lightblue"
            icon="fas fa-heartbeat"
          />
        </Div>
        <Div
          className={`w-full mt-3 grid gap-4 phone:grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-3`}
        >
          <OverviewItem
            title="Total Users"
            value={main?.users || "0"}
            color="bg-green-200"
            icon="fas fa-users"
          />
          <OverviewItem
            title="Establishments"
            value={main?.establisments || "0"}
            color="bg-lightblue"
            icon="fas fa-building"
          />
          <OverviewItem
            title="Geo Tracing"
            value={main?.geotracing || "0"}
            color="bg-yellow-200"
            icon="fas fa-street-view"
          />
        </Div>
        <Div className={`bg-secondary mt-10`}>
          <Chart
            labels={["Potential", "Exposed", "Infected"]}
            datas={[
              main?.potential || 0,
              main?.exposed || 0,
              main?.infected || 0,
            ]}
          />
        </Div>
      </Flex>
    </Flex>
  );
};
