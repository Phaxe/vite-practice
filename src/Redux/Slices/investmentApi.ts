import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const investmentApi = createApi({
  reducerPath: "investmentApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL }),
  tagTypes: ["Investments"],
  endpoints: (builder) => ({
    
    getInvestments: builder.query({
      query: () => "/Expenses",
      providesTags: (result) => 
        result ? [{ type: "Investments", id: "LIST" }] : [],
    }),
    addInvestment: builder.mutation({
      query: (investmentData) => ({ 
        url: "/Expenses",
        method: "POST",
        body: investmentData,
      }),
      invalidatesTags: [{ type: "Investments", id: "LIST" }] // ✅ Triggers refetch after mutation
    }),
    deleteInvestment: builder.mutation({
        query: (id: string) => ({
          url: `/Expenses/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: [{ type: "Investments", id: "LIST" }], // Refresh data after delete
      }),
  }),
});

// Export hooks
export const { useGetInvestmentsQuery, useAddInvestmentMutation, useDeleteInvestmentMutation } = investmentApi;
