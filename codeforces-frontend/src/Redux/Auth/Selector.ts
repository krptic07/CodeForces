import { createSelector } from "@reduxjs/toolkit";
import { TAppStore } from "../../configurations/AppStore";

export const SLICE_NAME = "auth";

const select = (state: TAppStore) => state[SLICE_NAME];

export const isLoggedInSelector = createSelector(
  [select],
  (auth) => auth.isLoggedIn
);
