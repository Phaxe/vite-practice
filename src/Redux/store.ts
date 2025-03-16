import { configureStore } from "@reduxjs/toolkit";
import { investmentApi } from "./Slices/investmentApi";

export const store = configureStore({
  reducer: {
  
    [investmentApi.reducerPath]: investmentApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(investmentApi.middleware),
});

// Export RootState and AppDispatch types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
