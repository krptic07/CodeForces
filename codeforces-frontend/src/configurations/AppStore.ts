import { configureStore } from "@reduxjs/toolkit";
import reducers from "../Redux/Reducers";

const AppStore = configureStore({
  reducer: reducers,
  devTools: process.env.NODE_ENV !== "production",
});

export default AppStore;

type TAppStore = ReturnType<typeof AppStore.getState>;
type TAppDispatch = typeof AppStore.dispatch;

export { TAppDispatch, TAppStore };
