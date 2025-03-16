import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Investment, InvestmentFormData } from "../../lib/types";

export const investmentApi = createApi({
  reducerPath: "investmentApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL 
    ,
    prepareHeaders: (headers) => {
      headers.set("Accept", "application/json");
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

    addInvestment: builder.mutation<Investment, InvestmentFormData>({
      query: ({ name, amount, document }) => {
        // If a file is included, use FormData
        if (document) {
          const formData = new FormData();
          formData.append("name", name);
          formData.append("amount", amount.toString());
          formData.append("document", document); // File upload

          return {
            url: "/investment",
            method: "POST",
            body: formData,
          };
        }

        // If no file, send JSON data
        return {
          url: "/investment",
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: { name, amount },
        };
      },
      invalidatesTags: [{ type: "Investments", id: "LIST" }],
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
