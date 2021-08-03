import React, { useState } from "react";
import { Div, Images, Flex, H6 } from "@suresafe/core";
import { Link } from "react-router-dom";
import { sideBar } from "@suresafe/constants";

interface NavItemProps {
  id: number;
  name: string;
  selected: number;
  setSelected: any;
  icon: string;
  link: string;
  className?: string;
}

const NavItem = ({
  id,
  name,
  selected,
  setSelected,
  icon,
  link,
  className,
}: NavItemProps) => {
  return (
    <li
      className={`${className} nav-item my-2 px-5 py-3 pl-8 rounded-md ${
        selected === id ? "bg-main" : "bg-primary"
      }`}
    >
      <Link
        onClick={() => setSelected(id)}
        to={link}
        className={`${selected === id ? "text-primary" : "text-fonts-100"}`}
      >
        <H6>
          <i className={`${icon} mr-3`} />
          {name}
        </H6>
      </Link>
    </li>
  );
};

export const Sidebar = () => {
  const [selected, setSelected] = useState(1);

  return (
    <Div className="w-72 h-full px-6 py-6 fixed top-0 left-0 bottom-0 bg-primary">
      <Flex>
        <nav className="navbar">
          <Link>
            <img
              alt="SureSafe Logo"
              className="w-full h-12 pr-10"
              src={Images.sureSafeLogo}
            />
          </Link>
          <ul className="nav-items mt-14">
            {sideBar.map((x, i) => {
              return (
                <NavItem
                  key={i}
                  name={x.name}
                  id={x.id}
                  selected={selected}
                  setSelected={setSelected}
                  icon={x.icon}
                  link={x.link}
                />
              );
            })}
            <NavItem
              id={9}
              name="Logout"
              selected={selected}
              setSelected={setSelected}
              icon="fas fa-sign-out-alt"
              link="/logout"
              className="mt-60"
            />
          </ul>
        </nav>
      </Flex>
    </Div>
  );
};
