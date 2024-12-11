import GlobalHeader from "@components/header";
import { Flex as MainLayout } from "./index.styles";
import { Flex as Wrapper } from "./index.styles";
import { LayoutProps } from "./type";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import GlobalNavigatorBar from "@components/navbar";
import { useEffect, useState } from "react";

const isLoginTestValue = {
  state: false,
  role: "user",
};

function Layout({ children }: LayoutProps): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation(); // 현재 주소 가져오기
  const [isDefaultMargin, setIsDefaultMargin] = useState("60px 0");

  return (
    <>
      <MainLayout
        position="relative"
        direction="column"
        align="center"
        height="100vh"
      >
        <GlobalHeader location={location} navigate={navigate} />

        <Wrapper
          overflowY={"auto"}
          direction="column"
          justify="flex-start"
          margin={isDefaultMargin}
          // backgroundColor={isLoginTestValue.role === "admin" ? "#ffffff" : ""}
          // padding="16px"
          height="100vh"
        >
          <div style={{ marginTop: "60px" }}></div>
          {children}
        </Wrapper>

        <GlobalNavigatorBar location={location} navigate={navigate} />
      </MainLayout>
    </>
  );
}

export default Layout;
