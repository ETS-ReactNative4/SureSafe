import React from "react";
import { H5, Div, H4, Flex, Text, H6, FlexRow } from "@suresafe/core";
import { Sidebar, Navbar, OverviewItem } from "@suresafe/components";
import { API } from "@suresafe/constants";
import Swal from "sweetalert2";

export const ItemCard: any = ({ data, setSelectedUser }: any) => {
  const newDate = new Date(data?.created_at);

  return (
    <Div
      className={`w-full h-28 bg-main rounded-lg p-4 flex flex-row items-center mb-5`}
    >
      <img
        alt="PICS"
        src={`${API}/${data?.picture}`}
        className={`w-20 h-20 bg-primary rounded-full mr-5 border-2 border-white`}
      />
      <Div className={`mr-auto`}>
        <H6 className={`text-primary`}>
          {data?.firstName} {data?.lastName}
        </H6>
        <Text className={`text-lg text-primary`}>
          {newDate.toString().substring(0, 15)}
        </Text>
      </Div>
      <button
        onClick={() => setSelectedUser(data)}
        type="button"
        className="bg-white text-fonts-100 focus:ring-4 focus:ring-blue-300 
        font-medium rounded-lg text-sm px-5 py-2.5 mr-6"
      >
        View Details
      </button>
    </Div>
  );
};

export const Newuser = () => {
  const [main, setMain] = React.useState<any>({});
  const [selectedUser, setSelectedUser] = React.useState<any>();

  const getData = async () => {
    const res = await fetch(`${API}/suresafe/api/users/newusers`);
    const data = await res.json();
    setMain(data.data);
  };

  React.useEffect(() => {
    getData();
  }, []);

  const changeRole = async (status: string) => {
    console.log("selectedUser?._id", selectedUser?._id);
    const res = await fetch(`${API}/suresafe/api/users/status`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: selectedUser?._id,
        status: status,
      }),
    });
    const datas = await res.json();
    if (datas.statusCode === 201) {
      Swal.fire(
        "SUCCESS",
        `Account is successfully ${status}!`,
        "success"
      ).then(() => {
        window.location.reload();
      });
    }
  };

  return (
    <Flex className={"scrollbar-hide"}>
      <Sidebar />
      <Navbar title="Users" />
      <Flex
        className={`p-8 bg-secondary overflow-y-scroll overflow-x-hidden scrollbar-hide`}
      >
        <H4 className={`text-fonts-100`}>Overview</H4>
        <Div
          className={`w-full mt-3 grid gap-4 phone:grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-2 desktop:grid-cols-2 mb-5`}
        >
          <OverviewItem
            title="Total Users"
            value={main?.totalUser || 0}
            color="bg-green-200"
            icon="fas fa-users"
          />
          <OverviewItem
            title="New Users"
            value={main?.totalNewUsers || 0}
            color="bg-lightblue"
            icon="fas fa-user-plus"
          />
        </Div>
        <Div className={`bg-secondary w-full flex flex-row`}>
          <Div className={`w-9/12 mb-12`}>
            <H4 className={`text-fonts-100`}>New Users</H4>
            <Flex className={`bg-primary h-full w-full rounded-lg mt-3 p-7`}>
              {main?.users?.length !== 0 ? (
                <>
                  {main?.users?.map((item: any, index: any) => {
                    return (
                      <ItemCard
                        setSelectedUser={setSelectedUser}
                        selectedUser={selectedUser}
                        key={index}
                        data={item}
                      />
                    );
                  })}
                </>
              ) : (
                <Flex className="items-center w-full p-32">
                  <Text className="font-semibold text-fonts-100 text-2xl mb-5">
                    No User!
                  </Text>
                  <Text
                    className="font-bold laptop:text-4xl phone:text-3xl text-fonts-100
          text-center mb-5"
                  >
                    Currently no <span className="text-main"> new users</span>.
                  </Text>
                  {/* <Text className="mb-10 text-center">
                    This may take up to 30 seconds. If you encounter a error
                    please reload the page. Thank you!
                  </Text> */}
                </Flex>
              )}
            </Flex>
          </Div>
          <Flex className={`bg-secondary h-full w-96 rounded-lg pl-5`}>
            <H4 className={`text-fonts-100`}>Details</H4>
            <Flex className={`bg-primary w-full rounded-lg mt-3 p-7`}>
              {selectedUser ? (
                <>
                  <FlexRow className={`items-center h-auto`}>
                    <H5 className={`text-fonts-100`}>User Information</H5>
                    <Div
                      className={`p-4 bg-main rounded-lg w-56 flex justify-center mt-4 ml-auto`}
                    >
                      <Text
                        className={`font-bold font-gilroy text-xl text-primary`}
                      >
                        {new Date(selectedUser?.created_at)
                          ?.toString()
                          ?.substring(0, 15) || "N/A"}
                      </Text>
                    </Div>
                  </FlexRow>
                  <FlexRow className={`items-center h-auto mt-5 mb-10`}>
                    <img
                      alt="Profile Pic"
                      src={`${API}/${selectedUser?.picture}`}
                      className={`h-60 w-60 bg-main rounded-full mr-10`}
                    />
                    <Div>
                      <Text
                        className={`font-bold font-gilroy text-3xl text-fonts-100 mb-2`}
                      >
                        {selectedUser?.firstName} {selectedUser?.lastName}
                      </Text>
                      <Text
                        className={`font-normal font-gilroy text-xl text-fonts-100 mb-1`}
                      >
                        {selectedUser?.email}
                      </Text>
                      <Text
                        className={`font-normal font-gilroy text-xl text-fonts-100 mb-1`}
                      >
                        {`${selectedUser?.barangay}, ${selectedUser?.municipality}`}
                      </Text>
                      <Text
                        className={`font-normal font-gilroy text-xl text-fonts-100 mb-1`}
                      >
                        +63{selectedUser?.number}
                      </Text>
                      <FlexRow className={`mt-3`}>
                        <button
                          onClick={() => {
                            Swal.fire({
                              title: `Do you want to approve ${selectedUser?.firstName}'s account?`,
                              showCancelButton: true,
                              confirmButtonText: "Yes",
                            }).then((result) => {
                              if (result.isConfirmed) {
                                changeRole("approve");
                              }
                            });
                          }}
                          type="button"
                          className="bg-green-200 text-white focus:ring-4 focus:ring-green-100 
                font-bold rounded-lg text-lg px-10 py-2.5 mr-2"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => {
                            Swal.fire({
                              title: `Do you want to deny ${selectedUser?.firstName}'s account?`,
                              showCancelButton: true,
                              confirmButtonText: "Yes",
                            }).then((result) => {
                              if (result.isConfirmed) {
                                changeRole("denied");
                              }
                            });
                          }}
                          type="button"
                          className="bg-lightred text-white focus:ring-4 focus:ring-orange-100 
                font-bold rounded-lg text-lg px-10 py-2.5"
                        >
                          Decline
                        </button>
                      </FlexRow>
                    </Div>
                  </FlexRow>
                  <H5 className={`text-fonts-100 mb-5`}>Valid ID</H5>
                  <img
                    alt="Valid ID"
                    src={`${API}/${selectedUser?.validId}`}
                    className={`bg-main rounded-lg w-full`}
                  />
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
                    Please a user to view the{" "}
                    <span className="text-main"> user information</span>.
                  </Text>
                  {/* <Text className="mb-10 text-center">
                    This may take up to 30 seconds. If you encounter a error
                    please reload the page. Thank you!
                  </Text> */}
                </Flex>
              )}
            </Flex>
          </Flex>
        </Div>
      </Flex>
    </Flex>
  );
};
