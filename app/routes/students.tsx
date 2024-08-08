import {
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  Table,
} from "~/components/ui/table";
import Dashboard from "~/customComponents/Dashboard";
import { TableItem } from "~/customComponents/tableItem";

export default function Students() {
  return (
    <Dashboard>
      <main className="flex-grow  p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-lg font-medium">Students</h1>
        </div>
        <Table className="text-left min-w-full">
          <TableHeader className="text-gray-400 font-mono">
            <TableRow>
              <TableHead>Student Name</TableHead>
              <TableHead>Father Name</TableHead>
              <TableHead>Class & Sec</TableHead>
              <TableHead className="text-right">Remaining Fee</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableItem />
            <TableItem />
            <TableItem />
          </TableBody>
        </Table>
      </main>
    </Dashboard>
  );
}
