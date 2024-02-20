import React, { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Progress from "./components/Progress";

const Error = lazy(() => import("./pages/Error"));
const AttendancePage = lazy(() => import("./pages/AttendancePage"));
const AttendanceInjestPage = lazy(() => import("./pages/AttendanceInjestPage"));

const AppLayout = () => {
  console.log("AppLayout Rendered");
  return (
    <div className="app w-screen h-screen">
      <Outlet />
    </div>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<Progress />}>
            <AttendancePage />
          </Suspense>
        ),
      },
      {
        path: "/attendance/getAttendanceView/:subjectClassPK/",
        element: (
          <Suspense fallback={<Progress />}>
            <AttendancePage />
          </Suspense>
        ),
      },
      {
        path: "/attendance/injest_to_backend/:subjectClassPK/",
        element: (
          <Suspense fallback={<Progress />}>
            <AttendanceInjestPage />{" "}
          </Suspense>
        ),
      },
    ],
  },
]);
const AppRouter = () => <RouterProvider router={appRouter} />;

export default AppRouter;
