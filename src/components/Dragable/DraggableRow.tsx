import { TableRow, TableCell } from "../../components/ui/table";
import { Button } from "../../components/ui/button";
import { Trash2, GripVertical } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Investment } from "../../lib/types";

export default function DraggableRow({
  investment,
  handleDelete,
}: {
  investment: Investment;
  handleDelete: (id: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: investment.id });

  return (
    <TableRow
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className="hover:bg-gray-50 dark:hover:bg-gray-900"
    >
      {/* Drag Handle Icon */}
      <TableCell className="p-4">
        <button {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing">
          <GripVertical className="w-5 h-5 text-gray-500 hover:text-gray-700" />
        </button>
      </TableCell>

      <TableCell className="p-4 font-medium">{investment.name}</TableCell>
      <TableCell className="p-4">{investment.amount} $</TableCell>
      <TableCell className="p-4">{investment.roi}%</TableCell>
      <TableCell className="p-4">
        <Button variant="ghost" size="icon" onClick={() => handleDelete(String(investment.id))}>
          <Trash2 className="w-5 h-5 text-red-500 hover:text-red-700" />
        </Button>
      </TableCell>
    </TableRow>
  );
}
