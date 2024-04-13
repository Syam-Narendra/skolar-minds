import {
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  Table,
} from "~/components/ui/table";
import { TableItem } from "~/customComponents/tableItem";

export default function Staff() {
  return (
    <main className="flex-grow  p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-medium">Staff Members</h1>
      </div>
      <Table className="text-left min-w-full">
        <TableHeader className="text-gray-400 font-mono">
          <TableRow>
            <TableHead>Faculty Name</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>Class</TableHead>
            <TableHead>Employee ID</TableHead>
            <TableHead>Faculty Type</TableHead>
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
  );
}
