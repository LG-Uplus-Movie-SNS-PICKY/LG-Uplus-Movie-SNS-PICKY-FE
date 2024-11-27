import { useState } from "react";
import styles from "./index.styles";

// Swiper Lib Import
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Mousewheel } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import Comment from "@assets/icons/feed-comment.svg?react";
import image1 from "@assets/images/dummy/image1.jpeg";
import image2 from "@assets/images/dummy/image2.jpeg";
import image3 from "@assets/images/dummy/image3.jpeg";

const dummyData = [image1, image2, image3];
const dummyCommentData = [
  {
    profile: {
      image: image1,
      name: "꼬미",
    },
    comment:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facilis est omnis inventore laboriosam laudantium consectetur, aperiam quisquam fugiat, suscipit aut voluptas sapiente atque dolor vitae autem labore ullam excepturi iste.",
    created_at: "4시간 전",
  },
  {
    profile: {
      image: image2,
      name: "Coming",
    },
    comment: "왈왈!",
    created_at: "4시간 전",
  },
  {
    profile: {
      image: image3,
      name: "왈왈왈",
    },
    comment:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facilis est omnis inventore laboriosam laudantium consectetur, aperiam quisquam fugiat",
    created_at: "4시간 전",
  },
];

function MovieLogsOpertionPage() {
  const [modalOpen, setModalOpen] = useState(false);
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

          <div css={styles.line()}></div>

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

              <Swiper
                slidesPerView={"auto"}
                spaceBetween={10}
                direction={"horizontal"}
                freeMode={true}
                modules={[FreeMode, Mousewheel]}
                mousewheel={true}
                css={styles.swiperContainer()}
              >
                {dummyData.map((data, idx) => {
                  return (
                    <SwiperSlide key={idx}>
                      <img src={data} alt={idx.toString()} />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>

            {/* 댓글 관리 */}
            <div
              css={styles.commentContainer()}
              onClick={() => setModalOpen(true)}
            >
              <Comment />
              <span>24</span>
            </div>
          </div>
        </div>

        {/* Modal */}
        {modalOpen ? (
          <div
            css={styles.modalOuterContainer()}
            onClick={() => setModalOpen(false)}
          >
            <div
              css={styles.modalContainer()}
              onClick={(event) => event.stopPropagation()}
            >
              {/* Modal Header */}
              <div css={styles.modalHeader()}>
                <div className="profile">
                  <div className="profile_image">
                    <img />
                  </div>

                  <div className="profile_info">
                    <span>Amanda</span>
                    <span>Eternal Sunshine</span>
                  </div>
                </div>
              </div>

              <div css={styles.line()}></div>

              {/* Modal Comments -> Slider로 변경 */}
              <div css={styles.modalContent()}>
                {dummyCommentData.length ? (
                  dummyCommentData.map((comment) => (
                    <div css={styles.modalCommentCard()}>
                      {/* 프로필 정보 + 댓글 */}
                      <div className="profile">
                        <div className="profile_image">
                          <img src={comment.profile.image} />
                        </div>

                        <div className="profile_info">
                          <div className="profile_info-created">
                            <span>{comment.profile.name}</span>
                            <span className="date">{comment.created_at}</span>
                          </div>

                          <p className="comment">{comment.comment}</p>
                        </div>
                      </div>
                      {/* 숨김 토글 버튼 */}
                      <button
                        css={styles.miniToggleBtn()}
                        onClick={() => setToggled(!toggled)}
                        className={toggled ? "toggled" : ""}
                      >
                        <div className="thumb" />
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="no-reviews">
                    현재 게시물에는 아무 댓글이 달리지 않았습니다.
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default MovieLogsOpertionPage;
