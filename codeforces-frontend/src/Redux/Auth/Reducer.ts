import {
  ActionReducerMapBuilder,
  createSlice,
  CreateSliceOptions,
} from "@reduxjs/toolkit";

import { SLICE_NAME } from "./Selector";
import { INITIAL_STATE, T_AUTH_REDUCER } from "./TYPES";

const sliceOptions: CreateSliceOptions<T_AUTH_REDUCER> = {
  name: SLICE_NAME,
  initialState: INITIAL_STATE,
  reducers: {},
  // extraReducers: (builder: ActionReducerMapBuilder<T_AUTH_REDUCER>): void =>  {
  //     builder.addCase(login.success, (state, {payload})=> {
  //         state.isLoggedIn = true
  //     })
  // },
};

const slice = createSlice(sliceOptions);

export default slice.reducer;
