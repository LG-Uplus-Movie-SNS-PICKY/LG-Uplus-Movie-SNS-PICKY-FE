import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
import Home from "@assets/icons/home.svg?react";
import Picky from "@assets/icons/picky.svg?react";
import MovieSocial from "@assets/images/movie-social.png";
import Recommend from "@assets/icons/recommend.svg?react";
import User from "@assets/icons/user.svg?react";
import ActiveHome from "@assets/icons/active_home.svg?react";
import ActivePicky from "@assets/icons/active_picky.svg?react";
import ActiveMovieSocial from "@assets/images/movie-social-active.png";
import ActiveRecommend from "@assets/icons/active_recommend.svg?react";
import ActiveUser from "@assets/icons/active_user.svg?react";
import styles from "./index.styles";
const tabMenus = [
    {
        icon: _jsx(Home, {}),
        activeIcon: _jsx(ActiveHome, {}),
        name: "home",
        label: "홈",
    },
    {
        icon: _jsx(Picky, {}),
        activeIcon: _jsx(ActivePicky, {}),
        name: "picky",
        label: "picky",
    },
    {
        icon: MovieSocial,
        activeSrc: ActiveMovieSocial,
        name: "movie",
        label: "무비로그",
    },
    {
        icon: _jsx(Recommend, {}),
        activeIcon: _jsx(ActiveRecommend, {}),
        name: "recommend",
        label: "추천",
    },
    {
        icon: _jsx(User, {}),
        activeIcon: _jsx(ActiveUser, {}),
        name: "user",
        label: "my",
    },
];
function ImageTabMenu({ src, activeSrc, label, active, }) {
    return (_jsxs(_Fragment, { children: [_jsx("div", { children: _jsx("img", { src: active ? activeSrc : src, alt: `${label.toUpperCase()}-icon-image` }) }), _jsx("span", { children: label })] }));
}
function SvgTabMenu({ icon, label }) {
    return (_jsxs(_Fragment, { children: [icon, _jsx("span", { children: label })] }));
}
/**
 * NavigaterBar 컴포넌트
 * @description 전역에서 재사용 가능한 내비게이션 바 컴포넌트
 * `tapMenus` 배열을 기반으로 동적으로 메뉴를 렌더링
 *
 * @returns {JSX.Element} 내비게이션 바 JSX 요소를 반환
 */
export function NavigaterBar({ state, onClick, }) {
    return (_jsx("nav", { css: styles.navbarContainer(), children: tabMenus &&
            tabMenus.map((menu, idx) => {
                return (
                // 탭 항목의 Box 영역
                _jsx("div", { css: styles.navbarMenuItem(menu.name, state === menu.name), onClick: () => onClick(menu.name), children: typeof menu.icon === "string" ? (
                    // PICKY 탭 클릭할 경우 -> SVG 파일이 아니기 때문에 조건부 처리
                    _jsx(ImageTabMenu, { src: menu.icon, activeSrc: menu.activeSrc, label: menu.label, active: state === menu.name })) : (
                    // PICKY 탭 이외의 탭을 클릭할 경우
                    _jsx(SvgTabMenu, { icon: state === menu.name ? menu.activeIcon : menu.icon, label: menu.label })) }, idx));
            }) }));
}
