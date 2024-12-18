import React, { useEffect, useRef, useState } from "react";
import { throttle } from "lodash";
import { useRecoilValue } from "recoil";

import FeedIcon from "@assets/icons/my-page/feed.svg?react";
import ReviewIcon from "@assets/icons/my-page/review.svg?react";
import LikeIcon from "@assets/icons/my-page/like.svg?react";

import styles from "./index.styles";

import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import MovieLogContent from "./movie-log";
import LineReviewContent from "./review";
import LikeMovieContent from "./like-movie";

interface TabMenuProps {
  wrapperRef: React.MutableRefObject<HTMLDivElement | null>;
  nickname: string; // nickname을 props로 받음
}

function TabMenu({ wrapperRef, nickname }: TabMenuProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [isSticky, setIsSticky] = useState(false);

  const tabBtnRefs = useRef<HTMLDivElement[]>([]);
  const lineRef = useRef<HTMLDivElement | null>(null);
  const swiperRef = useRef<SwiperClass | null>(null);

  useEffect(() => {
    const parentElement = wrapperRef.current;

    if (!parentElement) return;

    const handleScroll = throttle(() => {
      if (!buttonContainer) return;

      const fixed = buttonContainer.getBoundingClientRect().y < 80;

      setIsSticky(fixed);
    }, 100);

    const buttonContainer = parentElement?.querySelector("#button-container");
    parentElement.addEventListener("scroll", handleScroll);

    return () => {
      parentElement.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    idx: number
  ) => {
    setActiveTab(idx);

    if (lineRef.current && swiperRef.current) {
      lineRef.current.style.width = event.currentTarget.offsetWidth + "px";
      lineRef.current.style.left = event.currentTarget.offsetLeft + "px";
      swiperRef.current.slideTo(idx);
    }
  };

  const handleSlide = (idx: number) => {
    setActiveTab(idx);

    if (lineRef.current) {
      lineRef.current.style.width = tabBtnRefs.current[idx].offsetWidth + "px";
      lineRef.current.style.left = tabBtnRefs.current[idx].offsetLeft + "px";
    }
  };

  useEffect(() => {
    if (tabBtnRefs.current && lineRef.current) {
      lineRef.current.style.width =
        tabBtnRefs.current[activeTab].offsetWidth + "px";
      lineRef.current.style.left =
        tabBtnRefs.current[activeTab].offsetLeft + "px";
    }
  }, []);

  return (
    <div css={styles.tabMenuContainer()}>
      <div
        id="button-container"
        css={styles.tabMenu()}
        className={isSticky ? "sticky" : ""}
      >
        {Array.from({ length: 3 }, (_, idx) => (
          <div
            ref={(element) => {
              if (element) tabBtnRefs.current[idx] = element;
            }}
            key={idx}
            className={`tab-btn ${activeTab === idx ? "active" : ""}`}
            onClick={(event) => handleClick(event, idx)}
          >
            {idx === 0 && <FeedIcon />}
            {idx === 1 && <ReviewIcon />}
            {idx === 2 && <LikeIcon />}
          </div>
        ))}
        <div ref={lineRef} className="line" />
      </div>

      {/* Swiper - Content Section */}
      <Swiper
        spaceBetween={20}
        autoHeight={true}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => handleSlide(swiper.activeIndex)}
        slidesPerView={1}
        modules={[Navigation]}
        css={styles.tabMenuContent()}
      >
        {Array.from({ length: 3 }, (_, idx) => (
          <SwiperSlide key={idx}>
            {idx === 0 && <MovieLogContent nickname={nickname} />}
            {idx === 1 && <LineReviewContent nickname={nickname} />}
            {idx === 2 && (
              <LikeMovieContent nickname={nickname} swiper={swiperRef} />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default TabMenu;
