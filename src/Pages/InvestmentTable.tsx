
  import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
  import { Skeleton } from "../components/ui/skeleton";

  import AddInvestmentModal from "../components/AddInvestment/AddInvestment";
  import { useDeleteInvestmentMutation, useGetInvestmentsQuery } from "../Redux/Slices/investmentApi";
import { Button } from "../components/ui/button";
import { Trash2 } from "lucide-react";
import { Investment } from "../lib/types";
import { useTranslation } from "react-i18next";
  export default function InvestmentTable() {
    const { data: investments, error, isLoading } = useGetInvestmentsQuery({});
    const [deleteInvestment] = useDeleteInvestmentMutation();
    const {t} = useTranslation()
 
    
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
      { "status" in error 
        ? `Error ${error.status}: ${JSON.stringify(error.data)}`  // API error
        : error.message }  // Other errors
    </p>
  )}  


        {/* Table Container for Responsiveness */}
        <AddInvestmentModal/>
        <div className="overflow-x-auto rounded-lg border shadow-md flex flex-col w-full">
       
          <Table className="w-full">
            <TableHeader>
              <TableRow className="bg-gray-100 dark:bg-gray-800">
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
            ) : investments?.length > 0 ? (
              investments.map((investment: Investment) => (
                <TableRow key={investment.id} className="hover:bg-gray-50 dark:hover:bg-gray-900">
                  <TableCell className="p-4 font-medium">{investment.name}</TableCell>
                  <TableCell className="p-4">${investment.amount}</TableCell>
                  <TableCell className="p-4">{investment.roi}%</TableCell>
                  <TableCell className="p-4">
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(String(investment.id))}>
                      <Trash2 className="w-5 h-5 text-red-500 hover:text-red-700" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              // If no investments, show message
              <TableRow>
                <TableCell colSpan={4} className="p-4 text-center text-gray-500">
                  {t("no_data_available")}
                </TableCell>
              </TableRow>
            )}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }
