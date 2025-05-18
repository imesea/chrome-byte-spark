
import React from "react";
import { Outlet } from "react-router-dom";
import AppNavbar from "@/components/AppNavbar";
import Sidebar from "@/components/Sidebar";

const AppLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <AppNavbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-4 md:p-6 bg-gradient-to-b from-[#111111] to-[#1a1a1a]">
          <div className="container max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
