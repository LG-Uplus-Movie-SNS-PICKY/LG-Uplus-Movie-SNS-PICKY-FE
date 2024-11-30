import RegistMovieSection from "./components/register-section";
import TotalMoviesSection from "./components/total-movies";

import styles from "./index.styles";

function MoviesOpertionPage() {
  return (
    <>
      <div css={styles.wrapper()}>
        {/* 영화 등록 Section */}
        <RegistMovieSection />

        {/* 등록된 영화 리스트 관리 Section */}
        <TotalMoviesSection />
      </div>
    </>
  );
}

export default MoviesOpertionPage;
