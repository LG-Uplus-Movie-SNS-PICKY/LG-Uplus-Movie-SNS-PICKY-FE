import styles from "./index.styles";

import CheckIcon from "@assets/icons/check.svg?react";
import CancleIcon from "@assets/icons/cancle.svg?react";

function UserSuspendedOpertionPage() {
  return (
    <>
      {/* Title */}
      <div css={styles.titleHeaderContainer()}>
        {/* 총 인원 */}
        <div className="container">
          <h3>Suspended Account:</h3>
          <span>78</span>
        </div>

        {/* 이의 신청을 제기한 사용자 수 */}
        <div className="container">
          <h3>Appeal Request:</h3>
          <span>29</span>
        </div>

        {/* 이의 신청이 접수된 수 */}
        <div className="container">
          <h3>Submitted Appeals:</h3>
          <span>4</span>
        </div>
      </div>

      {/* Suspended Container */}
      <div css={styles.reportContainer()}>
        {/* Suspended Card - 정지된 사용자 정보 */}
        <div css={styles.reportCard()}>
          {/* Card Header */}
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
                  <span>amanda@gmail.com</span>
                </div>
              </div>

              {/* <div css={styles.status()}>처리완료</div> */}
            </div>

            {/* Actions Button */}
            <div css={styles.actionButton()}>
              {/* 정지 풀기 */}
              <button>
                <CancleIcon />
              </button>
            </div>
          </div>
        </div>

        {/* Suspended Card - 이의 신청 내용 */}
        <div css={styles.reportCard()}>
          {/* Card Header */}
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
                  <span>amanda@gmail.com</span>
                </div>
              </div>

              {/* Status */}
              {/* <div css={styles.status()}>처리완료</div> */}
            </div>

            {/* Actions Button */}
            <div css={styles.actionButton()}>
              <button>
                <CheckIcon />
              </button>
              <button>
                <CancleIcon />
              </button>
            </div>
          </div>

          <div className="line"></div>

          {/* Suspended Info */}
          <div css={styles.reportInfoContainer()}>
            {/* 이의 신청 내용 */}
            <div css={styles.reportMessageBox()}>
              {/* 제목 */}
              <h1 className="title">Report</h1>
              <div className="description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus
                itaque maiores iusto dignissimos saepe sequi assumenda, nesciunt
                molestiae magni libero earum reprehenderit explicabo nisi eius
                laborum. Impedit aliquid fuga cum.
              </div>
            </div>
          </div>
        </div>

        {/* Suspended Card - 이의 신청 승인 접수  */}
        <div css={styles.reportCard()}>
          {/* Card Header */}
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
                  <span>amanda@gmail.com</span>
                </div>
              </div>
            </div>

            <div css={styles.actionButton()}>
              {/* Status */}
              <div css={styles.status(true)}>승인</div>
            </div>
          </div>

          <div className="line"></div>

          {/* Reports Info */}
          <div css={styles.reportInfoContainer()}>
            {/* 신고 내용 */}
            <div css={styles.reportMessageBox()}>
              {/* 제목 */}
              <h1 className="title">Report</h1>
              <div className="description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus
                itaque maiores iusto dignissimos saepe sequi assumenda, nesciunt
                molestiae magni libero earum reprehenderit explicabo nisi eius
                laborum. Impedit aliquid fuga cum.
              </div>
            </div>
          </div>
        </div>

        {/* Suspended Card - 이의 신청 미승인 접수  */}
        <div css={styles.reportCard()}>
          {/* Card Header */}
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
                  <span>amanda@gmail.com</span>
                </div>
              </div>
            </div>

            <div css={styles.actionButton()}>
              {/* Status */}
              <div css={styles.status(false)}>미승인</div>
            </div>
          </div>

          <div className="line" />

          {/* Reports Info */}
          <div css={styles.reportInfoContainer()}>
            {/* 신고 내용 */}
            <div css={styles.reportMessageBox()}>
              {/* 제목 */}
              <h1 className="title">Request</h1>
              <div className="description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus
                itaque maiores iusto dignissimos saepe sequi assumenda, nesciunt
                molestiae magni libero earum reprehenderit explicabo nisi eius
                laborum. Impedit aliquid fuga cum.
              </div>
            </div>
          </div>

          <div className="line" />

          {/* Reports Info */}
          <div css={styles.reportInfoContainer()}>
            {/* 신고 내용 */}
            <div css={styles.reportMessageBox()}>
              {/* 제목 */}
              <h1 className="title">Response</h1>
              <div className="description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus
                itaque maiores iusto dignissimos saepe sequi assumenda, nesciunt
                molestiae magni libero earum reprehenderit explicabo nisi eius
                laborum. Impedit aliquid fuga cum.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserSuspendedOpertionPage;
