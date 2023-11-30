"use client";
import React from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useRecoilState } from "recoil";
import { didState } from "@/atoms/data";
import { CopyIcon } from "@radix-ui/react-icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const OrganizationBanner = () => {
  const [didData, setDidData] = useRecoilState(didState);
  const formattedDid = `${didData.did.slice(8, 16)}...${didData.did.slice(-8)}`;

  function handleCopyToClipboard() {
    navigator.clipboard.writeText(didData.did);
  }
  return (
    <div className="grid grid-cols-2 gap-8 m-8">
      <Card className=" text-cyan-900 bg-cyan-50">
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
              <CardTitle>Organization Name</CardTitle>
              <CardDescription>{didData.name}</CardDescription>
            </div>
          </div>
          <div>
            <div>
              <CardTitle>Year of Establishment</CardTitle>
              <CardDescription>{didData.year}</CardDescription>
            </div>
            <div className="mt-2">
              <CardTitle>Type</CardTitle>
              <CardDescription>
                <Badge className="mt-1 bg-cyan-200 hover:bg-cyan-200 text-cyan-900 ">
                  {didData.userType}
                </Badge>
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>
      <Card className=" text-cyan-900 bg-cyan-50">
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

export default OrganizationBanner;
