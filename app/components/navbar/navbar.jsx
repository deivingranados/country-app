"use client";

import React from "react";
import "./navbar.css";
import { FiMoon } from "react-icons/fi";
import { BsSun } from "react-icons/bs";
import { useTheme } from "next-themes";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  return (
    <>
      <div
        className="responsive-navbar"
        style={{
          backgroundColor:
            theme === "dark" ? "hsl(209,23%,22%)" : "hsl(0,0%,100%)",
        }}
      >
        <div>
          <h5 className="text">Where in the world?</h5>
        </div>
        <div className="content-mode">
          {theme === "dark" ? (
            <BsSun
              className="moon-icon"
              size={15}
              cursor="pointer"
              onClick={() => setTheme("light")}
            />
          ) : (
            <FiMoon
              className="moon-icon"
              size={15}
              cursor="pointer"
              onClick={() => setTheme("dark")}
            />
          )}
          <h6 className="title-mode">Dark Mode</h6>
        </div>
      </div>
    </>
  );
};

export default Navbar;
