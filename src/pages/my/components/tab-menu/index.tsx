import React, { useEffect, useRef, useState } from "react";
import { throttle } from "lodash";
import styles from "./index.styles";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Mousewheel } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

interface TabMenuProps {
  wrapperRef: React.MutableRefObject<HTMLDivElement | null>;
}

function TabMenu({ wrapperRef }: TabMenuProps) {
  const [isSticky, setIsSticky] = useState(false); // 고정 여부를 나타내는 상태 변수

  useEffect(() => {
    const parentElement = wrapperRef.current;

    if (!parentElement) return;

    // throttle을 적용시킨 스크롤 이벤트 핸들러 콜백 함수
    const handleScroll = throttle(() => {
      if (!buttonContainer) return;

      // Tab Menu를 고정시킬 위치를 계산한다.
      const fixed =
        buttonContainer.getBoundingClientRect().bottom - 60 + 16 < 0;

      // Button Container가 보이지 않을 경우 Tab Menu를 고정시킨다.
      if (fixed) setIsSticky(true);
      else {
        // Button Container가 1px 이라도 보일 경우 Tab Menu의 고정을 취소시킨다.
        setIsSticky(false);
      }
    }, 100);

    // 탭 메뉴의 바로 상위 형제 태그를 불러온다.
    const buttonContainer = parentElement?.querySelector("#button-container");
    parentElement.addEventListener("scroll", handleScroll); // 스크롤 이벤트 핸들러 적용

    // 컴포넌트 언마운트 시 이벤트 핸들러 삭제
    return () => {
      parentElement.removeEventListener("scroll", handleScroll);
    };
  }, [wrapperRef]);

  return (
    <div css={styles.tabMenuContainer()}>
      {/* Tab Menus */}
      <div css={styles.tabMenu()} className={isSticky ? "sticky" : ""}>
        <span>Movie Log</span>
        <span>Line Review</span>
        <span>Like</span>
      </div>

      {/* Content */}
      <div css={styles.tabMenuContent()}></div>
    </div>
  );
}

export default TabMenu;
