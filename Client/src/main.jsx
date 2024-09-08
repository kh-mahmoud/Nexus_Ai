import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./globals.css";
import Home from "./_route/pages/Home";
import RootLayout from "./_route/layouts/RootLayout";
import SignUpPage from "./_auth/SignUpPage";
import SignInPage from "./_auth/SignInPage";
import Dashboard from "./_route/pages/Dashboard";
import { ClerkProvider } from "@clerk/clerk-react";
import AuthLayout from "./_route/layouts/AuthLayout";
import { ChakraProvider } from "@chakra-ui/react";
import DashboardLayout from "./_route/layouts/DashboardLayout";
import ErrorPage from "./ErrorPage"

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement:<ErrorPage/>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        element: <DashboardLayout />,
        children: [
          {
            path: "/dashboard",
            element: <Dashboard />,
          },
          {
            path: "/dashboard/chats/:id",
            element:<Dashboard />,
          },
        ]
      }
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/sign-in/*",
        element: <SignInPage />,
      },
      {
        path: "/sign-up/*",
        element: <SignUpPage />,
      },
    ]

  }
]);

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}





ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <ChakraProvider>
        <RouterProvider router={router} />
      </ChakraProvider>
    </ClerkProvider>
  </React.StrictMode>
);