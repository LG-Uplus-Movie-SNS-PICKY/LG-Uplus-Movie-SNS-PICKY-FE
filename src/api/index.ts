import axios, { AxiosError } from "axios";
import { isEmpty } from "lodash";
import { Cookies } from "react-cookie";

const cookie = new Cookies();

// Axios 초기 설정
const apiClient = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}/api/v1`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Axios 요청(Request) 인터셉터(Interceptors) 정의
apiClient.interceptors.request.use((config) => {
  // const token = JSON.parse(sessionStorage.getItem("user") || "{}");
  const token = cookie.get('user');

  // 토큰이 비워져있지 않을 경우
  if (!isEmpty(token)) {
    // Headaers 인증 정보를 accessToken으로 수정
    config.headers.Authorization = `Bearer ${token.localJwtDto.accessToken}`;
  }

  return config;
});

// Axios 응답(Response) 인터셉터(Interceptors) - 에러 핸들링 등 추가 기능 정의
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // 공통 에러 처리 로직
    console.log(error);
    
    if (error.response) {
      // 서버에서 받은 응답(Response) 에러 처리
      console.error("API Error", error.response.data || error.message);
    } else {
      // 네트워크 에러 또는 기타 에러
      console.error("Network Error: " + error.message);
    }

    return Promise.resolve(error);
  }
);

export default apiClient;
