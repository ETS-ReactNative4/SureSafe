import React from "react";
import { Div, Images, Flex, H6 } from "@suresafe/core";
import { Link, useLocation } from "react-router-dom";
import { sideBar } from "@suresafe/constants";
import { useWindowSize } from "@suresafe/hooks";

interface NavItemProps {
  id: number;
  name: string;
  current: string;
  icon: string;
  link: string;
  className?: string;
}

const NavItem = ({ name, current, icon, link, className }: NavItemProps) => {
  return (
    <li
      className={`${className} nav-item my-2 px-5 py-3 pl-8 rounded-md phone:pl-4 tablet:pl-6 laptop:pl-7 desktop:pl-8 ${
        current === name.toLowerCase() ? "bg-main" : "bg-primary"
      }`}
    >
      <Link
        to={link}
        className={`${
          current === name.toLowerCase() ? "text-primary" : "text-fonts-100"
        }`}
      >
        <H6>
          <i className={`${icon} mr-3`} />
          <span
            className={`inline-flex phone:hidden tablet:inline-flex laptop:inline-flex desktop:inline-flex`}
          >
            {name}
          </span>
        </H6>
      </Link>
    </li>
  );
};

export const Sidebar = () => {
  const size = useWindowSize();
  const location = useLocation();

  return (
    <Div className="h-full px-6 py-6 fixed top-0 left-0 bottom-0 bg-primary phone:w-24 tablet:w-64 laptop:w-64 desktop:w-72">
      <Flex>
        <nav className="navbar h-full">
          <Link>
            <img
              alt="SureSafe Logo"
              className="w-full phone:h-10 tablet:h-10 laptop:h-10 desktop:h-12 phone:pr-0 tablet:pr-7 laptop:pr-8 desktop:pr-10"
              src={
                size.width <= 800 ? Images.sureSafeLogo2 : Images.sureSafeLogo
              }
            />
          </Link>
          <ul className="nav-items mt-14">
            {sideBar.map((x, i) => {
              return (
                <NavItem
                  key={i}
                  name={x.name}
                  id={x.id}
                  current={location.pathname.replace("/", "")}
                  icon={x.icon}
                  link={x.link}
                />
              );
            })}
            <NavItem
              id={9}
              name="Logout"
              current={location.pathname.replace("/", "")}
              icon="fas fa-sign-out-alt"
              link="/logout"
              className={`mt-48`}
            />
          </ul>
        </nav>
      </Flex>
    </Div>
  );
};
