import styles from "./index.styles";

import Search from "@assets/icons/search_small.svg?react";

const movieInfo = {
  title: "이터널 선샤인",
  original_title: "(Eternal Sunshine of the Spotless Mind)",
  genres: [
    { id: 1, name: "SF" },
    { id: 2, name: "드라마" },
    { id: 3, name: "로맨스" },
  ],
  release_date: "2004-03-19",
  poster_path:
    "https://image.tmdb.org/t/p/original//6HNRo7VYpvM5x5O921bEF2BG7f4.jpg",
};

function TotalMoviesSection() {
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {/* Title */}
        <div css={styles.titleHeaderContainer()}>
          {/* 플레이리스트 개수 */}
          <div className="container">
            <div className="section total">
              <h3>Total Movies:</h3>
              <span>305</span>
            </div>

            {/* 검색 필터 */}
            <div className="section search">
              <input type="text" placeholder="등록한 영화를 검색해주세요." />
              <button>
                <Search />
              </button>
            </div>
          </div>

          {/* 장르 필터 */}
          <div className="gerens">
            <button>액션</button>
          </div>
        </div>

        {/* Movies Container */}
        <div css={styles.movieContainer()}>
          {/* Movies Card */}
          <div css={styles.movieCard()}>
            {/* Movies Top -> Info, Poster */}
            <div css={styles.movieDetailTop()}>
              {/* Title, Genres, Release */}
              <div className="detail">
                <div className="info">
                  <h3>제목</h3>
                  <span>
                    {movieInfo.title}({movieInfo.original_title})
                  </span>
                </div>

                <div className="info">
                  <h3>장르</h3>
                  <span>
                    {movieInfo.genres.map((genre) => genre.name).join(", ")}
                  </span>
                </div>

                <div className="info">
                  <h3>출시년도</h3>
                  <span>{movieInfo.release_date}</span>
                </div>
              </div>

              {/* Poster */}
              <div className="movie-poster">
                <img
                  src={movieInfo.poster_path}
                  alt={movieInfo.original_title}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TotalMoviesSection;
