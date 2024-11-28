import GlobalHeader from "@components/header";
import { Flex as MainLayout } from "./index.styles";
import { Flex as Wrapper } from "./index.styles";
import { LayoutProps } from "./type";
import { useLocation, useNavigate } from "react-router-dom";
import GlobalNavigatorBar from "@components/navbar";

const isLoginTestValue = {
  state: true,
  role: "user",
};

function Layout({ children }: LayoutProps): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation(); // 현재 주소 가져오기

  const isDefaultMargin =
    !isLoginTestValue.state || isLoginTestValue.role === "admin";

  return (
    <>
      <MainLayout
        position="relative"
        direction="column"
        align="center"
        height="100vh"
      >
        <GlobalHeader
          location={location}
          navigate={navigate}
          isLoginTestValue={isLoginTestValue}
        />
        <Wrapper
          overflowY={"auto"}
          direction="column"
          justify="flex-start"
          margin={isDefaultMargin ? "" : "60px 0"}
          backgroundColor={isLoginTestValue.role === "admin" ? "#ffffff" : ""}
          // padding="16px"
          height="100lvh"
        >
          {children}
        </Wrapper>

        <GlobalNavigatorBar
          location={location}
          navigate={navigate}
          isLoginTestValue={isLoginTestValue}
        />
      </MainLayout>
    </>
  );
}

export default Layout;
