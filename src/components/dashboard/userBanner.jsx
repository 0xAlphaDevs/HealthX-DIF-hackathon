"use client";
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
import { CopyIcon } from "@radix-ui/react-icons";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const UserBanner = () => {
  const [didData, setDidData] = useRecoilState(didState);
  const formattedDid = `${didData.did.slice(8, 16)}...${didData.did.slice(-8)}`;

  function handleCopyToClipboard() {
    navigator.clipboard.writeText(didData.did);
  }
  return (
    <div className="grid grid-cols-2 gap-8 m-8">
      <Card className=" text-emerald-900 bg-emerald-50">
        <CardHeader className="grid grid-cols-2 justify-between ">
          <div>
            <div className="">
              <CardTitle>DID :</CardTitle>
              <div className="flex">
                <CardDescription>{formattedDid}</CardDescription>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <div
                        className="cursor-pointer ml-2 mr-4 h-8 text-md"
                        onClick={handleCopyToClipboard}
                      >
                        <CopyIcon />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Copy DID</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
            <div className="mt-2">
              <CardTitle>User Name :</CardTitle>
              <CardDescription>{didData.name}</CardDescription>
            </div>
          </div>
          <div>
            <div>
              <CardTitle>Date of Birth :</CardTitle>
              <CardDescription>{didData.year}</CardDescription>
            </div>
            <div className="mt-4 flex gap-2">
              <CardDescription>
                <Badge className="mt-1">{didData.userType}</Badge>
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>
      <Card className=" text-emerald-900 bg-emerald-50">
        {/* <CardHeader className="flex flex-col justify-between ">
          <div className="">
            <CardTitle>DID</CardTitle>
            <div className="flex">
              <CardDescription>{formattedDid}</CardDescription>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <div
                      className="cursor-pointer ml-2 mr-4 h-8 text-md"
                      onClick={handleCopyToClipboard}
                    >
                      <CopyIcon />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Copy DID</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          <div>
            <CardTitle>User Name</CardTitle>
            <CardDescription>{didData.name}</CardDescription>
          </div>
          <div>
            <CardTitle>D.O.B.</CardTitle>
            <CardDescription>{didData.year}</CardDescription>
          </div>
        </CardHeader> */}
      </Card>
    </div>
  );
};

export default UserBanner;
