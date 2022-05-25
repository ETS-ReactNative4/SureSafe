import React from "react";
import { Div, Text, H6 } from "@suresafe/core";
const formatAMPM = (date: any) => {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
};

export const VisitsItem = ({ data }: any) => {
  const newDate = new Date(data?.visitDate);

  return (
    <div
      className={`w-full h-28 bg-main rounded-lg p-4 flex flex-row items-center mb-5`}
    >
      {/* <Div className={`w-20 h-20 bg-primary rounded-full mr-5`}></Div> */}
      <Div className={`mr-auto`}>
        <H6 className={`text-primary`}>{data?.estabName}</H6>
        <Text className={`text-lg text-primary`}>
          {" "}
          {newDate.toString().substring(0, 15)}
        </Text>
      </Div>
      <Div
        className={`w-52 h-20 bg-green-200 rounded-lg mr-3 px-4 py-2 flex flex-row items-center`}
      >
        <i className={`fas fa-hourglass text-center text-4xl text-primary`}></i>
        <Div className={`ml-3`}>
          <Text className={`text-primary text-base font-medium m-0 p-0`}>
            Time
          </Text>
          <Text className={`text-primary text-2xl font-extrabold m-0 p-0`}>
            {formatAMPM(newDate)}
          </Text>
        </Div>
      </Div>
      <Div
        className={` h-20 bg-green-200 rounded-lg mr-3 px-4 py-2 flex flex-row items-center`}
      >
        <i
          className={`fas fa-address-card text-center text-4xl text-primary`}
        ></i>
        <Div className={`ml-3`}>
          <Text className={`text-primary text-base font-medium m-0 p-0`}>
            Address
          </Text>
          <Text className={`text-primary text-2xl font-extrabold m-0 p-0`}>
            {data?.estabAddress}
          </Text>
        </Div>
      </Div>
    </div>
  );
};
