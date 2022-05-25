import React from "react";
import { Images } from "@suresafe/core";

export const Report = ({ elementID, data }: any) => {
  return (
    <div
      id={elementID}
      style={{
        width: "1000px",
        height: "1300px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#EFF3FA",
        padding: "50px",
        paddingLeft: "90px",
        paddingRight: "90px",
        paddingBottom: "80px",
        flexDirection: "column",
      }}
    >
      <img
        src={Images.sureSafeLogo}
        width="400px"
        height="100px"
        alt={"Logo"}
      />
      <h1
        style={{
          marginTop: "40px",
          marginBottom: "10px",
          color: "#223141",
          fontFamily: "Gilroy Extrabold",
          fontSize: "50px",
        }}
      >
        Exposed Report
      </h1>
      <p
        style={{ fontSize: "25px", fontFamily: "Gilroy", marginBottom: "30px" }}
      >
        This is the list of exposed person as of May 25 2022
      </p>
      <table
        className={`font-gilroy text-center overflow-scroll scrollbar-hide mb-auto`}
      >
        <tbody>
          <tr>
            <th className="bg-main text-white p-5 border border-white w-96">
              SureSafe ID
            </th>
            <th className="bg-main text-white p-5 border border-white w-96">
              Name
            </th>
            <th className="bg-main text-white p-5 border border-white w-96">
              Address
            </th>
            <th className="bg-main text-white p-5 border border-white w-96">
              Exposed
            </th>
            <th className="bg-main text-white p-5 border border-white w-96">
              Date
            </th>
            <th className="bg-main text-white p-5 border border-white w-96">
              Exposure
            </th>
          </tr>
          {data.map((value: any) => {
            const sureSafeId = `SS-${value?.userID.substring(
              value.userID.length - 4,
              value.userID.length
            )}`;
            const newDate = new Date(value?.date);
            console.log("value", value);
            return (
              <tr key={value?.userID}>
                <td className="bg-primary p-5 border border-white">
                  {sureSafeId}
                </td>
                <td className="bg-primary p-5 border border-white">
                  {value?.name}
                </td>
                <td className="bg-primary p-5 border border-white">
                  {value?.barangay}, {value?.municipality}
                </td>
                <td className="bg-primary p-5 border border-white">
                  {value?.totalExposed}
                </td>
                <td className="bg-primary p-5 border border-white">
                  {newDate.toString().substring(0, 15)}
                </td>
                <td className="bg-primary p-5 border border-white">
                  {value?.exposure}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
