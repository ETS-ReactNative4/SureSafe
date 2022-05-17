import React from "react";
import { Div, Text, H6 } from "@suresafe/core";

export const InfectedCard = ({ data, onSelect, potentail }: any) => {
  const newDate = new Date(data?.date);

  return (
    <div
      onClick={() => onSelect()}
      className={`w-full h-28 bg-main rounded-lg p-4 flex flex-row items-center mb-5 cursor-pointer`}
    >
      {/* <Div className={`w-20 h-20 bg-primary rounded-full mr-5`}></Div> */}
      <Div className={`mr-auto`}>
        <H6 className={`text-primary`}>{data?.name}</H6>
        <Text className={`text-lg text-primary`}>
          {newDate.toString().substring(0, 15)}
        </Text>
      </Div>
      {!potentail ? (
        <Div
          className={`w-44 h-20 bg-green-200 rounded-lg mr-3 px-4 py-2 flex flex-row items-center`}
        >
          <i
            className={`fas fa-heartbeat text-center text-4xl text-primary`}
          ></i>
          <Div className={`ml-3`}>
            <Text className={`text-primary text-base font-medium m-0 p-0`}>
              Exposed
            </Text>
            <Text className={`text-primary text-2xl font-extrabold m-0 p-0`}>
              {data?.totalExposed}
            </Text>
          </Div>
        </Div>
      ) : (
        <></>
      )}

      <Div
        className={`w-44 h-20 bg-green-200 rounded-lg px-4 py-2 flex flex-row items-center`}
      >
        <i
          className={`fas fa-users-medical text-center text-4xl text-primary`}
        ></i>
        <Div className={`ml-3`}>
          <Text className={`text-primary text-base font-medium m-0 p-0`}>
            Exposure
          </Text>
          <Text className={`text-primary text-xl font-extrabold m-0 p-0`}>
            {data?.exposure}
          </Text>
        </Div>
      </Div>
    </div>
  );
};
