import { useState } from "react";
import styles from "./index.styles";

const dummyData = [
  "/Users/jogyewon/Desktop/Web/Git/LG-Uplus-Movie-SNS-PICKY-FE/src/assets/images/dummy/image1.jpeg",
  "/Users/jogyewon/Desktop/Web/Git/LG-Uplus-Movie-SNS-PICKY-FE/src/assets/images/dummy/image2.jpeg",
  "/Users/jogyewon/Desktop/Web/Git/LG-Uplus-Movie-SNS-PICKY-FE/src/assets/images/dummy/image3.jpeg",
];

function MovieLogsOpertionPage() {
  const [toggled, setToggled] = useState(false);

  return (
    <>
      {/* Movie Logs Container */}
      <div css={styles.reportContainer()}>
        {/* Movie Logs Card */}
        <div css={styles.reportCard()}>
          {/* Card Header - 프로필, 영화, 숨김 토글 버튼 */}
          <div css={styles.reportCardHeader()}>
            {/* User Profile + Status */}
            <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
              {/* User Profile */}
              <div css={styles.profilePanel()}>
                <div className="profile_image">
                  <img />
                </div>

                <div className="profile_info">
                  <span>Amanda</span>
                  <span>Eternal Sunshine</span>
                </div>
              </div>

              {/* Status */}
              {/* <div css={styles.status()}>처리완료</div> */}
            </div>

            {/* Actions Button */}
            <button
              css={styles.toggleBtn()}
              onClick={() => setToggled(!toggled)}
              className={toggled ? "toggled" : ""}
            >
              <div className="thumb" />
            </button>
          </div>

          <div className="line"></div>

          {/* Suspended Info */}
          <div css={styles.reportInfoContainer()}>
            {/* 이의 신청 내용 */}
            <div css={styles.reportMessageBox()}>
              {/* 제목 */}
              <p className="description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus
                itaque maiores iusto dignissimos saepe sequi assumenda, nesciunt
                molestiae magni libero earum reprehenderit explicabo nisi eius
                laborum. Impedit aliquid fuga cum.
              </p>

              <div>이미지 / 비디오 슬라이드 화면 출력</div>
            </div>

            {/* 댓글 관리 */}
            <div>comment: 21(클릭 시 모달창)</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MovieLogsOpertionPage;
