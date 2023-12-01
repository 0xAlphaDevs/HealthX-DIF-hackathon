"use client";
import React, { useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getFacetedRowModel,
  getFacetedUniqueValues,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { base64ImageState, didData } from "@/atoms/data";
import { useSetRecoilState } from "recoil";
import { testBase64Image } from "@/helpers/mock";

export function IssueDid() {
  const setBase64Image = useSetRecoilState(base64ImageState);

  const [healthRecordData, sethealthRecordData] = useState({
    patientName: "",
    patientDid: "",
    healthRecordName: "",
    category: "",
    file: "",
  });

  // create base64 image
  const createBase64Image = async (imageFile) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(imageFile);
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
    });
  };

  // construct health Record
  const constructhealthRecord = async (
    senderDid,
    healthRecordName,
    healthRecordCategory,
    imageFile,
    receiverDid
  ) => {
    let base64Image = null;

    base64Image = await createBase64Image(imageFile);

    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();

    const healthRecord = {
      sender: senderDid,
      healthRecordName: healthRecordName,
      healthRecordCategory: healthRecordCategory,
      image: base64Image,
      recipient: receiverDid,
      issuedOn: `${currentDate} ${currentTime}`,
    };
    return healthRecord;
  };

  // send health record 🟡
  async function sendhealthRecord(receiverDid) {
    // construct health record here - will need to pass all arguments from form
    const healthRecord = await constructhealthRecord(
      didData.did,
      healthRecordData.healthRecordName,
      healthRecordData.category,
      healthRecordData.file,
      healthRecordData.patientDid,
      healthRecordData.patientName
    );

    console.log("healthRecord Data: ", healthRecord);
    // const { record } = await web5.dwn.records.create({
    //   data: healthRecord,
    //   message: {
    //     schema: "haalthRecord",
    //     dataFormat: "application/json",
    //   },
    // });
    // const { status } = await record.send(receiverDid);
    // console.log("Record sent status : ", status);
  }

  function handlehealthRecordIssue(event) {
    event.preventDefault();
    console.log("Creating record...");
    sendhealthRecord(healthRecordData.patientDid);
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button className="bg-cyan-900 text-cyan-50 hover:bg-cyan-500">
          <PlusCircledIcon className="mt-0.5" />
          <span className="w-2"> </span>Issue Record
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-cyan-900">
            Issue a Health Record.
          </DialogTitle>
          <DialogDescription>
            <Card className="p-2 border-cyan-800 bg-cyan-50 ">
              <CardHeader>
                {/* <CardTitle className="text-cyan-600">
                        Create project
                      </CardTitle> */}
                <CardDescription className="text-cyan-600">
                  Enter details to issue a healthRecord.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlehealthRecordIssue}>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label className="text-cyan-600">Patient's Name</Label>
                      <Input
                        value={healthRecordData.patientName}
                        onChange={(event) =>
                          sethealthRecordData({
                            ...healthRecordData,
                            patientName: event.target.value,
                          })
                        }
                        placeholder="Enter the pateint's DID"
                        className="border border-cyan-300"
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label className="text-cyan-600">Patient's DID</Label>
                      <Input
                        value={healthRecordData.patientDid}
                        onChange={(event) =>
                          sethealthRecordData({
                            ...healthRecordData,
                            patientDid: event.target.value,
                          })
                        }
                        placeholder="Enter the pateint's DID"
                        className="border border-cyan-300"
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label className="text-cyan-600">healthRecord Name</Label>
                      <Input
                        value={healthRecordData.healthRecordName}
                        onChange={(event) =>
                          sethealthRecordData({
                            ...healthRecordData,
                            healthRecordName: event.target.value,
                          })
                        }
                        placeholder="Enter the healthRecord name"
                        className="border border-cyan-300"
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label className="text-cyan-600">
                        healthRecord Category
                      </Label>
                      <Select
                        placeholder="Select a category"
                        onValueChange={(value) =>
                          sethealthRecordData({
                            ...healthRecordData,
                            category: value,
                          })
                        }
                        className="border border-cyan-300"
                      >
                        <SelectTrigger className="">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="Cardiology">
                              Cardiology
                            </SelectItem>
                            <SelectItem value="Pathology">Pathology</SelectItem>
                            <SelectItem value="Neurology">Neurology</SelectItem>
                            <SelectItem value="Radiology">Radiology</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label className="text-cyan-600">Upload Record</Label>
                      <Input
                        type="file"
                        onChange={(event) =>
                          sethealthRecordData({
                            ...healthRecordData,
                            file: event.target.files[0],
                          })
                        }
                        accept="image/png"
                        placeholder="Choose file"
                        className="border border-cyan-300"
                      />
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <Button className="bg-cyan-600 hover:bg-cyan-400 mt-2 ">
                      Issue
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
