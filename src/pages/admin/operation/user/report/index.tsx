import Search from "@assets/icons/search_small.svg?react";

import { useState } from "react";
import styles from "./index.styles";

function UserReportOpertionPage() {
  const [filterValue, setFilterValue] = useState("all");

  return (
    <>
      {/* Title */}
      <div css={styles.titleHeaderContainer()}>
        {/* 신고당한 총 인원 */}
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
          <h3>Incompleted:</h3>
          <span>222</span>
        </div>
      </div>

      {/* Reports Container */}
      <div>
        {/* Reports Card */}
        <div>
          {/* Card Status */}
          <div>
            {/* User Profile + Status */}
            <div></div>

            {/* Actions Button */}
            <div></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserReportOpertionPage;
