import React from "react";
import H from "../components/Head";
import Header from "./Header";

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <H />
      <Header />
      <main>{children}</main>
    </>
  );
};

export default Layout;
