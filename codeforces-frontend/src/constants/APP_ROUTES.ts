import { NavigateOptions } from "react-router-dom";

export type AppRouteItem = {
  pathname: string;
  options?: NavigateOptions;
};

export type AppRoute = {
  [key: string]: AppRouteItem;
};

const APP_ROUTES: AppRoute = {
  HOME: {
    pathname: "/",
  },
};

export default APP_ROUTES;
