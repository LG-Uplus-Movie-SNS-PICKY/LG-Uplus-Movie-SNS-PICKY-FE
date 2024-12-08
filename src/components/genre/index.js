import { Fragment as _Fragment, jsx as _jsx } from "@emotion/react/jsx-runtime";
import { genresSelector } from "@recoil/selectors/genresSelector";
import { useRecoilValueLoadable } from "recoil";
import { GenreTabButton } from "@stories/genre-tab";
import { useNavigate } from "react-router-dom";
// 장르 전역 컴포넌트
function GenreButtons() {
    const navigate = useNavigate();
    // useRecoilValueLoadable -> 비동기 데이터의 처리 상태와 데이터를 반환
    const loadable = useRecoilValueLoadable(genresSelector);
    if (loadable.state === "loading")
        return _jsx(_Fragment, {}); // 로딩 중
    if (loadable.state === "hasError")
        return _jsx(_Fragment, {}); // 에러 발생
    const genres = loadable.contents.data;
    return (genres === null || genres === void 0 ? void 0 : genres.length) > 0 ? (genres.map((genre) => (
    // 전역 장르 버튼 컴포넌트 정의
    _jsx(GenreTabButton, { label: genre.name, emoji: genre.name, btnType: "Rectangle", onClick: () => navigate(`/genre/${genre.id}`) }, genre.id)))) : (_jsx(_Fragment, {}));
}
export default GenreButtons;
