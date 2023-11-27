import React from "react";
import { useRecoilState } from "recoil";
import didState from "@/atoms/didData";
import Navbar from "@/components/navbar";
import UserBanner from "@/components/dashboard/userBanner";
import { UserTable } from "@/components/dashboard/userTable";

const MyDashboard = () => {
  const [didData, setDidData] = useRecoilState(didState);

  return (
    <>
      <Navbar />
      <UserBanner />
      <UserTable />
      {/* <div className="mt-4">
        <div>MyDashboard : {didData.did}</div>
        <div>Name : {didData.name}</div>
        <div>Year : {didData.year}</div>
      </div> */}
    </>
  );
};

export default MyDashboard;
