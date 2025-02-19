import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import CustomerDetails from './Pages/CustomerDetails';
import CustomerForm from './Pages/CustomerForm';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./Components/ThemeContext";
import ThemeSelector from './Components/ThemeSelector';
import GoldLoanForm from './Pages/GoldLoanForm';
import LoanPayment from './Pages/LoanPayments';
import LoanRenewal from './Pages/LoanRenewal';
import LoanApproval from './Pages/LoanApproval';
import DashBoard from './Pages/DashBoard';
import TenantDetails from './Pages/TenantDetails';
import LoginPage from './Pages/LoginPage';
import AuthProvider from './AuthProvider';
import App from './App';

// Define Routes
// const router = createBrowserRouter([
//   {
//     path: "/CustomerDetails",
//     element: <CustomerDetails />,
//     errorElement: <CustomerDetails />,
//   },
//   {
//     path: "/CustomerForm",
//     element: <CustomerForm />,
//     errorElement: <CustomerForm />,
//   },
//   {
//     path: "/DashBoard",
//     element: <DashBoard />,
//     errorElement: <DashBoard />,
//   },
//   {
//     path: "/GoldLoanForm",
//     element: <GoldLoanForm />,
//     errorElement: <GoldLoanForm />,
//   },
//   {
//     path: "/ThemeSelector",
//     element: <ThemeSelector />,
//     errorElement: <ThemeSelector />,
//   },
//   {
//     path: "/LoanPayment",
//     element: <LoanPayment />,
//     errorElement: <LoanPayment />,
//   },
//   {
//     path: "/LoanRenewal",
//     element: <LoanRenewal/>,
//     errorElement: <LoanRenewal/>,
//   },
//   {
//     path: "/LoanApproval",
//     element: <LoanApproval/>,
//     errorElement: <LoanApproval/>,
//   },
//   {
//     path: "/:tenantDomain",
//     element: <TenantDetails/>,
//     errorElement: <TenantDetails/>,
//   },
//   {
//     path: "/",
//     element: <LoginPage/>,
//     errorElement: <LoginPage/>,
//   },

// ]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
    <ThemeProvider>
      {/* <RouterProvider router={router} /> */}
      <App />
    </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>
);
