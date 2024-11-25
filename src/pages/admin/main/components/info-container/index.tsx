import React from "react";

import styles from "./index.styles";
import { DashboardInfoListTypes } from "./type/index.d";

interface DashboardInfoContainerProps {
  data: DashboardInfoListTypes;
}

function DashboardInfoContainer({ data }: DashboardInfoContainerProps) {
  return (
    <div css={styles.container()}>
      {/* 타이틀 영역 */}
      <div css={styles.containerTitle()}>
        <h3>{data.listTitle}</h3>
        <span>View All</span>
      </div>

      <div className="line" />

      <div css={styles.listContainer()}>
        {/* data sub item mapping */}
        {data.listItem &&
          data.listItem.map((item, idx) => {
            return (
              <div key={idx} css={styles.listItemContainer(item.itemBgColor)}>
                {React.createElement(item.itemIcon)}

                {/* Data Item Info */}
                <div className="info-container">
                  <div css={styles.listItemInfo()}>
                    <div css={styles.listItemInfoTitle()}>
                      <h3 className="titleInfo">{item.itemTitle}</h3>
                      <h3 className="titleInfo">
                        {new Intl.NumberFormat("en-US").format(
                          item.itemTotalCount ?? 0
                        )}
                      </h3>
                    </div>
                  </div>

                  {/* Data Sub Item Info */}
                  {item.subItems && (
                    <div css={styles.listSubItemInfoContainer()}>
                      {item.subItems.map((subItem, idx) => {
                        return (
                          <div key={idx} className="list-sub-item-info">
                            <h3 className="subItemTitle">
                              {subItem.subItemTitle}
                            </h3>
                            <h3>
                              {new Intl.NumberFormat("en-US").format(
                                subItem.subItemTotalCount ?? 0
                              )}
                            </h3>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default DashboardInfoContainer;
