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
  CardFooter,
  CardHeader,
  CardTitle,
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
import { useRecoilState } from "recoil";
import didState from "@/atoms/didData";

const data = [
  {
    id: "m5gr84i9",
    healthrecordName: "success",
    healthrecordCategory: "MRI",
    date: "1-1-2023",
    did: "wjwheuiqh",
  },
  {
    id: "m5gr84i9",
    healthrecordName: "abc",
    healthrecordCategory: "MRI",
    date: "1-1-2023",
    did: "wjwheuiqh",
  },
  {
    id: "m5gr84i9",
    healthrecordName: "def",
    healthrecordCategory: "MRI",
    date: "1-1-2023",
    did: "wjwheuiqh",
  },
  {
    id: "m5gr84i9",
    healthrecordName: "def",
    healthrecordCategory: "CBC",
    date: "1-1-2023",
    did: "wjwheuiqh",
  },
  {
    id: "m5gr84i9",
    healthrecordName: "def",
    healthrecordCategory: "CBC",
    date: "1-1-2023",
    did: "wjwheuiqh",
  },
  {
    id: "m5gr84i9",
    healthrecordName: "def",
    healthrecordCategory: "CECT",
    date: "1-1-2023",
    did: "wjwheuiqh",
  },
];

const columns = [
  {
    accessorKey: "did",
    header: "Issued to",
    cell: ({ row }) => <div className="lowercase">{row.getValue("did")}</div>,
  },
  {
    accessorKey: "healthrecordName",
    header: "Healthrecord Name",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("healthrecordName")}</div>
    ),
  },
  {
    accessorKey: "healthrecordCategory",
    header: "Category",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("healthrecordCategory")}</div>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },

  {
    accessorKey: "date",
    header: "Issued On",
    cell: ({ row }) => <div className="lowercase">{row.getValue("date")}</div>,
  },
  {
    id: "view",
    cell: ({ row }) => {
      const payment = row.original;
      return (
        <Dialog>
          <DialogTrigger>
            <Button className="bg-emerald-900 text-emerald-50 hover:bg-emerald-500">
              View
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Here is your Healthrecord.</DialogTitle>
              <DialogDescription>
                <img
                  src="report.png"
                  alt="Healthrecord Image"
                  style={{ width: "100%", height: "500px" }}
                />
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      );
    },
  },
];

//schema for the healthrecord category filter
const healthrecordCategory = [
  {
    value: "mri",
    label: "MRI",
    icon: QuestionMarkCircledIcon,
  },
  {
    value: "cect",
    label: "CECT",
    icon: CircleIcon,
  },
  {
    value: "cbc",
    label: "cbc",
    icon: StopwatchIcon,
  },
];

export function OrganizationTable() {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});

  const [didData, setDidData] = useRecoilState(didState);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const [healthrecordData, setHealthrecordData] = useState({
    patientDid: "",
    healthRecordName: "",
    category: "",
    file: "",
  });

  // construct health Record
  const constructHealthRecord = async (
    senderDid,
    healthRecordName,
    healthRecordCategory,
    imageFile,
    receiverDid
  ) => {
    let base64Image = null;

    if (imageFile) {
      const binaryImage = await imageFile.arrayBuffer();
      base64Image = btoa(
        new Uint8Array(binaryImage).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );
    }
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
  async function sendHealthRecord(receiverDid) {
    // construct health record here - will need to pass all arguments from form
    const healthRecord = await constructHealthRecord(
      didData.did,
      healthrecordData.healthRecordName,
      healthrecordData.category,
      healthrecordData.file,
      healthrecordData.patientDid
    );

    console.log("Healthrecord Data: ", healthRecord);
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

  function handleHealthRecordIssue(event) {
    event.preventDefault();
    console.log("Creating record...");
    sendHealthRecord(healthrecordData.patientDid);
  }

  const isFiltered = table.getState().columnFilters.length > 0;
  return (
    <div className="p-8 ">
      <div className="flex justify-between">
        <div className="text-emerald-900 font-bold text-xl bg-emerald-50 p-2 rounded-lg">
          Issued Records
        </div>
        <div>
          {" "}
          {/* Modal */}
          <Dialog>
            <DialogTrigger>
              <Button className="bg-emerald-900 text-emerald-50 hover:bg-emerald-500">
                <PlusCircledIcon className="mt-0.5" />
                <span className="w-2"> </span>Issue Record
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-emerald-900">
                  Issue a Health Record.
                </DialogTitle>
                <DialogDescription>
                  <Card className="p-2 border-emerald-800 bg-emerald-50 ">
                    <CardHeader>
                      {/* <CardTitle className="text-emerald-600">
                        Create project
                      </CardTitle> */}
                      <CardDescription className="text-emerald-600">
                        Enter details to issue a healthrecord.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleHealthRecordIssue}>
                        <div className="grid w-full items-center gap-4">
                          <div className="flex flex-col space-y-1.5">
                            <Label className="text-emerald-600">
                              Patient's DID
                            </Label>
                            <Input
                              value={healthrecordData.patientDid}
                              onChange={(event) =>
                                setHealthrecordData({
                                  ...healthrecordData,
                                  patientDid: event.target.value,
                                })
                              }
                              placeholder="Enter the pateint's DID"
                              className="border border-emerald-300"
                            />
                          </div>
                          <div className="flex flex-col space-y-1.5">
                            <Label className="text-emerald-600">
                              Healthrecord Name
                            </Label>
                            <Input
                              value={healthrecordData.healthRecordName}
                              onChange={(event) =>
                                setHealthrecordData({
                                  ...healthrecordData,
                                  healthRecordName: event.target.value,
                                })
                              }
                              placeholder="Enter the healthrecord name"
                              className="border border-emerald-300"
                            />
                          </div>
                          <div className="flex flex-col space-y-1.5">
                            <Label className="text-emerald-600">
                              Healthrecord Category
                            </Label>
                            <Select
                              placeholder="Select a category"
                              onValueChange={(value) =>
                                setHealthrecordData({
                                  ...healthrecordData,
                                  category: value,
                                })
                              }
                              className="border border-emerald-300"
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
                            <Label className="text-emerald-600">
                              Upload Record
                            </Label>
                            <Input
                              type="file"
                              onChange={(event) =>
                                setHealthrecordData({
                                  ...healthrecordData,
                                  file: event.target.files[0],
                                })
                              }
                              accept="image/*"
                              placeholder="Choose file"
                              className="border border-emerald-300"
                            />
                          </div>
                        </div>
                        <div className="flex justify-center">
                          <Button className="bg-emerald-600 hover:bg-emerald-400 mt-2 ">
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
            value={table.getColumn("healthrecordName")?.getFilterValue() || ""}
            onChange={(event) =>
              table
                .getColumn("healthrecordName")
                ?.setFilterValue(event.target.value)
            }
            className="max-w-sm bg-emerald-50"
          />
          {/* categoryFilter UI */}
          {table.getColumn("healthrecordCategory") && (
            <CategoryFilter
              column={table.getColumn("healthrecordCategory")}
              title="Category"
              options={healthrecordCategory}
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
      <div className="rounded-md border bg-emerald-50">
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
