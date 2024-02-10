import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import RootLayout from "./pages/RootLayout";
import ErrorPage from "./pages/ErrorPage";
import Login from "./components/login/Login";
import Dashboard from "./components/dashboard/Dashboard";
import Market from "./components/marketplace/Market";
import LoanProposal from "./components/loan/LoanProposal";
import Navbar from "./components/UI/Navbar";
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Login /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "marketplace", element: <Market /> },
      { path: "loan-proposals", element: <LoanProposal /> },
    ],
  },
]);

const App = () => {
  const theme = createTheme({
    typography: {
      fontFamily: ["Poppins", "sans-serif"].join(","),
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
