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
import { didState } from "@/atoms/data";
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
    <div className="grid grid-cols-2 gap-8 p-8">
      <Card className=" text-emerald-900 bg-emerald-50">
        <CardHeader className="grid grid-cols-2 justify-between gap-2 ">
          <div>
            <div className="">
              <CardTitle className="text-emerald-900">DID </CardTitle>
              <div className="flex mt-2">
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
              <CardTitle className="text-emerald-900">User Name </CardTitle>
              <CardDescription className="mt-2">{didData.name}</CardDescription>
            </div>
          </div>
          <div>
            <div>
              <CardTitle className="text-emerald-900">Date of Birth </CardTitle>
              <CardDescription className="mt-2">{didData.year}</CardDescription>
            </div>
            <div className="mt-3">
              <CardTitle className="text-emerald-900">User Type </CardTitle>
              <CardDescription>
                <Badge className="mt-2 text-lg bg-green-200 hover:bg-green-200">
                  {didData.userType}
                </Badge>
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>
      <Card className=" text-emerald-900 bg-emerald-50">
        <div className="grid grid-cols-2 justify-center h-full">
          <div className="flex flex-col items-center justify-center">
            <dt class="mb-2 text-3xl font-extrabold">73M+</dt>
            <dd class="text-gray-500 dark:text-gray-400">Health Records</dd>
          </div>
          <div class="flex flex-col items-center justify-center">
            <dt class="mb-2 text-3xl font-extrabold">100M+</dt>
            <dd class="text-gray-500 dark:text-gray-400">Issuers</dd>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default UserBanner;
