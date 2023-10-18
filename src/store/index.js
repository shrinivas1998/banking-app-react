import { configureStore } from "@reduxjs/toolkit";
import { noteReducer } from "./notes/notes-slice";
import { tokenReducer } from "./token-slice/token-slice";

export const store = configureStore({
  reducer: {
    noteSlice : noteReducer,
    tokenSlice: tokenReducer
  },
});
