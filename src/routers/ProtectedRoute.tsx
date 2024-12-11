import { Navigate, useNavigate } from "react-router-dom";
import useAuthorizaion from "@recoil/selectors/useAuthorization";

interface ProtectedRouteProps {
  children: JSX.Element;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const navigage = useNavigate();
  const { accessCommonPage, accessGuestPage, accessUserPage, accessAdminPage } =
    useAuthorizaion();

  if (accessAdminPage) navigage("/admin");

  return children;
}

export default ProtectedRoute;
