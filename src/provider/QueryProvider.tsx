import { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// QueryClient 생성 및 기본 옵션 설정
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // 브라우저 창 포커스 시 데이터를 다시 가져오지 않음
      staleTime: 5 * 60 * 1000, // 데이터가 신선하다고 간주되는 시간 (밀리초 단위, 5분 설정)
      retry: 1, // 요청 실패 시 재시도 횟수
    },
    mutations: {
      retry: 1, // 요청 실패 시 재시도 횟수
    },
  },
});

export default function QueryProvider({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}

{
  /* <ReactQueryDevtools initialIsOpen={false} /> */
}
