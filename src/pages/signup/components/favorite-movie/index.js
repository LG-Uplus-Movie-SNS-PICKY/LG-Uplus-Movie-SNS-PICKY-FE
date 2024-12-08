var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@emotion/react/jsx-runtime";
import { useState, useEffect, useCallback } from "react";
import { useRecoilState } from "recoil";
import axios from "axios";
import { inputState } from "../../../../review/atoms";
import { ArrowLeft, ArrowRight, Checked } from "../../../../assets/svg";
import { consentWrapper, wrapper, titleWrapper, titleContainer, title, requiredBadge, subtitle, TextWrapper, Warning, totalContainer, pageIndicator, currentPage, totalPages, movieGridWrapper, movieGrid, movieCard, movieImage, checkIcon, previousButton, nextButton, movieTitle, selectedCount, } from "./index.styles";
const TMDB_IMAGE_PREFIX = "https://image.tmdb.org/t/p/w185";
const InputFavoriteMovie = () => {
    const [current, setCurrent] = useState(1);
    const [inputData, setInputData] = useRecoilState(inputState);
    const [isValid, setIsValid] = useState(true);
    const [movies, setMovies] = useState([]);
    const moviesPerPage = 9;
    const fetchMovies = useCallback(() => __awaiter(void 0, void 0, void 0, function* () {
        if (inputData.favoriteGenres.length === 0) {
            console.warn("장르 ID가 없습니다. API 호출을 건너뜁니다.");
            return;
        }
        try {
            console.log("보내는 장르 ID 값:", inputData.favoriteGenres);
            const accessToken = sessionStorage.getItem("accessToken");
            console.log("보내는 장르 ID:", accessToken);
            const response = yield axios.post(`${import.meta.env.VITE_SERVER_URL}/api/v1/user/movies-by-genres`, {
                genreIds: inputData.favoriteGenres,
            }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            console.log("받아온 영화 데이터:", response.data);
            // 데이터가 배열인지 확인하고 타입 적용
            const moviesData = Array.isArray(response.data)
                ? response.data
                : response.data.data || [];
            // 이미지 URL 앞에 TMDB_IMAGE_PREFIX 추가
            const processedMovies = moviesData.map((movie) => (Object.assign(Object.assign({}, movie), { posterUrl: `${TMDB_IMAGE_PREFIX}${movie.posterUrl}` })));
            setMovies(processedMovies);
        }
        catch (error) {
            console.error("영화를 가져오는 중 오류 발생:", error);
            alert("영화 데이터를 가져오는 데 문제가 발생했습니다. 다시 시도해주세요.");
            setMovies([]);
        }
    }), [inputData.favoriteGenres]);
    const validateSelection = useCallback(() => {
        const selectedCount = inputData.favoriteMovie.length;
        return selectedCount >= 5 && selectedCount <= 10;
    }, [inputData.favoriteMovie]);
    const toggleSelection = (id) => {
        setInputData((prev) => {
            const updatedMovies = prev.favoriteMovie.includes(id)
                ? prev.favoriteMovie.filter((movieId) => movieId !== id)
                : [...prev.favoriteMovie, id].slice(0, 10);
            return Object.assign(Object.assign({}, prev), { favoriteMovie: updatedMovies });
        });
    };
    const total = Math.ceil(movies.length / moviesPerPage);
    const paginatedMovies = movies.slice((current - 1) * moviesPerPage, current * moviesPerPage);
    useEffect(() => {
        setIsValid(validateSelection());
    }, [inputData.favoriteMovie, validateSelection]);
    useEffect(() => {
        fetchMovies();
    }, [fetchMovies]);
    const fillEmptySlots = Array.from({ length: moviesPerPage - paginatedMovies.length }, (_, index) => _jsx("div", { css: movieCard(false) }, `placeholder-${index}`));
    return (_jsxs("div", { css: consentWrapper, children: [_jsx("div", { css: wrapper, children: _jsxs("div", { css: titleWrapper, children: [_jsxs("div", { css: titleContainer, children: [_jsx("h2", { css: title, children: "\uC5B4\uB5A4 \uC601\uD654\uB97C \uC88B\uC544\uD558\uB098\uC694?" }), _jsx("span", { css: requiredBadge, children: "\uD544\uC218" })] }), _jsx("div", { css: subtitle, children: "\uD3C9\uC18C \uC88B\uC544\uD558\uB294 \uC601\uD654\uB97C \uACE8\uB77C\uC8FC\uC138\uC694.(5\uAC1C ~ 10\uAC1C)" })] }) }), _jsxs("div", { css: totalContainer, children: [_jsx("div", { css: pageIndicator, children: _jsxs("div", { css: {
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                width: "100%",
                            }, children: [_jsxs("div", { css: selectedCount, children: ["\uC120\uD0DD\uB41C \uC601\uD654:", " ", _jsx("span", { css: { color: "#FF084A" }, children: inputData.favoriteMovie.length }), "\uAC1C"] }), _jsxs("div", { children: [_jsx("span", { css: currentPage, children: current }), " / ", _jsx("span", { css: totalPages, children: total })] })] }) }), _jsx("div", { css: movieGridWrapper, children: total > 0 && (_jsxs(_Fragment, { children: [_jsx("button", { css: previousButton, onClick: () => setCurrent((prev) => prev - 1), disabled: current === 1, children: _jsx(ArrowLeft, {}) }), _jsxs("div", { css: movieGrid, children: [paginatedMovies.map((movie) => (_jsxs("div", { css: movieCard(inputData.favoriteMovie.includes(movie.movieId)), onClick: () => toggleSelection(movie.movieId), children: [_jsx("img", { src: movie.posterUrl, alt: movie.title, css: movieImage(inputData.favoriteMovie.includes(movie.movieId)) }), inputData.favoriteMovie.includes(movie.movieId) && (_jsx("div", { css: checkIcon(true), children: _jsx(Checked, {}) })), _jsx("p", { css: movieTitle, children: movie.title.length > 8
                                                        ? `${movie.title.slice(0, 6)}...`
                                                        : movie.title })] }, movie.movieId))), fillEmptySlots] }), _jsx("button", { css: nextButton, onClick: () => setCurrent((prev) => prev + 1), disabled: current === total, children: _jsx(ArrowRight, {}) })] })) })] }), _jsx("div", { css: TextWrapper, style: { height: "20px", justifyContent: "center" }, children: _jsx("div", { css: Warning, style: { visibility: isValid ? "hidden" : "visible" }, children: "\uC601\uD654\uB294 \uCD5C\uC18C 5\uAC1C\uC5D0\uC11C 10\uAC1C\uB97C \uACE8\uB77C\uC8FC\uC138\uC694." }) })] }));
};
export default InputFavoriteMovie;
