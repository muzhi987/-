import zhCN from "antd/locale/zh_CN";
import { ConfigProvider } from "antd";
import ReactDOM from "react-dom/client";
import { RouterProvider, createHashRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.scss";

import Login from "./pages/login.tsx";

import ProtectedRoute from "./components/ProtectedRoute.tsx";
import AppProvider, { RouteData, roles } from "./components/AppProvider.tsx";

const router = createHashRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    children: RouteData.filter((item) => item.roles.includes(roles)),
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ConfigProvider locale={zhCN}>
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  </ConfigProvider>
);
