import React from "react";
import { Div, Text, H6 } from "@suresafe/core";

export const ItemCard = () => {
  return (
    <Div
      className={`w-full h-28 bg-main rounded-lg p-4 flex flex-row items-center mb-5`}
    >
      {/* <Div className={`w-20 h-20 bg-primary rounded-full mr-5`}></Div> */}
      <Div className={`mr-auto`}>
        <H6 className={`text-primary`}>Jerico Navarro</H6>
        <Text className={`text-lg text-primary`}>Friday 9 April 2021</Text>
      </Div>
      <Div
        className={`w-44 h-20 bg-green-200 rounded-lg mr-3 px-4 py-2 flex flex-row items-center`}
      >
        <i className={`fas fa-qrcode text-center text-4xl text-primary`}></i>
        <Div className={`ml-3`}>
          <Text className={`text-primary text-base font-medium m-0 p-0`}>
            Tracing
          </Text>
          <Text className={`text-primary text-2xl font-extrabold m-0 p-0`}>
            5000
          </Text>
        </Div>
      </Div>
      <Div
        className={`w-44 h-20 bg-green-200 rounded-lg px-4 py-2 flex flex-row items-center`}
      >
        <i className={`fas fa-qrcode text-center text-4xl text-primary`}></i>
        <Div className={`ml-3`}>
          <Text className={`text-primary text-base font-medium m-0 p-0`}>
            Visits
          </Text>
          <Text className={`text-primary text-2xl font-extrabold m-0 p-0`}>
            5000
          </Text>
        </Div>
      </Div>
    </Div>
  );
};
