import zhCN from "antd/locale/zh_CN";
import { ConfigProvider } from "antd";
import ReactDOM from "react-dom/client";
import { RouterProvider, createHashRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.scss";
import Products from "./pages/products.tsx";
import Users from "./pages/users.tsx";
import Forums from "./pages/forums.tsx";
import Login from "./pages/login.tsx";
import Dashboard from "./pages/dashboard.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";

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
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "products",
        element: <Products />,
      },
      { path: "users", element: <Users /> },

      { path: "forums", element: <Forums /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ConfigProvider locale={zhCN}>
    <RouterProvider router={router} />
  </ConfigProvider>
);
