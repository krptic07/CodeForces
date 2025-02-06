import React, { Suspense } from "react";
import getAppRouter from "./configurations/getAppRouter";
import { RouterProvider } from "react-router-dom";
import Loader from "./components/Loader";

let router: ReturnType<typeof getAppRouter> | undefined;

const AppRouter: React.FC = () => {
  if (!router) {
    router = getAppRouter();
  }
  return (
    <Suspense fallback={<Loader />}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default AppRouter;
