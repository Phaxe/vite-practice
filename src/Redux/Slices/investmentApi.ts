import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Investment, InvestmentFormData } from "../../lib/types";

export const investmentApi = createApi({
  reducerPath: "investmentApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL 
    ,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  
  tagTypes: ["Investments"],
  endpoints: (builder) => ({
    
    getInvestments: builder.query({
      query: () => "/investment",
      providesTags: (result) => 
        result ? [{ type: "Investments", id: "LIST" }] : [],
    }),
    addInvestment: builder.mutation<Investment,InvestmentFormData >({
      query: (investmentData) => ({ 
        url: "/investment",
        method: "POST",
        body: investmentData,
      }),
      invalidatesTags: [{ type: "Investments", id: "LIST" }] // ✅ Triggers refetch after mutation
    }),
    deleteInvestment: builder.mutation<void, string>({
        query: (id: string) => ({
          url: `/investment/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: [{ type: "Investments", id: "LIST" }], // Refresh data after delete
      }),
  }),
});

// Export hooks
export const { useGetInvestmentsQuery, useAddInvestmentMutation, useDeleteInvestmentMutation } = investmentApi;
