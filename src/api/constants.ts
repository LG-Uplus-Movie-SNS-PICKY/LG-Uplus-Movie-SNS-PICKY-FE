export const BASE_URL = import.meta.env.VITE_BASE_URL;
export const KAKAO_CLIENT_ID = import.meta.env.VITE_KAKAO_CLIENT_ID;
export const KAKAO_REDIRECT_URL = import.meta.env.VITE_KAKAO_REDIRECT_URL;

export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
export const GOOGLE_REDIRECT_URL = import.meta.env.VITE_GOOGLE_REDIRECT_URL;

export const NAVER_CLIENT_ID = import.meta.env.VITE_NAVER_CLIENT_ID;
export const NAVER_REDIRECT_URL = import.meta.env.VITE_NAVER_REDIRECT_URL;
export const NAVER_PLATFORM = import.meta.env.VITE_NAVER_PLATFORM;

export const KAKAO_LOGIN_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URL}&response_type=code`;
// export const GOOGLE_LOGIN_URL = `https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?client_id=203808692176-rfg2t9l2u8kfgf7fom31ua7875cr10pd.apps.googleusercontent.com&response_type=code&redirect_uri=${GOOGLE_REDIRECT_URL}&scope=email&state=1234&service=lso&o2v=2&ddm=1&flowName=GeneralOAuthFlow`;
export const GOOGLE_LOGIN_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&response_type=code&redirect_uri=http://localhost:5173/auth/sign-in/oauth2/google/callback&scope=email&state=1234`;
export const NAVER_LOGIN_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${NAVER_REDIRECT_URL}&state=1234`;

export const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;


