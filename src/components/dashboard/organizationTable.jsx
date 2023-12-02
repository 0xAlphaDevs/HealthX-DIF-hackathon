"use client";
import React, { useState, useEffect } from "react";
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CategoryFilter from "./categoryFilter";
import { Cross2Icon, CopyIcon } from "@radix-ui/react-icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { base64ImageState, didData } from "@/atoms/data";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import { testBase64Image } from "@/helpers/mock";
import {
  healthRecordCategoryOptions,
  organizationHealthRecordsData,
} from "@/lib/constants";
import { IssueHealthRecord } from "./issueHealthRecord";
import { initWeb5 } from "@/helpers/initWeb5";
import { fetchImageRecords, fetchRecords } from "@/helpers/fetchRecords";

export function OrganizationTable() {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});

  const setBase64Image = useSetRecoilState(base64ImageState);

  //🟡
  useEffect(() => {
    const fetchTableData = async () => {
      const { web5, did } = await initWeb5();
      console.log("Fetching records...");
      const records = await fetchImageRecords(web5, did);
      // console.log("Records :", records);
      // setTableData(data);
    };

    fetchTableData();
  }, []);

  const columns = [
    {
      accessorKey: "issuedTo",
      header: "Issued to",
      cell: ({ row }) => {
        const issuedToData = row.getValue("issuedTo");
        const did = issuedToData ? issuedToData.did : "";
        const name = issuedToData ? issuedToData.name : "";
        function handleCopyToClipboard() {
          navigator.clipboard.writeText(issuedToData.did);
        }
        return (
          <>
            <div className="capitalize font-semibold">{name}</div>
            <div className="lowercase font-thin flex items-center">
              <div>{did}</div>
              <div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <div
                        className="cursor-pointer ml-2 mr-4  text-md"
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
          </>
        );
      },
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

  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="p-8 ">
      <div className="flex justify-between">
        <div className="text-cyan-900 font-bold text-2xl p-4 bg-cyan-50 rounded-lg">
          Issued Records
        </div>
        <div>
          {/* Modal */}
          <IssueHealthRecord />
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
    </div>
  );
}
