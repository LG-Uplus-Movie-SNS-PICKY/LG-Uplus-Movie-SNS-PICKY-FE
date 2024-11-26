import { ReactNode } from "react";

// Layout 컴포넌트의 props와 childeren 인덱싱 타입 정의
export interface LayoutProps {
  [key: string]: unknown;
  children: ReactNode;
}
