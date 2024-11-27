import styles from "./index.styles";

import CheckIcon from "@assets/icons/check.svg?react";
import CancleIcon from "@assets/icons/cancle.svg?react";

function MoviePlaylistOpertionPage() {
  return (
    <>
      {/* Title */}
      <div css={styles.titleHeaderContainer()}>
        {/* 플레이리스트 개수 */}
        <div className="container">
          <h3>Total Playlist:</h3>
          <span>36</span>
        </div>
      </div>

      {/* Playlist Container */}
      <div css={styles.playlistContainer()}>
        {/* Playlist Card */}
        <div css={styles.playlistCard()}>
          <div css={styles.playlistCardHeader()}>
            {/* PlayList Name + Actions Button */}
            <h3 className="playlist-title">빨간안경 이동진의 픽 Pick</h3>

            {/* Actions Button */}
            <div css={styles.actionButton()}>
              <button>수정</button>
              <button>삭제</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MoviePlaylistOpertionPage;

// {/* Suspended Card - 정지된 사용자 정보 */}
// <div css={styles.reportCard()}>
// {/* Card Header */}
// <div css={styles.reportCardHeader()}>

// </div>
// </div>

// {/* Suspended Card - 이의 신청 내용 */}
// <div css={styles.reportCard()}>
// {/* Card Header */}
// <div css={styles.reportCardHeader()}>
//   {/* User Profile + Status */}
//   <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
//     {/* User Profile */}
//     <div css={styles.profilePanel()}>
//       <div className="profile_image">
//         <img />
//       </div>

//       <div className="profile_info">
//         <span>Amanda</span>
//         <span>amanda@gmail.com</span>
//       </div>
//     </div>

//     {/* Status */}
//     {/* <div css={styles.status()}>처리완료</div> */}
//   </div>

//   {/* Actions Button */}
//   <div css={styles.actionButton()}>
//     <button>
//       <CheckIcon />
//     </button>
//     <button>
//       <CancleIcon />
//     </button>
//   </div>
// </div>

// <div className="line"></div>

// {/* Suspended Info */}
// <div css={styles.reportInfoContainer()}>
//   {/* 이의 신청 내용 */}
//   <div css={styles.reportMessageBox()}>
//     {/* 제목 */}
//     <h1 className="title">Report</h1>
//     <div className="description">
//       Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus
//       itaque maiores iusto dignissimos saepe sequi assumenda, nesciunt
//       molestiae magni libero earum reprehenderit explicabo nisi eius
//       laborum. Impedit aliquid fuga cum.
//     </div>
//   </div>
// </div>
// </div>

// {/* Suspended Card - 이의 신청 승인 접수  */}
// <div css={styles.reportCard()}>
// {/* Card Header */}
// <div css={styles.reportCardHeader()}>
//   {/* User Profile + Status */}
//   <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
//     {/* User Profile */}
//     <div css={styles.profilePanel()}>
//       <div className="profile_image">
//         <img />
//       </div>

//       <div className="profile_info">
//         <span>Amanda</span>
//         <span>amanda@gmail.com</span>
//       </div>
//     </div>
//   </div>

//   <div css={styles.actionButton()}>
//     {/* Status */}
//     <div css={styles.status(true)}>승인</div>
//   </div>
// </div>

// <div className="line"></div>

// {/* Reports Info */}
// <div css={styles.reportInfoContainer()}>
//   {/* 신고 내용 */}
//   <div css={styles.reportMessageBox()}>
//     {/* 제목 */}
//     <h1 className="title">Report</h1>
//     <div className="description">
//       Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus
//       itaque maiores iusto dignissimos saepe sequi assumenda, nesciunt
//       molestiae magni libero earum reprehenderit explicabo nisi eius
//       laborum. Impedit aliquid fuga cum.
//     </div>
//   </div>
// </div>
// </div>

// // {/* Suspended Card - 이의 신청 미승인 접수  */}
// // <div css={styles.reportCard()}>
// // {/* Card Header */}
// // <div css={styles.reportCardHeader()}>
// //   {/* User Profile + Status */}
// //   <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
// //     {/* User Profile */}
// //     <div css={styles.profilePanel()}>
// //       <div className="profile_image">
// //         <img />
// //       </div>

// //       <div className="profile_info">
// //         <span>Amanda</span>
// //         <span>amanda@gmail.com</span>
// //       </div>
// //     </div>
// //   </div>

// //   <div css={styles.actionButton()}>
// //     {/* Status */}
// //     <div css={styles.status(false)}>미승인</div>
// //   </div>
// // </div>

// // <div className="line" />

// // {/* Reports Info */}
// // <div css={styles.reportInfoContainer()}>
// //   {/* 신고 내용 */}
// //   <div css={styles.reportMessageBox()}>
// //     {/* 제목 */}
// //     <h1 className="title">Request</h1>
// //     <div className="description">
// //       Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus
// //       itaque maiores iusto dignissimos saepe sequi assumenda, nesciunt
// //       molestiae magni libero earum reprehenderit explicabo nisi eius
// //       laborum. Impedit aliquid fuga cum.
// //     </div>
// //   </div>
// // </div>

// // <div className="line" />

// // {/* Reports Info */}
// // <div css={styles.reportInfoContainer()}>
// //   {/* 신고 내용 */}
// //   <div css={styles.reportMessageBox()}>
// //     {/* 제목 */}
// //     <h1 className="title">Response</h1>
// //     <div className="description">
// //       Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus
// //       itaque maiores iusto dignissimos saepe sequi assumenda, nesciunt
// //       molestiae magni libero earum reprehenderit explicabo nisi eius
// //       laborum. Impedit aliquid fuga cum.
// //     </div>
// //   </div>
// // </div>
// // </div>
