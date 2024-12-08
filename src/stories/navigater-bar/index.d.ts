export interface NavigateTabMene {
    icon: React.ReactNode | string;
    activeSrc?: string;
    activeIcon?: React.ReactNode;
    name: string;
    label: string;
}
export interface NavigatorBarProps {
    state: string;
    onClick: (name: string) => void;
}
/**
 * NavigaterBar 컴포넌트
 * @description 전역에서 재사용 가능한 내비게이션 바 컴포넌트
 * `tapMenus` 배열을 기반으로 동적으로 메뉴를 렌더링
 *
 * @returns {JSX.Element} 내비게이션 바 JSX 요소를 반환
 */
export declare function NavigaterBar({ state, onClick, }: NavigatorBarProps): JSX.Element;
