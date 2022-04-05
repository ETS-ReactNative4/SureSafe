import React from "react";
import { H5, Div, H4, Flex, Text, H6, FlexRow } from "@suresafe/core";
import { Sidebar, Navbar, OverviewItem, ItemCard } from "@suresafe/components";

export const Infected = () => {
  return (
    <Flex className={"scrollbar-hide"}>
      <Sidebar />
      <Navbar title="Dashboard" />
      <Flex
        className={`p-8 bg-secondary overflow-y-scroll overflow-x-hidden scrollbar-hide`}
      >
        <H4 className={`text-fonts-100`}>Overview</H4>
        <Div
          className={`w-full mt-3 grid gap-4 phone:grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-3 mb-5`}
        >
          <OverviewItem
            title="Total Infected"
            value="24k"
            color="bg-orange-200"
            icon="fas fa-users"
          />
          <OverviewItem
            title="Infected Today"
            value="12k"
            color="bg-lightblue"
            icon="fas fa-heartbeat"
          />
          <OverviewItem
            title="Potential Exposed"
            value="7k"
            color="bg-yellow-200"
            icon="fas fa-portrait"
          />
        </Div>
        <Div className={`bg-secondary w-full flex flex-row`}>
          <Div className={`w-9/12 mb-12`}>
            <H4 className={`text-fonts-100`}>Infected</H4>
            <Flex className={`bg-primary h-full w-full rounded-lg mt-3 p-7`}>
              <ItemCard />
            </Flex>
          </Div>
          <Flex className={`bg-secondary h-full w-96 rounded-lg pl-5`}>
            <H4 className={`text-fonts-100`}>Details</H4>
            <Flex className={`bg-primary h-auto w-full rounded-lg mt-3 p-7`}>
              <H5 className={`text-fonts-100`}>Information</H5>
              <FlexRow className={`items-center h-auto mt-8 mb-10`}>
                <Div className={`h-60 w-60 bg-main rounded-full mr-10`}></Div>
                <Div>
                  <Text
                    className={`font-bold font-gilroy text-3xl text-fonts-100 mb-2`}
                  >
                    Jerico Navarro
                  </Text>
                  <Text
                    className={`font-normal font-gilroy text-xl text-fonts-100 mb-1`}
                  >
                    jericoxnavarro16@gmail.com
                  </Text>
                  <Text
                    className={`font-normal font-gilroy text-xl text-fonts-100 mb-1`}
                  >
                    Anonang Mayor Caoayan Ilocos Sur
                  </Text>
                  <Div
                    className={`p-4 bg-main rounded-lg w-56 flex justify-center mt-4`}
                  >
                    <Text
                      className={`font-bold font-gilroy text-xl text-primary`}
                    >
                      Fiday 9 April 2021
                    </Text>
                  </Div>
                </Div>
              </FlexRow>
              <H5 className={`text-fonts-100 mb-5`}>Potential Exposed</H5>
              <ItemCard />
              <ItemCard />
              <ItemCard />
              <ItemCard />
              <ItemCard />
            </Flex>
          </Flex>
        </Div>
      </Flex>
    </Flex>
  );
};
