import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import { throttle } from "lodash";
import FeedIcon from "@assets/icons/my-page/feed.svg?react";
import ReviewIcon from "@assets/icons/my-page/review.svg?react";
import LikeIcon from "@assets/icons/my-page/like.svg?react";
import styles from "./index.styles";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import MovieLogContnent from "./movie-log";
import LineReviewContent from "./review";
import LikeMovieContent from "./like-movie";
function TabMenu({ wrapperRef }) {
    const [activeTab, setActiveTab] = useState(0);
    const [isSticky, setIsSticky] = useState(false); // 고정 여부를 나타내는 상태 변수
    const tabBtnRefs = useRef([]);
    const lineRef = useRef(null);
    const swiperRef = useRef(null);
    useEffect(() => {
        const parentElement = wrapperRef.current;
        if (!parentElement)
            return;
        // throttle을 적용시킨 스크롤 이벤트 핸들러 콜백 함수
        const handleScroll = throttle(() => {
            if (!buttonContainer)
                return;
            // Tab Menu를 고정시킬 위치를 계산한다.
            const fixed = buttonContainer.getBoundingClientRect().bottom - 60 + 16 < 0;
            // Button Container가 보이지 않을 경우 Tab Menu를 고정시킨다.
            if (fixed)
                setIsSticky(true);
            else {
                // Button Container가 1px 이라도 보일 경우 Tab Menu의 고정을 취소시킨다.
                setIsSticky(false);
            }
        }, 100);
        // 탭 메뉴의 바로 상위 형제 태그를 불러온다.
        const buttonContainer = parentElement === null || parentElement === void 0 ? void 0 : parentElement.querySelector("#button-container");
        parentElement.addEventListener("scroll", handleScroll); // 스크롤 이벤트 핸들러 적용
        // 컴포넌트 언마운트 시 이벤트 핸들러 삭제
        return () => {
            parentElement.removeEventListener("scroll", handleScroll);
        };
    }, []);
    const handleClick = (event, idx) => {
        setActiveTab(idx);
        if (lineRef.current && swiperRef.current) {
            lineRef.current.style.width = event.currentTarget.offsetWidth + "px";
            lineRef.current.style.left = event.currentTarget.offsetLeft + "px";
            swiperRef.current.slideTo(idx);
        }
    };
    const handleSlide = (idx) => {
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
    const likeMovies = [
        {
            movie_id: 1,
            movie_poster_url: "https://i.namu.wiki/i/J-AwFq-6xzVxDQpE3q3CwCL_QBzYfL6MPINXL1kWPeNlZXWNjayXfzXqqyi8luo4m4GM9Bsh_nhy9Ig3m5a8FQ.webp",
            movie_title: "타이타닉",
        },
        {
            movie_id: 2,
            movie_poster_url: "https://i.namu.wiki/i/J-AwFq-6xzVxDQpE3q3CwCL_QBzYfL6MPINXL1kWPeNlZXWNjayXfzXqqyi8luo4m4GM9Bsh_nhy9Ig3m5a8FQ.webp",
            movie_title: "타이타닉",
        },
        {
            movie_id: 3,
            movie_poster_url: "https://i.namu.wiki/i/J-AwFq-6xzVxDQpE3q3CwCL_QBzYfL6MPINXL1kWPeNlZXWNjayXfzXqqyi8luo4m4GM9Bsh_nhy9Ig3m5a8FQ.webp",
            movie_title: "타이타닉",
        },
        {
            movie_id: 4,
            movie_poster_url: "https://i.namu.wiki/i/J-AwFq-6xzVxDQpE3q3CwCL_QBzYfL6MPINXL1kWPeNlZXWNjayXfzXqqyi8luo4m4GM9Bsh_nhy9Ig3m5a8FQ.webp",
            movie_title: "타이타닉",
        },
        {
            movie_id: 5,
            movie_poster_url: "https://i.namu.wiki/i/J-AwFq-6xzVxDQpE3q3CwCL_QBzYfL6MPINXL1kWPeNlZXWNjayXfzXqqyi8luo4m4GM9Bsh_nhy9Ig3m5a8FQ.webp",
            movie_title: "타이타닉",
        },
        {
            movie_id: 6,
            movie_poster_url: "https://i.namu.wiki/i/J-AwFq-6xzVxDQpE3q3CwCL_QBzYfL6MPINXL1kWPeNlZXWNjayXfzXqqyi8luo4m4GM9Bsh_nhy9Ig3m5a8FQ.webp",
            movie_title: "타이타닉",
        },
    ];
    const reviews = [
        {
            line_review_id: 1,
            line_review_rating: 4,
            line_review_content: "재밌어요",
            movie: {
                movie_id: 1,
                movie_title: "타이타닉",
                movie_poster_src: "https://i.namu.wiki/i/J-AwFq-6xzVxDQpE3q3CwCL_QBzYfL6MPINXL1kWPeNlZXWNjayXfzXqqyi8luo4m4GM9Bsh_nhy9Ig3m5a8FQ.webp",
            },
            line_review_like: 421,
            line_review_hate: 84,
            writer: {
                writer_id: 1,
                writer_nickname: "PICKY",
            },
            created_at: "2024-12-04 00:43:38",
        },
        {
            line_review_id: 2,
            line_review_rating: 4,
            line_review_content: "재밌어요",
            movie: {
                movie_id: 1,
                movie_title: "타이타닉",
                movie_poster_src: "https://i.namu.wiki/i/J-AwFq-6xzVxDQpE3q3CwCL_QBzYfL6MPINXL1kWPeNlZXWNjayXfzXqqyi8luo4m4GM9Bsh_nhy9Ig3m5a8FQ.webp",
            },
            line_review_like: 421,
            line_review_hate: 84,
            writer: {
                writer_id: 1,
                writer_nickname: "PICKY",
            },
            created_at: "2024-12-04 00:43:38",
        },
        {
            line_review_id: 3,
            line_review_rating: 4,
            line_review_content: "재밌어요",
            movie: {
                movie_id: 1,
                movie_title: "타이타닉",
                movie_poster_src: "https://i.namu.wiki/i/J-AwFq-6xzVxDQpE3q3CwCL_QBzYfL6MPINXL1kWPeNlZXWNjayXfzXqqyi8luo4m4GM9Bsh_nhy9Ig3m5a8FQ.webp",
            },
            line_review_like: 421,
            line_review_hate: 84,
            writer: {
                writer_id: 1,
                writer_nickname: "PICKY",
            },
            created_at: "2024-12-04 00:43:38",
        },
        {
            line_review_id: 4,
            line_review_rating: 4,
            line_review_content: "재밌어요",
            movie: {
                movie_id: 1,
                movie_title: "타이타닉",
                movie_poster_src: "https://i.namu.wiki/i/J-AwFq-6xzVxDQpE3q3CwCL_QBzYfL6MPINXL1kWPeNlZXWNjayXfzXqqyi8luo4m4GM9Bsh_nhy9Ig3m5a8FQ.webp",
            },
            line_review_like: 421,
            line_review_hate: 84,
            writer: {
                writer_id: 1,
                writer_nickname: "PICKY",
            },
            created_at: "2024-12-04 00:43:38",
        },
    ];
    return (_jsxs("div", { css: styles.tabMenuContainer(), children: [_jsxs("div", { css: styles.tabMenu(), className: isSticky ? "sticky" : "", children: [Array.from({ length: 3 }, (_, idx) => (_jsxs("div", { ref: (element) => {
                            if (element)
                                tabBtnRefs.current[idx] = element; // 각 버튼을 배열로 저장
                        }, className: `tab-btn ${activeTab === idx ? "active" : ""}`, onClick: (event) => handleClick(event, idx), children: [idx === 0 && _jsx(FeedIcon, {}), idx === 1 && _jsx(ReviewIcon, {}), idx === 2 && _jsx(LikeIcon, {})] }, idx))), _jsx("div", { ref: lineRef, className: "line" })] }), _jsx(Swiper, { onSwiper: (swiper) => (swiperRef.current = swiper), onSlideChange: (swiper) => handleSlide(swiper.activeIndex), slidesPerView: 1, modules: [Navigation], css: styles.tabMenuContent(), children: Array.from({ length: 3 }, (_, idx) => (_jsxs(SwiperSlide, { children: [idx === 0 && _jsx(MovieLogContnent, { data: Array.from({ length: 4 }) }), idx === 1 && _jsx(LineReviewContent, { data: reviews }), idx === 2 && _jsx(LikeMovieContent, { data: likeMovies })] }, idx)
                // <div
                //   // ref={(element) => {
                //   //   if (element) tabBtnRefs.current[idx] = element; // 각 버튼을 배열로 저장
                //   // }}
                //   key={idx}
                //   // className={`tab-btn ${activeTab === idx ? "active" : ""}`}
                //   // onClick={(event) => handleClick(event, idx)}
                // >
                //   {idx === 1 && <ReviewIcon />}
                //   {idx === 2 && <LikeIcon />}
                // </div>
                )) })] }));
}
export default TabMenu;
