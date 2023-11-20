import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const EnterDetails = ({ type }) => {
  const isType = type === "individual";
  const cardTitle = isType ? "User Details" : "Organization Details";
  const dobLabel = isType ? "D.O.B." : "Year of Establishment";
  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-[550px]">
        <CardHeader>
          <CardTitle>{cardTitle}</CardTitle>
          <CardDescription>Enter your details below</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor={`name${type}`}>Name</Label>
                <Input
                  id={`name${type}`}
                  placeholder={`Enter ${
                    isType ? "your" : "organization's"
                  } name`}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor={`dob${type}`}>{dobLabel}</Label>
                <Input
                  id={`dob${type}`}
                  placeholder={`Enter ${
                    isType ? "your D.O.B" : "your year of establishment"
                  } `}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button>Next</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default EnterDetails;
