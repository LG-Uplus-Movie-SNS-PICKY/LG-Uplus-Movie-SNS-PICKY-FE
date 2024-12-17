import SEO from "@components/seo";
import FamousMovie from "./components/famous-movie";
import GenresMovie from "./components/genres-movie";
import LoginBanner from "./components/login-banner";
import RecommendMovieSlider from "./components/recommend-slider";

import { useRecoilValue } from "recoil";
import { isLogin } from "@recoil/atoms/isLoginState";
import { unreadCountState } from "@recoil/atoms/isNotificationState";
import axios from "axios";
import { getCookie } from "@util/cookie";
import { useEffect } from "react";

function Main() {
  const isLoginState = useRecoilValue(isLogin);

  const count = useRecoilValue(unreadCountState);

  const onClick = async () => {
    const user = getCookie("user");
    // reciverId = 17
    // boardId = 61
    // movieId = 11

    const response = await axios.post(
      `${
        import.meta.env.VITE_SERVER_URL
      }/api/v1/notification/alert?receiverId=${35}&boardId=${61}&movieId=${11}`,
      {},
      { headers: { Authorization: `Bearer ${user.localJwtDto.accessToken}` } }
    );
  };

  return (
    <>
      <SEO
        title="PICKY"
        description="PICKY는 영화 리뷰와 정보를 한곳에서 확인하고, 영화 팬들을 위한 최적의 커뮤니티 서비스입니다."
      />

      {process.env.NODE_ENV === "development" && (
        <button onClick={onClick}>Hello</button>
      )}

      {/* Slider or Banner Section */}
      {process.env.NODE_ENV !== "development" || !isLoginState.isLoginState ? (
        <LoginBanner />
      ) : (
        <RecommendMovieSlider />
      )}

      {/* Famous Movies Section */}
      <FamousMovie isLogin={isLoginState.isLoginState} />

      {/* Genre Movie Section */}
      <GenresMovie isLogin={isLoginState.isLoginState} />
    </>
  );
}

export default Main;
