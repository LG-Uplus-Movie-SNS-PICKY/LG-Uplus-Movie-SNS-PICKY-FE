import styles from "./index.styles";

import Search from "@assets/icons/search_small.svg?react";

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
        <div css={styles.movieContainer()}></div>
      </div>
    </>
  );
}

export default TotalMoviesSection;
