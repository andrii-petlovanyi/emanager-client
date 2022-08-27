import React from "react";
import { Navbar } from "./Navbar";
import "../index.css";
import { Footer } from "./Footer";

export const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <Navbar />
      {children}
      <Footer />
    </React.Fragment>
  );
};
