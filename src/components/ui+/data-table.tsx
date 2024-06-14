import {
  ColumnDef,
  Table as TableCore,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {cn} from "@/lib/utils.ts";

interface DataTableProps<TData, TValue> {
  table?: TableCore<TData>
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  className?: string
}

export function DataTable<TData, TValue>({
                                           table,
                                           columns,
                                           data,
                                           className,
                                         }: DataTableProps<TData, TValue>) {
  if (!table) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
    })
  }

  return (
    <div className={cn(
      "rounded-md",
      className
    )}
    >
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
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
