import React from "react";
import { H5, Div, H4, Flex, Text, H6 } from "@suresafe/core";
import { Sidebar, Navbar, OverviewItem, Chart } from "@suresafe/components";

export const Exposed = () => {
  return (
    <Flex>
      <Sidebar />
      <Navbar title="Dashboard" />
      <Flex className={`p-8 bg-secondary overflow-y-scroll`}>
        <H4 className={`text-fonts-100`}>Overview</H4>
        <Div
          className={`w-full mt-3 grid gap-4 phone:grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-4 desktop:grid-cols-4 mb-5`}
        >
          <OverviewItem
            title="Total Tracing"
            value="24k"
            color="bg-orange-200"
            icon="fas fa-users"
          />
          <OverviewItem
            title="Total Visits"
            value="12k"
            color="bg-lightblue"
            icon="fas fa-heartbeat"
          />
          <OverviewItem
            title="Potential"
            value="7k"
            color="bg-yellow-200"
            icon="fas fa-portrait"
          />
          <OverviewItem
            title="Exposed"
            value="5k"
            color="bg-lightred"
            icon="fas fa-skull-crossbones"
          />
        </Div>
        <Div
          className={`bg-secondary h-full w-full grid gap-4 phone:grid-cols-1 tablet:grid-cols-1 laptop:grid-cols-2 desktop:grid-cols-2`}
        >
          <Flex className={`bg-secondary h-full w-full rounded-lg`}>
            <H4 className={`text-fonts-100`}>Exposed</H4>
            <Flex className={`bg-primary h-full w-full rounded-lg mt-3 p-7`}>
              <Div className={`flex flex-row`}></Div>
              <Div
                className={`w-full h-28 bg-main rounded-lg p-4 flex flex-row items-center`}
              >
                <Div className={`w-20 h-20 bg-primary rounded-full mr-5`}></Div>
                <Div className={`mr-auto`}>
                  <H5 className={`text-primary`}>Jerico Navarro</H5>
                  <Text className={`text-xl text-primary`}>
                    Friday 9 April 2021
                  </Text>
                </Div>
                <Div
                  className={`w-44 h-20 bg-green-200 rounded-lg mx-3 p-4 flex flex-row items-start`}
                >
                  <i
                    className={`fas fa-qrcode text-center text-5xl text-primary phone:text-2xl tablet:text-3xl laptop:text-4xl desktop:text-5xl`}
                  ></i>
                  <Div className={`ml-3`}>
                    <Text className={`text-primary text-sm font-bold m-0 p-0`}>
                      Visits
                    </Text>
                    <H5 className={`text-primary text-sm font-bold`}>5000</H5>
                  </Div>
                </Div>
                <Div
                  className={`w-44 h-20 bg-green-200 rounded-lg mx-3 p-4 flex flex-row items-start`}
                >
                  <i
                    className={`fas fa-qrcode text-center text-5xl text-primary phone:text-2xl tablet:text-3xl laptop:text-4xl desktop:text-5xl`}
                  ></i>
                  <Div className={`ml-3`}>
                    <Text className={`text-primary text-sm font-bold m-0 p-0`}>
                      Visits
                    </Text>
                    <H5 className={`text-primary text-sm font-bold`}>5000</H5>
                  </Div>
                </Div>
              </Div>
            </Flex>
          </Flex>
        </Div>
      </Flex>
    </Flex>
  );
};
