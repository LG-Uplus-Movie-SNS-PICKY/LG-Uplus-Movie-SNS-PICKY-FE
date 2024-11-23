import GlobalHeader from "@components/header";
import { Flex as MainLayout } from "./index.styles";
import { LayoutProps } from "./type";

function Layout({ children }: LayoutProps): JSX.Element {
  return (
    <>
      <GlobalHeader />
      <MainLayout direction="column" justify="flex-start" align="center">
        {children}
      </MainLayout>
    </>
  );
}

export default Layout;
