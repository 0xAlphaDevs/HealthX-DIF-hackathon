import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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

const Navbar = () => {
  const [didData, setDidData] = useRecoilState(didState);
  const formattedDid = `${didData.did.slice(8, 16)}...${didData.did.slice(-8)}`;

  function handleCopyToClipboard() {
    navigator.clipboard.writeText(didData.did);
  }
  const bgColor =
    didData.userType === "organization" ? "bg-cyan-600" : "bg-emerald-800";
  const textColor =
    didData.userType === "organization" ? "text-cyan-100" : "text-emerald-100";
  const badgeColor =
    didData.userType === "organization" ? "bg-cyan-100" : "bg-emerald-100";
  return (
    <div className={`p-2 ${bgColor} flex justify-between`}>
      <div className="flex gap-2 items-center">
        <Avatar>
          <AvatarImage src="favicon.svg" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p className={`font-bold ${textColor} text-xl`}>HealthX</p>
      </div>

      <div>
        <Badge className={`h-8 ${badgeColor} text-md`}>{formattedDid}</Badge>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Badge
                className={`cursor-pointer ml-2 mr-4 h-8 text-md ${badgeColor}`}
                onClick={handleCopyToClipboard}
              >
                <CopyIcon />
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              <p>Copy DID</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default Navbar;
