import React from "react";
import { Div, Text, H6 } from "@suresafe/core";
import Swal from "sweetalert2";
import { API } from "@suresafe/constants";

export const ListItem = ({ data }: any) => {
  const newDate = new Date(data?.logDate);
  const sureSafeId = `SS-${data?.userID.substring(
    data.userID.length - 4,
    data.userID.length
  )}`;

  const shareData = async () => {
    Swal.fire({
      title: `Do you share ${sureSafeId}'s datas?`,
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await fetch(
          `${API}/suresafe/api/share/logs/exposed/${data?.userID}`,
          {
            method: "POST",
          }
        );
        const resdata = await res.json();
        console.log("resdata", resdata);
        Swal.fire("SUCCESS", `Successfully shared data's`, "success").then(
          () => {
            window.location.reload();
          }
        );
      }
    });
  };

  return (
    <div
      className={`w-full h-36 bg-main rounded-lg p-4 flex flex-row items-center mb-5`}
    >
      {/* <Div className={`w-20 h-20 bg-primary rounded-full mr-5`}></Div> */}

      <Div className={`mr-auto`}>
        <H6 className={`text-primary`}>{sureSafeId}</H6>
        <Text className={`text-lg text-primary`}>
          {newDate.toString().substring(0, 15)}
        </Text>
        <button
          onClick={() => shareData()}
          type="button"
          className="bg-lightred text-white focus:ring-4 focus:ring-lightred 
                font-bold rounded-lg text-lg px-10 py-2.5 mr-2"
        >
          Share Data
        </button>
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
            {data?.time?.toFixed(2)} min
          </Text>
        </Div>
      </Div>
      <Div
        className={`w-52 h-20 bg-green-200 rounded-lg px-4 py-2 flex flex-row items-center`}
      >
        <i
          className={`fas fa-user-check text-center text-4xl text-primary`}
        ></i>
        <Div className={`ml-3`}>
          <Text className={`text-primary text-base font-medium m-0 p-0`}>
            Status
          </Text>
          <Text className={`text-primary text-xl font-extrabold m-0 p-0`}>
            {data?.status}
          </Text>
        </Div>
      </Div>
    </div>
  );
};
