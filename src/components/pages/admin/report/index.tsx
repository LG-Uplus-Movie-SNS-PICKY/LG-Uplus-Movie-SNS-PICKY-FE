import Search from "@assets/icons/search_small.svg?react";

import CheckIcon from "@assets/icons/check.svg?react";
import CancleIcon from "@assets/icons/cancle.svg?react";

import { useState } from "react";
import styles from "./index.styles";

function ReportComponent() {
  const [filterValue, setFilterValue] = useState("all");

  return (
    <>
      {/* Title */}
      <div css={styles.titleHeaderContainer()}>
        {/* 총 인원 */}
        <div className="container">
          <h3>Total Reports:</h3>
          <span>294</span>
        </div>

        {/*  */}
        <div className="container">
          <h3>Completed Reports:</h3>
          <span>72</span>
        </div>

        <div className="container">
          <h3>Incompleted Reports:</h3>
          <span>222</span>
        </div>
      </div>

      {/* Reports Container */}
      <div css={styles.reportContainer()}>
        {/* Reports Card */}
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
              <div css={styles.status()}>처리완료</div>
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

          {/* Reports Info */}
          <div css={styles.reportInfoContainer()}>
            {/* 신고자 정보  */}
            <div style={{ display: "flex" }}>
              {/* User Profile */}
              <div css={styles.profilePanel()}>
                <div className="profile_image">
                  <img />
                </div>

                <div className="profile_info">
                  <span>Frank</span>
                  <span>ffrank@gmail.com</span>
                </div>
              </div>
            </div>

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
      </div>
    </>
  );
}

export default ReportComponent;
