import { configureStore } from "@reduxjs/toolkit";
import { filmApi } from "./api/";

export const store = configureStore({
  reducer: {
    [filmApi.reducerPath]: filmApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(filmApi.middleware),
});
