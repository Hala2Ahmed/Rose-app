import React from "react";
import AccountSideBar from "./_components/profile-sidebar";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Side Bar */}
      <AccountSideBar />

      {children}
    </>
  );
}
