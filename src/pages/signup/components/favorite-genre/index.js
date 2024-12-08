import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
/** @jsxImportSource @emotion/react */
import { useState, useEffect, useCallback } from "react";
import { useRecoilState } from "recoil";
import Emoji from "../emoji";
import { inputState } from "../../../../review/atoms";
import { wrapper, pageContainer, titleWrapper, titleContainer, genreGrid, title, subtitle, requiredBadge, TextWrapper, Warning, genreButton, } from "./index.styles";
import action from "@assets/images/action.png";
import romance from "@assets/images/romance.png";
import musical from "@assets/images/musical.png";
import comedy from "@assets/images/comedy.png";
import crime from "@assets/images/crime.png";
import animation from "@assets/images/animation.png";
import documentary from "@assets/images/documentary.png";
import horror from "@assets/images/horror.png";
import darama from "@assets/images/drama.png";
import fantasy from "@assets/images/fantasy.png";
import thriller from "@assets/images/thriller.png";
import sf from "@assets/images/sf.png";
import western from "@assets/images/western.png";
import mystery from "@assets/images/mystery.png";
import tv from "@assets/images/tv.png";
import war from "@assets/images/war.png";
import history from "@assets/images/history.png";
import family from "@assets/images/family.png";
import adventure from "@assets/images/adventure.png";
const genres = [
    { id: 28, name: "액션", emoji: _jsx(Emoji, { src: action, alt: "\uC561\uC158" }) },
    { id: 10749, name: "로맨스", emoji: _jsx(Emoji, { src: romance, alt: "\uB85C\uB9E8\uC2A4" }) },
    { id: 35, name: "코미디", emoji: _jsx(Emoji, { src: comedy, alt: "\uCF54\uBBF8\uB514" }) },
    { id: 18, name: "드라마", emoji: _jsx(Emoji, { src: darama, alt: "\uB4DC\uB77C\uB9C8" }) },
    { id: 80, name: "범죄", emoji: _jsx(Emoji, { src: crime, alt: "\uBC94\uC8C4" }) },
    {
        id: 99,
        name: "다큐멘터리",
        emoji: _jsx(Emoji, { src: documentary, alt: "\uB2E4\uD050\uBA58\uD130\uB9AC" }),
    },
    {
        id: 16,
        name: "애니메이션",
        emoji: _jsx(Emoji, { src: animation, alt: "\uC560\uB2C8\uBA54\uC774\uC158" }),
    },
    { id: 10402, name: "음악", emoji: _jsx(Emoji, { src: musical, alt: "\uC74C\uC545" }) },
    { id: 53, name: "스릴러", emoji: _jsx(Emoji, { src: thriller, alt: "\uC2A4\uB9B4\uB7EC" }) },
    { id: 27, name: "호러", emoji: _jsx(Emoji, { src: horror, alt: "\uD638\uB7EC" }) },
    { id: 878, name: "SF", emoji: _jsx(Emoji, { src: sf, alt: "SF" }) },
    { id: 12, name: "판타지", emoji: _jsx(Emoji, { src: fantasy, alt: "\uD310\uD0C0\uC9C0" }) },
    { id: 14, name: "모험", emoji: _jsx(Emoji, { src: adventure, alt: "\uBAA8\uD5D8" }) },
    { id: 10751, name: "가족", emoji: _jsx(Emoji, { src: family, alt: "\uAC00\uC871" }) },
    { id: 36, name: "역사", emoji: _jsx(Emoji, { src: history, alt: "\uC5ED\uC0AC" }) },
    { id: 10752, name: "전쟁", emoji: _jsx(Emoji, { src: war, alt: "\uC804\uC7C1" }) },
    { id: 10770, name: "TV 영화", emoji: _jsx(Emoji, { src: tv, alt: "TV \uC601\uD654" }) },
    { id: 9648, name: "미스터리", emoji: _jsx(Emoji, { src: mystery, alt: "\uBBF8\uC2A4\uD130\uB9AC" }) },
    { id: 37, name: "서부", emoji: _jsx(Emoji, { src: western, alt: "\uC11C\uBD80" }) },
];
const MovieGenreSelector = () => {
    const [inputData, setInputData] = useRecoilState(inputState);
    const [isValid, setIsValid] = useState(true);
    const validateGenres = useCallback(() => {
        const genreCount = inputData.favoriteGenres.length;
        return genreCount >= 3 && genreCount <= 5;
    }, [inputData.favoriteGenres]);
    const toggleGenre = (id) => {
        setInputData((prev) => {
            const updatedGenres = prev.favoriteGenres.includes(id)
                ? prev.favoriteGenres.filter((genreId) => genreId !== id)
                : prev.favoriteGenres.length < 5
                    ? [...prev.favoriteGenres, id]
                    : prev.favoriteGenres;
            return Object.assign(Object.assign({}, prev), { favoriteGenres: updatedGenres });
        });
    };
    useEffect(() => {
        setIsValid(validateGenres());
    }, [inputData.favoriteGenres, validateGenres]);
    return (_jsxs("div", { css: wrapper, children: [_jsxs("div", { css: pageContainer, children: [_jsxs("div", { css: titleWrapper, children: [_jsxs("div", { css: titleContainer, children: [_jsx("h2", { css: title, children: "\uD83E\uDDF8 \uC88B\uC544\uD558\uB294 \uC601\uD654 \uC7A5\uB974\uB97C \uC120\uD0DD\uD574 \uC8FC\uC138\uC694." }), _jsx("span", { css: requiredBadge, children: "\uD544\uC218" })] }), _jsx("span", { css: subtitle, children: "\uD3C9\uC18C \uC88B\uC544\uD558\uB294 \uC601\uD654 \uC7A5\uB974\uB97C \uACE8\uB77C\uC8FC\uC138\uC694.(3\uAC1C~5\uAC1C)" })] }), _jsx("div", { css: genreGrid, children: genres.map((genre) => (_jsx("button", { css: genreButton(inputData.favoriteGenres.includes(genre.id)), onClick: () => toggleGenre(genre.id), children: _jsxs("span", { css: { display: "flex", alignItems: "center", gap: "2px" }, children: [genre.emoji, genre.name] }) }, genre.id))) })] }), _jsx("div", { css: TextWrapper, style: { height: "20px" }, children: _jsx("div", { css: Warning, style: { visibility: isValid ? "hidden" : "visible" } }) })] }));
};
export default MovieGenreSelector;
