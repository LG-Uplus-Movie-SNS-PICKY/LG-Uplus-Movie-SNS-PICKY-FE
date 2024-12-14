import SEO from "@components/seo";
import BsetMovieSection from "./components/best-movies";
import GenreTab from "./components/genres-tab";
import MovieBackdropBanner from "./components/movie-backdrop-banner";
import PlayListSection from "./components/playlist";
import styles from "./index.styles";

function PickyPage() {
  // Top 10 영화 -> 리액트 쿼리
  return (
    <>
      <SEO
        title="PICKY: MOVIE PICKY"
        description="PICKY에 등록된 영화 플레이리스트를 통해 원하는 영화를 찾아보세요"
        url="http://localhost:5173/picky"
      />

      <div css={styles.pickyPageContainer()}>
        {/* Movie Backdrop Banner (Best Movie 평점 1등) */}
        <MovieBackdropBanner />

        {/* Genres Tab - Slider(가로) */}
        <GenreTab />

        {/* Best Movies Section */}
        <BsetMovieSection />

        {/* Playlists */}
        <PlayListSection />
      </div>
    </>
  );
}

export default PickyPage;
