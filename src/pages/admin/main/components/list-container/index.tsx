import React from "react";
import styles from "./index.styles";

import { OverviewListItemTypes } from "./constant";
import ArrowButton from "@assets/icons/dashboard/arrow-btn.svg?react";
import { useNavigate } from "react-router-dom";

function DashboardListItem({
  element,
  title,
  description,
  bgColor,
  boxShadowColor,
  path,
}: OverviewListItemTypes) {
  const navigate = useNavigate();
  const onClick = (path: string) => {
    navigate(path);
  };

  return (
    // List Item Container
    <div
      css={styles.dashboardListItemContainer(bgColor, boxShadowColor)}
      onClick={() => onClick(path)}
    >
      {/* 아이템 아이콘 */}
      <div css={styles.dashboardListItemCircle()}>
        {React.createElement(element)}
      </div>

      {/* 아이템 정보 */}
      <div css={styles.dashboardListItemInfo()}>
        <h1>{title}</h1>

        <div className="description">
          {description}
          <ArrowButton />
        </div>
      </div>
    </div>
  );
}

export default DashboardListItem;
