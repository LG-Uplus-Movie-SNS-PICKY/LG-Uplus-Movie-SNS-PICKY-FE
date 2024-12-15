import SEO from "@components/seo";
import FamousMovie from "./components/famous-movie";
import GenresMovie from "./components/genres-movie";
import LoginBanner from "./components/login-banner";
import RecommendMovieSlider from "./components/recommend-slider";

import { useRecoilValue } from "recoil";
import { isLogin } from "@recoil/atoms/isLoginState";
import axios from "axios";

function Main() {
  const isLoginState = useRecoilValue(isLogin);

  const onClick = async () => {
    // receiverId => 17
    // boardId => 61
    // movieId => 11

    const response = await axios
      .post(
        `${
          import.meta.env.VITE_SERVER_URL
        }/api/v1/notification/alert?receiverId=${17}&boardId=${61}&movieId=${11}`,
        {},
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MTcsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzM0MjUzNDA5LCJleHAiOjE3MzQzMzk4MDl9.YBBIqKJ3aa1acKopTxFVk8sEnoqh452Cya-T3p-a_bk`,
          },
        }
      )
      .then((res) => res.data);

    console.log(response);
  };

  return (
    <>
      <SEO
        title="PICKY"
        description="PICKY는 영화 리뷰와 정보를 한곳에서 확인하고, 영화 팬들을 위한 최적의 커뮤니티 서비스입니다."
      />

      <button onClick={onClick}>Hello</button>

      {/* Slider or Banner Section */}
      {process.env.NODE_ENV !== "development" || !isLoginState.isLoginState ? (
        <LoginBanner />
      ) : (
        <RecommendMovieSlider />
      )}

      {/* Famous Movies Section */}
      <FamousMovie isLogin={isLoginState.isLoginState} />

      {/* Genre Movie Section */}
      <GenresMovie />
    </>
  );
}

export default Main;
