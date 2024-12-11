import { Navigate, useNavigate } from "react-router-dom";
import { useAuthorizaion } from "@recoil/selectors/useAuthorization";
import Loading from "@components/loading";

interface ProtectedRouteProps {
  role: string;
  children: JSX.Element;
}

function ProtectedRoute({ role, children }: ProtectedRouteProps) {
  const { accessGuestPage, accessUserPage, accessAdminPage } =
    useAuthorizaion();

  // 로딩 중 상태를 확인
  if (accessGuestPage && !accessUserPage && !accessAdminPage) {
    return null;
  }

  // 로그인 사용자만 접근할 수 있는 페이지 권환 관리
  if (role === "guest" && !accessGuestPage) {
    return <Navigate to="/" />;
  }

  // 비로그인 사용자는 접근하지 못하는 페이지 권환 관리
  if (role === "user" && !accessUserPage) {
    return <Navigate to="/auth/sign-in" />;
  }

  // 비로그인, 로그인 사용자만 접근할 수 있는 페이지에 접근할 때 사용자 권한이 관리자일 경우 -> /admin으로 강제 라우트 이동
  if (["common", "guest", "user"].includes(role) && accessAdminPage) {
    return <Navigate to="/admin" />;
  }

  // 관리자 페이지에 접근을 하는데 유저 권환이 권리자가 아닐 경우
  if (role === "admin" && !accessAdminPage) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;
