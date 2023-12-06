import Products from "../pages/products.tsx";
import Users from "../pages/users.tsx";
import Forums from "../pages/forums.tsx";

import Dashboard from "../pages/dashboard.tsx";

import { createContext } from "react";

export const context = createContext<any>({});

export const roles = "admin";

export const RouteData = [
  {
    path: "dashboard",
    element: <Dashboard />,
    roles: ["admin", "editor"],
  },
  {
    path: "products",
    element: <Products />,
    roles: ["editor"],
  },
  { path: "users", element: <Users />, roles: ["admin", "editor"] },

  { path: "forums", element: <Forums />, roles: ["admin", "editor"] },
];

function AppProvider({ children }: any) {
  return <context.Provider value={{ RouteData }}>{children}</context.Provider>;
}

export default AppProvider;
