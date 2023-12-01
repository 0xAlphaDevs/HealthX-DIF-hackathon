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
  SelectLabel,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CategoryFilter from "./categoryFilter";
import {
  CircleIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
  Cross2Icon,
  PlusIcon,
  PlusCircledIcon,
} from "@radix-ui/react-icons";
import { base64ImageState, didData } from "@/atoms/data";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import { testBase64Image } from "@/helpers/mock";
import {
  healthRecordCategoryOptions,
  organizationHealthRecordsData,
} from "@/lib/constants";

export function OrganizationTable() {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});

  const setBase64Image = useSetRecoilState(base64ImageState);

  const columns = [
    {
      accessorKey: "issuedTo",
      header: "Issued to",
      cell: ({ row }) => (
        <div className="lowercase font-bold bg-slate-300 inline-block rounded-full p-2">
          {row.getValue("issuedTo")}
        </div>
      ),
    },
    {
      accessorKey: "healthRecordName",
      header: "healthRecord Name",
      cell: ({ row }) => (
        <div className="capitalize text-lg font-semibold text-cyan-900">
          {row.getValue("healthRecordName")}
        </div>
      ),
    },
    {
      accessorKey: "healthRecordCategory",
      header: "Category",
      cell: ({ row }) => (
        <div className="capitalize inline-block font-semibold bg-cyan-700 text-cyan-50 rounded-lg p-1">
          {" "}
          {row.getValue("healthRecordCategory")}
        </div>
      ),
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },

    {
      accessorKey: "issuedOn",
      header: "Issued On",
      cell: ({ row }) => (
        <div className="lowercase font-bold bg-slate-300 inline-block rounded-full p-2">
          {row.getValue("issuedOn")}
        </div>
      ),
    },
    {
      id: "view",
      cell: ({ row }) => {
        const router = useRouter();
        return (
          <Dialog>
            <DialogTrigger>
              <Button className="bg-cyan-900 text-cyan-50 hover:bg-cyan-500">
                View
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Here is your healthRecord.</DialogTitle>
                <DialogDescription>
                  <img
                    src="report.png"
                    alt="healthRecord Image"
                    style={{
                      width: "100%",
                      height: "400px",
                      objectFit: "contain",
                    }}
                  />
                  <div className="flex justify-center">
                    <Button
                      onClick={() => {
                        setBase64Image(testBase64Image);
                        router.push(`/viewRecord`);
                      }}
                      className="bg-cyan-900 text-cyan-50 hover:bg-cyan-500 mt-4"
                    >
                      Open Record
                    </Button>
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        );
      },
    },
  ];

  const table = useReactTable({
    data: organizationHealthRecordsData,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  const [healthRecordData, sethealthRecordData] = useState({
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
      healthRecordData.patientDid
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

  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="p-8 ">
      <div className="flex justify-between">
        <div className="text-cyan-900 font-bold text-2xl p-4 bg-cyan-50 rounded-lg">
          Issued Records
        </div>
        <div>
          {" "}
          {/* Modal */}
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
                            <Label className="text-cyan-600">
                              Patient's DID
                            </Label>
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
                            <Label className="text-cyan-600">
                              healthRecord Name
                            </Label>
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
                                  <SelectItem value="Pathology">
                                    Pathology
                                  </SelectItem>
                                  <SelectItem value="Neurology">
                                    Neurology
                                  </SelectItem>
                                  <SelectItem value="Radiology">
                                    Radiology
                                  </SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="flex flex-col space-y-1.5">
                            <Label className="text-cyan-600">
                              Upload Record
                            </Label>
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
        </div>
      </div>

      <div className="flex items-center py-4">
        <div className="flex flex-1 items-center space-x-2">
          {" "}
          <Input
            placeholder="Search a record..."
            value={table.getColumn("healthRecordName")?.getFilterValue() || ""}
            onChange={(event) =>
              table
                .getColumn("healthRecordName")
                ?.setFilterValue(event.target.value)
            }
            className="max-w-sm bg-cyan-50"
          />
          {/* categoryFilter UI */}
          {table.getColumn("healthRecordCategory") && (
            <CategoryFilter
              column={table.getColumn("healthRecordCategory")}
              title="Category"
              options={healthRecordCategoryOptions}
            />
          )}
          {isFiltered && (
            <Button
              variant="ghost"
              onClick={() => table.resetColumnFilters()}
              className="h-8 px-2 lg:px-3"
            >
              Reset
              <Cross2Icon className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Filter <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border bg-cyan-50">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() ? "selected" : undefined}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div> */}
    </div>
  );
}
