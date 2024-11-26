import styles from "./index.styles";

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
    </>
  );
}

export default UserSuspendedOpertionPage;
