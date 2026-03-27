import { Navigate, useLocation } from "react-router-dom";
function ProtectedRoute({ isAuth, children }) {
  const location = useLocation();
  if (!isAuth) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return children;
}
export default ProtectedRoute;
