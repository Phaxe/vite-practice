import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Skeleton } from "../components/ui/skeleton";
import AddInvestmentModal from "../components/AddInvestment/AddInvestment";
import {
  useDeleteInvestmentMutation,
  useGetInvestmentsQuery,
} from "../Redux/Slices/investmentApi";

import { useTranslation } from "react-i18next";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import DraggableRow from "../components/Dragable/DraggableRow";
import { Investment } from "../lib/types";
import { useInvestmentDnD } from "../lib/hooks";


export default function InvestmentTable() {
  const { data: investments, error, isLoading } = useGetInvestmentsQuery({});
  const [deleteInvestment] = useDeleteInvestmentMutation();
  const { t } = useTranslation();

  // DnD Hook
  const { investmentList, handleDragEnd, sensors } = useInvestmentDnD(investments || []);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this investment?")) {
      await deleteInvestment(id);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{t("invest_table")}</h1>

      {/* Error Handling */}
      {error && (
        <p className="text-red-500">
          {"status" in error
            ? `Error ${error.status}: ${JSON.stringify(error.data)}`
            : error.message}
        </p>
      )}

      {/* Table Container */}
      <AddInvestmentModal />
      <div className="overflow-x-auto rounded-lg border shadow-md flex flex-col w-full">
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={investmentList} strategy={verticalListSortingStrategy}>
            <Table className="w-full">
              <TableHeader>
                <TableRow className="bg-gray-100 dark:bg-gray-800">
                  <TableHead className="h-0 w-0"></TableHead>
                  <TableHead className="p-4">{t("investmentname")}</TableHead>
                  <TableHead className="p-4">{t("amount")} ($)</TableHead>
                  <TableHead className="p-4">{t("roi")} (%)</TableHead>
                  <TableHead className="p-4">{t("actions")}</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {/* Show Skeletons while loading */}
                {isLoading ? (
                  [...Array(5)].map((_, i) => (
                    <TableRow key={i}>
                      <TableCell className="p-4">
                        <Skeleton className="h-6 w-32" />
                      </TableCell>
                      <TableCell className="p-4">
                        <Skeleton className="h-6 w-20" />
                      </TableCell>
                      <TableCell className="p-4">
                        <Skeleton className="h-6 w-16" />
                      </TableCell>
                    </TableRow>
                  ))
                ) : investmentList.length > 0 ? (
                  investmentList.map((investment:Investment) => (
                    <DraggableRow key={investment.id} investment={investment} handleDelete={handleDelete} />
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="p-4 text-center text-gray-500">
                      {t("no_data_available")}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}
