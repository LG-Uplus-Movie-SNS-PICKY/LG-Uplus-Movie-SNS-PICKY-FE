import Top10 from "@assets/icons/top10.svg?react";
import Info from "@assets/icons/Info.svg?react";

import styles from "./index.styles";

function FamousMovie() {
  return (
    <div css={styles.famousContainer()}>
      {/* Title */}
      <div css={styles.titleWrapper()}>
        <div className="title">
          <Top10 />
          <h3>picky top 10</h3>
        </div>

        <Info />
      </div>

      {/* Content - Slider */}
      <div></div>
    </div>
  );
}

export default FamousMovie;
