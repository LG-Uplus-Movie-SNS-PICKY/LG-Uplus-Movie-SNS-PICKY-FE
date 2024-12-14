import React from "react";

import styles from "./index.styles";
import { DashboardInfoListTypes } from "@hooks/admin/info/types";

interface DashboardInfoContainerProps {
  data: DashboardInfoListTypes;
}

// 렌더링 되는 컴포넌트
function DashboardInfoContainer({ data }: DashboardInfoContainerProps) {
  return (
    <div css={styles.container()}>
      {/* 타이틀 영역 */}
      <div css={styles.containerTitle()}>
        <h3>{data.listTitle}</h3>
      </div>

      <div className="line" />

      <div css={styles.listContainer()}>
        {/* data sub item mapping */}
        {data.listItem &&
          data.listItem.map((item, idx) => {
            return (
              <div
                key={idx}
                css={styles.listItemContainer(item.itemBgColor)}
                onClick={item.onClick}
              >
                {React.createElement(item.itemIcon)}

                {/* Data Item Info */}
                <div className="info-container">
                  <div css={styles.listItemInfo()}>
                    <div css={styles.listItemInfoTitle()}>
                      <h3 className="titleInfo">{item.itemTitle}</h3>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default DashboardInfoContainer;
