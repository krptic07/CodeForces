import React from "react";
import { createBrowserRouter, RouteObject } from "react-router-dom";
import APP_ROUTES from "../constants/APP_ROUTES";
import MainLayout from "../Layouts/MainLayout";

const HomePage = React.lazy(() => import("../Pages/Home/Home.Page"));

const routeobj: RouteObject[] = [
  {
    element: <MainLayout />,
    children: [
      {
        path: APP_ROUTES.HOME.pathname,
        element: <HomePage />,
      },
    ],
  } as RouteObject,
];

const getAppRouter = () => createBrowserRouter(routeobj);

export default getAppRouter;
