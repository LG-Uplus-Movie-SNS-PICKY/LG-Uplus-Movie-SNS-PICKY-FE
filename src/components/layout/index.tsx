import GlobalHeader from "@components/header";
import { Flex as MainLayout } from "./index.styles";
import { Flex as Wrapper } from "./index.styles";
import { LayoutProps } from "./type";
import {
  matchPath,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import GlobalNavigatorBar from "@components/navbar";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { isLogin } from "@recoil/atoms/isLoginState";
import { routeConfig } from "@constants/routes/routeConfig";
import { HeaderProps } from "@type/navigation";

function Layout({ children }: LayoutProps): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation(); // 현재 주소 가져오기

  const isLoginInfo = useRecoilValue(isLogin);

  const [headerTypes, setHeaderTypes] =
    useState<HeaderProps["headerType"]>("login");
  const [headerLabel, setHeaderLabel] = useState("");

  const [showGlobalNavbar, setShowGlobalNavbar] = useState(false);
  const [isDefaultMargin, setIsDefaultMargin] = useState("0");

  // 현재 경로에 맞는 Header와 Navbar의 타입 정의
  useEffect(() => {
    const config = routeConfig.find(
      (config) =>
        config.path === matchPath(config.path, location.pathname)?.pattern.path
    );

    setHeaderTypes(config?.header || "");
    setHeaderLabel(config?.label || "");

    setShowGlobalNavbar(config?.gnb || false);
    setIsDefaultMargin(config?.margin || "0");
  }, [isLoginInfo, location]);

  return (
    <>
      <MainLayout
        position="relative"
        direction="column"
        align="center"
        height="100vh"
      >
        <GlobalHeader
          headerType={headerTypes}
          label={headerLabel}
          location={location}
          navigate={navigate}
        />

        <Wrapper
          overflowY={"auto"}
          direction="column"
          justify="flex-start"
          margin={isDefaultMargin}
          // backgroundColor={isLoginTestValue.role === "admin" ? "#ffffff" : ""}
          // padding="16px"
          height="100vh"
        >
          {children}
        </Wrapper>

        <GlobalNavigatorBar
          show={showGlobalNavbar}
          location={location}
          navigate={navigate}
        />
      </MainLayout>
    </>
  );
}

export default Layout;
