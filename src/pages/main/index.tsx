import SEO from "@components/seo";
import FamousMovie from "./components/famous-movie";
import GenresMovie from "./components/genres-movie";
import LoginBanner from "./components/login-banner";
import RecommendMovieSlider from "./components/recommend-slider";

import { useRecoilValue } from "recoil";
import { isLogin } from "@recoil/atoms/isLoginState";

function Main() {
  const isLoginState = useRecoilValue(isLogin);

  return (
    <>
      <SEO
        title="PICKY"
        description="PICKY는 영화 리뷰와 정보를 한곳에서 확인하고, 영화 팬들을 위한 최적의 커뮤니티 서비스입니다."
      />

      {/* Slider or Banner Section */}
      {isLoginState.isLoginState ? <RecommendMovieSlider /> : <LoginBanner />}

      {/* Famous Movies Section */}
      <FamousMovie isLogin={isLoginState.isLoginState} />

      {/* Genre Movie Section */}
      <GenresMovie />
    </>
  );
}

export default Main;
