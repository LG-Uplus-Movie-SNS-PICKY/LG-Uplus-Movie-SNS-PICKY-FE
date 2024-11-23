import Home from "@assets/icons/home.svg?react";
import MovieSocial from "@assets/icons/movie_social.svg?react";
import Recommend from "@assets/icons/recommend.svg?react";
import User from "@assets/icons/user.svg?react";

import ActiveHome from "@assets/icons/active_home.svg?react";
import ActiveMovieSocial from "@assets/icons/active_movie_social.svg?react";
import ActiveRecommend from "@assets/icons/active_recommend.svg?react";
import ActiveUser from "@assets/icons/active_user.svg?react";

import styles from "./index.styles";

export interface NavigateTabMene {
  icon: React.ReactNode | string; // 탭 아이콘의 이미지 경로(Picky Tab) 또는 SVG 컴포넌트
  activeIcon?: React.ReactNode; // 탭 아이콘의 이미지 경로(Picky Tab) 또는 SVG 컴포넌트
  name: string; // 판별을 위한 탭 이름
  label: string;
}

const tabMenus: Array<NavigateTabMene> = [
  { icon: <Home />, activeIcon: <ActiveHome />, name: "home", label: "홈" },
  { icon: "/src/assets/images/picky.png", name: "picky", label: "picky" },
  {
    icon: <MovieSocial />,
    activeIcon: <ActiveMovieSocial />,
    name: "movie",
    label: "무비로그",
  },
  {
    icon: <Recommend />,
    activeIcon: <ActiveRecommend />,
    name: "recommend",
    label: "추천",
  },
  { icon: <User />, activeIcon: <ActiveUser />, name: "user", label: "my" },
];

interface ImageTabMenuProps {
  src: string;
  label: string;
  active: boolean;
}

interface SvgTabMenuProps {
  icon: React.ReactNode;
  label: string;
}

function ImageTabMenu({ src, label, active }: ImageTabMenuProps): JSX.Element {
  return (
    <>
      <div style={{ width: "32px", height: "32px" }}>
        <img
          src={active ? "/src/assets/images/picky-active.png" : src}
          alt="picky-icon-image"
        />
      </div>
      <span>{label}</span>
    </>
  );
}

function SvgTabMenu({ icon, label }: SvgTabMenuProps): JSX.Element {
  return (
    <>
      {icon}
      <span>{label}</span>
    </>
  );
}

export type HandleChangeTab = (
  event: React.MouseEvent<HTMLDivElement>,
  name: string
) => void;

export interface NavigatorBarProps {
  state: string;
  onClick: HandleChangeTab;
}

/**
 * NavigaterBar 컴포넌트
 * @description 전역에서 재사용 가능한 내비게이션 바 컴포넌트
 * `tapMenus` 배열을 기반으로 동적으로 메뉴를 렌더링
 *
 * @returns {JSX.Element} 내비게이션 바 JSX 요소를 반환
 */
export function NavigaterBar({
  state,
  onClick,
}: NavigatorBarProps): JSX.Element {
  return (
    <nav css={styles.navbarContainer()}>
      {tabMenus &&
        tabMenus.map((menu, idx) => {
          return (
            // 탭 항목의 Box 영역
            <div
              key={idx}
              css={styles.navbarMenuItem(menu.name, state === menu.name)}
              onClick={(event) => onClick(event, menu.name)}
            >
              {typeof menu.icon === "string" ? (
                // PICKY 탭 클릭할 경우 -> SVG 파일이 아니기 때문에 조건부 처리
                <ImageTabMenu
                  src={menu.icon}
                  label={menu.label}
                  active={state === menu.name}
                />
              ) : (
                // PICKY 탭 이외의 탭을 클릭할 경우
                <SvgTabMenu
                  icon={state === menu.name ? menu.activeIcon : menu.icon}
                  label={menu.label}
                />
              )}
            </div>
          );
        })}
    </nav>
  );
}
