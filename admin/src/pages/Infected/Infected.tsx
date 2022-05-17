import React from "react";
import { H5, Div, H4, Flex, Text, H6, FlexRow } from "@suresafe/core";
import { API } from "@suresafe/constants";
import { Sidebar, Navbar, ListItem, InfectedCard } from "@suresafe/components";

export const Infected = () => {
  const [main, setMain] = React.useState<any>([]);
  const [selectedUser, setSelectedUser] = React.useState<any>();

  const getData = async () => {
    const res = await fetch(`${API}/suresafe/api/admin/infected`);
    const data = await res.json();
    setMain(data.data);
  };

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <Flex className={"scrollbar-hide"}>
      <Sidebar />
      <Navbar title="Exposed" />
      <Flex
        className={`p-8 h-full bg-secondary overflow-y-scroll overflow-x-hidden scrollbar-hide`}
      >
        <Div className={`bg-secondary w-full h-full flex flex-row`}>
          <Div className={`w-9/12 mb-12`}>
            <H4 className={`text-fonts-100`}>Infected</H4>
            <Flex className={`bg-primary h-full w-full rounded-lg mt-3 p-7`}>
              {main?.map((value: any) => (
                <InfectedCard
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
                  <H5 className={`text-fonts-100 mb-5`}>Exposed</H5>
                  {selectedUser?.exposed?.map((value: any) => (
                    <ListItem key={value} data={value} />
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
