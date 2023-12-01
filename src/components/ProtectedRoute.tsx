import { Navigate } from "react-router-dom";
import { getToken } from "../utils/tools";

function ProtectedRoute({ children }: any) {
  return getToken() ? children : <Navigate to="login" />;
}

export default ProtectedRoute;
