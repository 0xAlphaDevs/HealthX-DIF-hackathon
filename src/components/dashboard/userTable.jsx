import React, { useState, useEffect } from "react";
import {
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
import { testBase64Image } from "@/helpers/mock";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
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
import { Cross2Icon } from "@radix-ui/react-icons";
import { useRouter } from "next/router";
import { base64ImageState } from "@/atoms/data";
import { useSetRecoilState } from "recoil";
import {
  userHealthRecordsData,
  healthRecordCategoryOptions,
} from "@/lib/constants";
import { initWeb5 } from "@/helpers/initWeb5";
import { fetchRecords } from "@/helpers/fetchRecords";

export function UserTable() {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});

  // 🟡
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchTableData = async () => {
      const { web5, did } = await initWeb5();
      console.log("Fetching records...");
      const records = await fetchRecords(web5, did);
      // console.log("Records :", records);
      // setTableData(data);
    };

    fetchTableData();
  }, []);

  const setBase64Image = useSetRecoilState(base64ImageState);

  const columns = [
    {
      accessorKey: "healthRecordName",
      header: "healthRecord Name",
      cell: ({ row }) => (
        <div className="capitalize text-lg font-semibold text-emerald-900">
          {row.getValue("healthRecordName")}
        </div>
      ),
    },
    {
      accessorKey: "healthRecordCategory",
      header: "Category",
      cell: ({ row }) => (
        <div className="capitalize">
          <Badge className="bg-emerald-700 text-emerald-50 p-1 rounded-lg">
            {row.getValue("healthRecordCategory")}
          </Badge>
        </div>
      ),
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },

    {
      accessorKey: "date",
      header: "Issued On",
      cell: ({ row }) => (
        <div className="lowercase font-bold bg-slate-300 inline-block rounded-full p-2">
          {row.getValue("date")}
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
              <Button className="bg-emerald-900 text-emerald-50 hover:bg-emerald-500">
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
                      className="bg-emerald-900 text-emerald-50 hover:bg-emerald-500 mt-4"
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
    data: userHealthRecordsData,
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
      <div className="text-emerald-900 font-bold text-2xl bg-emerald-50 p-4 rounded-lg inline-block">
        My Health Records
      </div>
      {/* Table Toolbar  */}
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
            className="max-w-sm bg-emerald-50"
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
      {/* Table */}
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
    </div>
  );
}
