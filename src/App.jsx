import React from "react";
import { useKeycloak } from "@react-keycloak/web";

function App() {
    const { keycloak, initialized } = useKeycloak();

    if (!initialized) return <p>Loading Keycloak...</p>;

    const router = createBrowserRouter([
        {
          path: "/CustomerDetails",
          element: <CustomerDetails />,
          errorElement: <CustomerDetails />,
        },
        {
          path: "/CustomerForm",
          element: <CustomerForm />,
          errorElement: <CustomerForm />,
        },
        {
          path: "/DashBoard",
          element: <DashBoard />,
          errorElement: <DashBoard />,
        },
        {
          path: "/GoldLoanForm",
          element: <GoldLoanForm />,
          errorElement: <GoldLoanForm />,
        },
        {
          path: "/ThemeSelector",
          element: <ThemeSelector />,
          errorElement: <ThemeSelector />,
        },
        {
          path: "/LoanPayment",
          element: <LoanPayment />,
          errorElement: <LoanPayment />,
        },
        {
          path: "/LoanRenewal",
          element: <LoanRenewal/>,
          errorElement: <LoanRenewal/>,
        },
        {
          path: "/LoanApproval",
          element: <LoanApproval/>,
          errorElement: <LoanApproval/>,
        },
        {
          path: "/:tenantDomain",
          element: <TenantDetails/>,
          errorElement: <TenantDetails/>,
        },
        {
          path: "/",
          element: <LoginPage/>,
          errorElement: <LoginPage/>,
        },
      
      ]);

    return (
        <div>
             <RouterProvider router={router} />
        </div>
    );
}

export default App;
