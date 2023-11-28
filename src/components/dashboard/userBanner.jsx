import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRecoilState } from "recoil";
import didState from "@/atoms/didData";

const UserBanner = () => {
  const [didData, setDidData] = useRecoilState(didState);
  const formattedDid = `${didData.did.slice(8, 14)}...${didData.did.slice(-6)}`;
  return (
    <Card className="m-8 text-emerald-900 bg-emerald-50">
      <CardHeader className="flex flex-row justify-between ">
        <div className="">
          <CardTitle>DID :</CardTitle>
          <CardDescription>{formattedDid}</CardDescription>
        </div>
        <div>
          <CardTitle>User Name:</CardTitle>
          <CardDescription>{didData.name}</CardDescription>
        </div>
        <div>
          <CardTitle>D.O.B. :</CardTitle>
          <CardDescription>{didData.year}</CardDescription>
        </div>
      </CardHeader>
    </Card>
  );
};

export default UserBanner;
