"use client";
import React from "react";
import { useRecoilState } from "recoil";
import { didState } from "@/atoms/data";
import Navbar from "@/components/navbar";
import UserBanner from "@/components/dashboard/userBanner";
import { UserTable } from "@/components/dashboard/userTable";
import OrganizationBanner from "@/components/dashboard/organizationBanner";
import { OrganizationTable } from "@/components/dashboard/organizationTable";

const MyDashboard = () => {
  const [didData, setDidData] = useRecoilState(didState);

  const isUser = didData.userType.includes("individual");

  return (
    <>
      <Navbar />
      {isUser ? (
        <>
          <UserBanner />
          <UserTable />
        </>
      ) : (
        <>
          <OrganizationBanner />
          <OrganizationTable />
        </>
      )}

      {/* <div className="mt-4">
        <div>MyDashboard : {didData.did}</div>
        <div>Name : {didData.name}</div>
        <div>Year : {didData.year}</div>
      </div> */}
    </>
  );
};

export default MyDashboard;
