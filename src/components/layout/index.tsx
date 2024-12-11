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

const isLoginTestValue = {
  state: false,
  role: "user",
};

function Layout({ children }: LayoutProps): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation(); // 현재 주소 가져오기

  const isLoginInfo = useRecoilValue(isLogin);

  const [showHeader, setShowHeader] = useState("");
  const [showGlobalNavbar, setShowGlobalNavbar] = useState(false);
  const [isDefaultMargin, setIsDefaultMargin] = useState("0");

  useEffect(() => {
    if (isLoginInfo.isLoginState) {
      const config = routeConfig.find(
        (config) =>
          config.path ===
          matchPath(config.path, location.pathname)?.pattern.path
      );

      setShowHeader(config?.header || "");
      setShowGlobalNavbar(config?.gnb || false);
      setIsDefaultMargin(config?.margin || "0");
    }
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
          show={showHeader}
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
