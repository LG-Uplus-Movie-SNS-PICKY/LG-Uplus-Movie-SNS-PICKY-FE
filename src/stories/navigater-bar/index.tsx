import Home from "@assets/icons/home.svg?react";
import MovieSocial from "@assets/icons/movie_social.svg?react";
import Recommend from "@assets/icons/recommend.svg?react";
import User from "@assets/icons/user.svg?react";

export interface NavigateTabMene {
  icon: React.ReactNode | string; // 탭 아이콘의 이미지 경로(Picky Tab) 또는 SVG 컴포넌트
  name: string; // 판별을 위한 탭 이름
  label: string;
}

const tabMenus: Array<NavigateTabMene> = [
  { icon: <Home />, name: "home", label: "홈" },
  { icon: "../assets/images/picky.png", name: "picky", label: "picky" },
  { icon: <MovieSocial />, name: "movie", label: "무비로그" },
  { icon: <Recommend />, name: "recommend", label: "추천" },
  { icon: <User />, name: "user", label: "my" },
];

interface ImageTabMenuProps {
  src: string;
  label: string;
}

interface SvgTabMenuProps {
  icon: React.ReactNode;
  label: string;
}

function ImageTabMenu({ src, label }: ImageTabMenuProps): JSX.Element {
  return (
    <>
      <div>
        <img src={src} alt="picky-icon-image" />
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

/**
 * NavigaterBar 컴포넌트
 * @description 전역에서 재사용 가능한 내비게이션 바 컴포넌트
 * `tapMenus` 배열을 기반으로 동적으로 메뉴를 렌더링
 *
 * @returns {JSX.Element} 내비게이션 바 JSX 요소를 반환
 */
export function NavigaterBar(): JSX.Element {
  return (
    <nav>
      {tabMenus &&
        tabMenus.map((menu, idx) => {
          return (
            <div key={idx}>
              {typeof menu.icon === "string" ? (
                <ImageTabMenu src={menu.icon} label={menu.label} />
              ) : (
                <SvgTabMenu icon={menu.icon} label={menu.label} />
              )}
            </div>
          );
        })}
    </nav>
  );
}
