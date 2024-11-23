import GlobalHeader from "@components/header";
import { Flex as MainLayout } from "./index.styles";
import { Flex as Wrapper } from "./index.styles";
import { LayoutProps } from "./type";
import { useLocation, useNavigate } from "react-router-dom";
import GlobalNavigatorBar from "@components/navbar";

function Layout({ children }: LayoutProps): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation(); // 현재 주소 가져오기

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
          // width={363}
          direction="column"
          justify="flex-start"
          margin="60px 0"
          padding="16px"
        >
          {children}
        </Wrapper>
        <GlobalNavigatorBar location={location} navigate={navigate} />
      </MainLayout>
    </>
  );
}

export default Layout;
