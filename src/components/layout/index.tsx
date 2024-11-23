import { ReactNode } from "react";
import { Flex as MainLayout } from "./index.styles";

// Layout 컴포넌트의 props와 childeren 인덱싱 타입 정의
interface LayoutProps {
  [key: string]: unknown;
  children: ReactNode;
}

function Layout({ children }: LayoutProps): JSX.Element {
  return (
    <MainLayout direction="column" justify="flex-start" align="center">
      {children}
    </MainLayout>
  );
}

export default Layout;
