import React, { useEffect, useRef, useState } from "react";
import { throttle } from "lodash";

import FeedIcon from "@assets/icons/my-page/feed.svg?react";
import ReviewIcon from "@assets/icons/my-page/review.svg?react";
import LikeIcon from "@assets/icons/my-page/like.svg?react";

import styles from "./index.styles";

import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { FreeMode, Mousewheel, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

interface TabMenuProps {
  wrapperRef: React.MutableRefObject<HTMLDivElement | null>;
}

function TabMenu({ wrapperRef }: TabMenuProps) {
  const [activeBtn, setActiveBtn] = useState(0);
  const [isSticky, setIsSticky] = useState(false); // 고정 여부를 나타내는 상태 변수

  const tabFirstBtnRef = useRef<HTMLDivElement | null>(null);
  const lineRef = useRef<HTMLDivElement | null>(null);

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
  }, []);

  const handleClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    idx: number
  ) => {
    setActiveBtn(idx);

    if (lineRef.current) {
      lineRef.current.style.width = event.currentTarget.offsetWidth + "px";
      lineRef.current.style.left = event.currentTarget.offsetLeft + "px";
    }
  };

  useEffect(() => {
    if (tabFirstBtnRef.current && lineRef.current) {
      lineRef.current.style.width = tabFirstBtnRef.current.offsetWidth + "px";
      lineRef.current.style.left = tabFirstBtnRef.current.offsetLeft + "px";
    }
  }, []);

  return (
    <div css={styles.tabMenuContainer()}>
      {/* Tab Menus */}
      <div css={styles.tabMenu()} className={isSticky ? "sticky" : ""}>
        {Array.from({ length: 3 }, (_, idx) => (
          <div
            ref={idx === 0 ? tabFirstBtnRef : null}
            key={idx}
            className={`tab-btn ${activeBtn === idx ? "active" : ""}`}
            onClick={(event) => handleClick(event, idx)}
          >
            {idx === 0 && <FeedIcon />}
            {idx === 1 && <ReviewIcon />}
            {idx === 2 && <LikeIcon />}
          </div>
        ))}

        <div ref={lineRef} className="line" />
      </div>

      {/* <Swiper
        ref={tabMenuRef}
        slidesPerView={3}
        spaceBetween={0}
        allowTouchMove={false}
        css={styles.tabMenu()}
        className={isSticky ? "sticky" : ""}
        onSlideChange={(swiper) => setActiveTab(swiper.activeIndex)}
        onSwiper={(swiper) => swiper.slideTo(activeTab)}
      >
        {Array.from({ length: 3 }, (_, idx) => (
          <SwiperSlide key={idx}>
            <div onClick={() => handleTabClick(idx)}>
              {idx === 0 && <FeedIcon />}
              {idx === 1 && <ReviewIcon />}
              {idx === 2 && <LikeIcon />}
            </div>
          </SwiperSlide>
        ))}
      </Swiper> */}

      {/* Swiper - Content Section */}
      {/* <Swiper
        ref={contentSwiperRef}
        onSlideChange={(swiper) => setActiveTab(swiper.activeIndex)}
        slidesPerView={1}
        modules={[Navigation]}
        css={styles.tabMenuContent()}
      >
        <div css={styles.moveBoard()} />

        <SwiperSlide>
          <div>Movie Log Content</div>
        </SwiperSlide>

        <SwiperSlide>
          <div>Line Review Content</div>
        </SwiperSlide>

        <SwiperSlide>
          <div>Like Content</div>
        </SwiperSlide>
      </Swiper> */}
    </div>
  );
}

export default TabMenu;
