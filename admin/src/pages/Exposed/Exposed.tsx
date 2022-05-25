import React from "react";
import { H5, Div, H4, Flex, Text, H6, FlexRow } from "@suresafe/core";
import { API } from "@suresafe/constants";
import {
  Sidebar,
  Navbar,
  ListItem,
  ItemCard,
  VisitsItem,
  Report,
} from "@suresafe/components";
import axios from "axios";
import Swal from "sweetalert2";
const domtoimage = require("dom-to-image");

export const Exposed = () => {
  const [main, setMain] = React.useState<any>([]);
  const [selectedUser, setSelectedUser] = React.useState<any>();

  const getData = async () => {
    const res = await fetch(`${API}/suresafe/api/admin/exposed`);
    const data = await res.json();
    setMain(data.data);
  };

  const getReport = async () => {
    const res = await fetch(`${API}/suresafe/api/admin/report/exposed`);
    const data = await res.json();
    console.log(data);
    window.open(`${API}/suresafe/${data.fileName}`);
  };

  const downloadPdf = async () => {
    let node = document.getElementById("report");
    await domtoimage.toBlob(node).then(async (blob: any) => {
      const myBlob = new Blob([blob], { type: "application/pdf" });
      const formnew = new FormData();
      formnew.append("pdf", myBlob, `new.png`);

      axios({
        method: "post",
        url: `${API}/suresafe/api/admin/report/pdf`,
        data: formnew,
        headers: { "Content-Type": "multipart/form-data" },
      }).then(async (here) => {
        console.log(here);
        window.open(`${API}/suresafe/${here.data.fileName}`);
      });
    });
  };

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <Flex className={"scrollbar-hide"}>
      <Sidebar />
      <div style={{ overflow: "hidden", height: 0 }}>
        <Report elementID="report" data={main} />
      </div>
      <Navbar title="Exposed" />
      <Flex
        className={`p-8 h-full bg-secondary overflow-y-scroll overflow-x-hidden scrollbar-hide`}
      >
        <Div className={`bg-secondary w-full h-full flex flex-row`}>
          <Div className={`w-9/12 mb-12`}>
            <div className="flex flex-row items-center">
              <H4 className={`text-fonts-100 mr-auto`}>Exposed</H4>
              <button
                onClick={() => {
                  Swal.fire({
                    title: "Choose the report you want to download.",
                    showDenyButton: true,
                    showCancelButton: true,
                    confirmButtonText: "PDF Report",
                    denyButtonText: `Excel Report`,
                  }).then((result) => {
                    if (result.isConfirmed) {
                      downloadPdf();
                    } else if (result.isDenied) {
                      getReport();
                    }
                  });
                }}
                type="button"
                className="bg-green-200 text-white focus:ring-4 focus:ring-green-100 
                font-bold rounded-lg text-lg px-10 py-2.5 mr-2"
              >
                Download Report
              </button>
            </div>
            <Flex className={`bg-primary h-full w-full rounded-lg mt-3 p-7`}>
              {main?.map((value: any) => (
                <ItemCard
                  onSelect={() => setSelectedUser(value)}
                  key={value}
                  data={value}
                />
              ))}
            </Flex>
          </Div>
          <Flex className={`bg-secondary h-full w-96 rounded-lg pl-5`}>
            <H4 className={`text-fonts-100`}>Details</H4>
            <Flex
              className={`bg-primary h-full w-full rounded-lg mt-3 p-7 overflow-x-scroll scrollbar-hide`}
            >
              {selectedUser ? (
                <>
                  {" "}
                  <H5 className={`text-fonts-100`}>Information</H5>
                  <FlexRow className={`items-center h-auto mt-8 mb-10`}>
                    <Div className={`h-60 w-60 bg-main rounded-full mr-10`}>
                      <img
                        alt="Profile Pic"
                        src={`${API}/${selectedUser?.image}`}
                        className={`h-60 w-60 bg-main rounded-full mr-10`}
                      />
                    </Div>
                    <Div>
                      <Text
                        className={`font-bold font-gilroy text-3xl text-fonts-100 mb-2`}
                      >
                        {selectedUser?.name}
                      </Text>
                      <Text
                        className={`font-normal font-gilroy text-xl text-fonts-100 mb-1`}
                      >
                        SS-
                        {selectedUser?.userID.substring(
                          selectedUser.userID.length - 4,
                          selectedUser.userID.length
                        )}
                      </Text>
                      <Text
                        className={`font-normal font-gilroy text-xl text-fonts-100 mb-1`}
                      >
                        {selectedUser?.barangay}, {selectedUser?.municipality}
                      </Text>
                      <Text
                        className={`font-normal font-gilroy text-xl text-fonts-100 mb-1`}
                      >
                        {selectedUser?.email || "jerico@xtendly.com"}
                      </Text>
                      <Text
                        className={`font-normal font-gilroy text-xl text-fonts-100 mb-1`}
                      >
                        {selectedUser?.phone || "09356555717"}
                      </Text>
                      <Div
                        className={`p-4 bg-main rounded-lg w-56 flex justify-center mt-4`}
                      >
                        <Text
                          className={`font-bold font-gilroy text-xl text-primary`}
                        >
                          {new Date(selectedUser?.date)
                            ?.toString()
                            ?.substring(0, 15) || "N/A"}
                        </Text>
                      </Div>
                    </Div>
                  </FlexRow>
                  <H5 className={`text-fonts-100 mb-5`}>Potential Exposed</H5>
                  {selectedUser?.potentials?.map((value: any) => (
                    <ListItem key={value} data={value} />
                  ))}
                  <H5 className={`text-fonts-100 mb-5`}>Visits</H5>
                  {selectedUser?.Visits?.map((value: any) => (
                    <VisitsItem key={value} data={value} />
                  ))}
                </>
              ) : (
                <Flex className="items-center w-full p-32">
                  <Text className="font-semibold text-fonts-100 text-2xl mb-5">
                    Select a User!
                  </Text>
                  <Text
                    className="font-bold laptop:text-4xl phone:text-3xl text-fonts-100
        text-center mb-5"
                  >
                    Please select a user to view the{" "}
                    <span className="text-main"> user information</span>.
                  </Text>
                </Flex>
              )}
            </Flex>
          </Flex>
        </Div>
      </Flex>
    </Flex>
  );
};
