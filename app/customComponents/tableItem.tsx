import { TableRow, TableCell } from "~/components/ui/table";

export const TableItem = () => (
  <TableRow className="border-b border-gray-300 mb-5">
    <TableCell>Pavan</TableCell>
    <TableCell>Srinu</TableCell>
    <TableCell>5 B</TableCell>
    <TableCell className="text-right">₹75,000</TableCell>
  </TableRow>
);
