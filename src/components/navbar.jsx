import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useRecoilState } from "recoil";
import didState from "@/atoms/didData";

const Navbar = () => {
  const [didData, setDidData] = useRecoilState(didState);
  const formattedDid = `${didData.did.slice(8, 14)}...${didData.did.slice(-6)}`;
  return (
    <div className="p-2 bg-emerald-500 flex justify-between">
      <div className="flex gap-2 items-center">
        <Avatar>
          <AvatarImage src="favicon.svg" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p className="font-bold text-emerald-900 text-xl">HealthX</p>
      </div>

      <Badge>{formattedDid}</Badge>
    </div>
  );
};

export default Navbar;
