import React from "react";
import "./Layout.module.css";
import Navbar from "./../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./../Footer/Footer";
import { Offline, /*Online*/ } from "react-detect-offline";

export default function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      {/* <Online>Only shown when you're online</Online> */}
      <Offline>
        <div className="network">
          You should be online
          <i className="fas fa-wifi ms-2"></i>
        </div>
      </Offline>
      <Footer />
    </>
  );
}
