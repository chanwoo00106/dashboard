import React from "react";
import H from "./H";
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
