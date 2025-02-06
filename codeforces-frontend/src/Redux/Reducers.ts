import { combineReducers, ReducersMapObject } from "redux";
import { T_AUTH_REDUCER } from "./Auth/TYPES";
import { SLICE_NAME as AuthSliceName } from "./Auth/Selector";
import AuthReducer from "./Auth/Reducer";

export type TReducers = {
  [AuthSliceName]: T_AUTH_REDUCER;
};

const reducers: ReducersMapObject<TReducers> = {
  [AuthSliceName]: AuthReducer,
};

export default combineReducers<ReducersMapObject<TReducers>>(reducers);
