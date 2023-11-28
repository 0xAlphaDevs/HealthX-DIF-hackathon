"use client";
import React, { useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
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
import { Input } from "@/components/ui/input";
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
} from "@radix-ui/react-icons";

const data = [
  {
    id: "m5gr84i9",
    healthrecordName: "success",
    healthrecordCategory: "MRI",
    date: "1-1-2023",
  },
  {
    id: "m5gr84i9",
    healthrecordName: "abc",
    healthrecordCategory: "MRI",
    date: "1-1-2023",
  },
  {
    id: "m5gr84i9",
    healthrecordName: "def",
    healthrecordCategory: "MRI",
    date: "1-1-2023",
  },
  {
    id: "m5gr84i9",
    healthrecordName: "def",
    healthrecordCategory: "CBC",
    date: "1-1-2023",
  },
  {
    id: "m5gr84i9",
    healthrecordName: "def",
    healthrecordCategory: "CBC",
    date: "1-1-2023",
  },
  {
    id: "m5gr84i9",
    healthrecordName: "def",
    healthrecordCategory: "CECT",
    date: "1-1-2023",
  },
];

const columns = [
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
                  src="report.png" // Update with the correct path
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
  {
    accessorKey: "share",
    header: () => <div className="text-right"></div>,
    cell: () => {
      return (
        <Dialog>
          <DialogTrigger>
            {" "}
            <Button className="bg-emerald-900 text-emerald-50 hover:bg-emerald-500">
              Share
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you sure absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      );
    },
  },
];

//schema for the healthrecord category filter
export const healthrecordCategory = [
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

export function UserTable() {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
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

  return (
    <div className="p-8 ">
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
          {table.getColumn("healthrecordCategory") && (
            <CategoryFilter
              column={table.getColumn("healthrecordCategory")}
              title="Category"
              options={healthrecordCategory}
            />
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
