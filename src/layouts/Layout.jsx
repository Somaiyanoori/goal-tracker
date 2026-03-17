import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      {/*  layout-container */}
      <main>
        <Outlet />
      </main>
    </div>
  );
};
export default Layout;
