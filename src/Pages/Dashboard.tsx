import React, { useEffect } from "react";
import { useGetInvestmentsQuery } from "../Redux/Slices/investmentApi";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Card } from "../components/ui/card";
import { Investment } from "../lib/types";
import { useTranslation } from "react-i18next";

export default function Dashboard() {
  const { data: investments, isLoading, error } = useGetInvestmentsQuery({});
  const { i18n, t } = useTranslation();
  const isRTL = i18n.language === "ar"; // Detect RTL mode

  // Set direction globally (optional)
  useEffect(() => {
    document.documentElement.setAttribute("dir", isRTL ? "rtl" : "ltr");
  }, [isRTL]);

  // Calculate summary values
  const totalInvestments = investments?.reduce((sum:number, inv:Investment) => sum + inv.amount, 0) || 0;
  const averageROI = investments?.length
    ? investments.reduce((sum:number, inv:Investment) => sum + inv.roi, 0) / investments.length
    : 0;

  // Format data for the chart
  const chartData = investments?.map((inv:Investment) => ({
    name: inv.name,
    roi: inv.roi,
  })) || [];

  return (
    <div dir={isRTL ? "rtl" : "ltr"} className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">{t("dashboard")}</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-4 text-center">
          <h2 className="text-xl font-semibold">{t("total_investments")}</h2>
          <p className="text-2xl font-bold">${totalInvestments.toFixed(2)}</p>
        </Card>
        <Card className="p-4 text-center">
          <h2 className="text-xl font-semibold">{t("average_roi")}</h2>
          <p className="text-2xl font-bold">{averageROI.toFixed(2)}%</p>
        </Card>
      </div>

      {/* ROI Trend Line Chart */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 rtl:text-right">{t("roi_trends")}</h2>
        {isLoading ? (
          <p>Loading chart...</p>
        ) : error ? (
          <p className="text-red-500">Error loading data</p>
        ) : (
          <ResponsiveContainer  width="100%" height={300}>
            <LineChart data={chartData}  layout="horizontal">
              <XAxis 
                dataKey="name" 
                reversed={isRTL} // Reverse X-axis for RTL
              />
              <YAxis reversed={isRTL} /> {/* Reverse Y-axis for RTL */}
              <Tooltip />
              <Line type="monotone" dataKey="roi" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
