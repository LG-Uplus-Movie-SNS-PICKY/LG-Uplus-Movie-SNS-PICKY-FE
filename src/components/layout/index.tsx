import GlobalHeader from "@components/header";
import { Flex as MainLayout } from "./index.styles";
import { Flex as Wrapper } from "./index.styles";
import { LayoutProps } from "./type";

function Layout({ children }: LayoutProps): JSX.Element {
  return (
    <>
      <MainLayout
        position="relative"
        direction="column"
        align="center"
        height="100vh"
      >
        <GlobalHeader />
        <Wrapper
          // width={363}
          direction="column"
          justify="flex-start"
          margin="60px 0"
          padding="16px"
        >
          {children}
        </Wrapper>
      </MainLayout>
    </>
  );
}

export default Layout;
