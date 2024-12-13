import { Cookies } from "react-cookie";
import { CookieSetOptions } from "universal-cookie";

const cookie = new Cookies();

// 쿠키 설정
export const setCookie = (
  name: string,
  value: unknown,
  options: CookieSetOptions | undefined
) => {
  return cookie.set(name, value, { ...options });
};

// 쿠키 정보 가져오기
export const getCookie = (name: string) => {
  return cookie.get(name);
};

// 쿠키 삭제
export const removeCookie = (name: string) => {
  return cookie.remove(name, { path: "/" });
};
