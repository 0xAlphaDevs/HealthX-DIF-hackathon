import React from "react";
import { useRecoilState } from "recoil";
import didState from "@/atoms/didData";

const MyDashboard = () => {
  const [didData, setDidData] = useRecoilState(didState);

  return (
    <>
      <div>MyDashboard : {didData.did}</div>
      <div>Name : {didData.name}</div>
      <div>Year : {didData.year}</div>
    </>
  );
};

export default MyDashboard;
