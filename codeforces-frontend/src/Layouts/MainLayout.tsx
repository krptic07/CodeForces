import React from "react";
import { Outlet } from "react-router-dom";

const MainLayout: React.ComponentType = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#FDF8E1",
      }}
    >
      <Outlet />
    </div>
  );
};

export default MainLayout;
