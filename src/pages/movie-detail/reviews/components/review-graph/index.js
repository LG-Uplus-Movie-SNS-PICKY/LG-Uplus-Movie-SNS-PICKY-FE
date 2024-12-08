import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
import { GraphWrapper, GraphContainer, TitleWrapper, Title, StarTextContainer, StarText, TotalStarText, RatingContainer, StarContainer, Star, PeopleCountText, ScoreWrapper, GenderContainer, ScoreContainer, GenderScoreText, ScoreBarWrapper, ScoreItemContainer, ScoreText, ScoreBar, PercentageText, TitleBorder, PercentageWrapper, PercentageContainer, } from './index.styles';
import MaleSvg from '@assets/icons/male.svg?react';
import FemaleSvg from '@assets/icons/female.svg?react';
const ReviewGraph = ({ reviews }) => {
    // 전체 평균 평점 계산
    const totalAverage = reviews.length
        ? Math.round((reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length) * 10) / 10
        : 0; // 리뷰가 없을 경우 0 반환
    // 남성/여성 리뷰 분리 및 평균 평점 계산
    const maleReviews = reviews.filter((review) => review.gender === 'male');
    const femaleReviews = reviews.filter((review) => review.gender === 'female');
    const maleAverage = maleReviews.reduce((acc, review) => acc + review.rating, 0) / maleReviews.length || 0;
    const femaleAverage = femaleReviews.reduce((acc, review) => acc + review.rating, 0) / femaleReviews.length || 0;
    // 점수대별 분포 계산
    const ratingsDistribution = new Array(5).fill(0).map((_, index) => {
        const score = 5 - index; // 점수를 5부터 1까지 역순으로 계산
        const count = reviews.filter((review) => review.rating <= score && review.rating > score - 1 // 범위를 명확히 정의
        ).length;
        return {
            score: score,
            percentage: (count / reviews.length) * 100,
        };
    });
    // 별 렌더링 함수
    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, index) => (_jsx(Star, { filled: index < Math.round(rating), children: index < rating ? '★' : '☆' }, index)));
    };
    // 원형 차트 렌더링
    const CircleChart = ({ genderStats }) => {
        // 남성과 여성 비율 계산
        const total = genderStats.male + genderStats.female;
        const malePercentage = total > 0 ? (genderStats.male / total) * 100 : 0;
        const femalePercentage = total > 0 ? (genderStats.female / total) * 100 : 0;
        return (_jsxs("div", { style: { position: 'relative', width: '100%', height: '100%' }, children: [_jsxs("svg", { viewBox: "0 0 36 36", style: { transform: 'rotate(-90deg)', width: '100%', height: '100%' }, children: [_jsx("circle", { cx: "18", cy: "18", r: "15.915", fill: "none", stroke: "#72B8FF", strokeWidth: "3", strokeDasharray: `${malePercentage} ${100 - malePercentage}`, strokeDashoffset: "0" }), _jsx("circle", { cx: "18", cy: "18", r: "15.915", fill: "none", stroke: "#F383B0", strokeWidth: "3", strokeDasharray: `${femalePercentage} ${100 - femalePercentage}`, strokeDashoffset: -malePercentage })] }), _jsx("div", { style: { position: 'absolute', top: '50%', left: '50%', transform: "translate(-50%, -50%)" }, children: _jsxs(PercentageWrapper, { children: [_jsxs(PercentageContainer, { children: [_jsx(ScoreText, { children: "\uB0A8\uC790" }), _jsxs(GenderScoreText, { children: [malePercentage.toFixed(0), "%"] })] }), _jsxs(PercentageContainer, { children: [_jsx(ScoreText, { children: "\uC5EC\uC790" }), _jsxs(GenderScoreText, { children: [femalePercentage.toFixed(0), "%"] })] })] }) })] }));
    };
    console.log("총 리뷰 데이터 개수:", reviews.length);
    return (_jsxs(GraphWrapper, { children: [_jsxs(GraphContainer, { children: [_jsxs(TitleWrapper, { children: [_jsx(Title, { children: "\uC2E4\uAD00\uB78C\uAC1D \uD3C9\uC810" }), _jsxs(RatingContainer, { children: [_jsxs(StarTextContainer, { children: [_jsx(StarText, { children: totalAverage.toFixed(1) }), _jsx(TotalStarText, { children: "/" }), _jsx(TotalStarText, { children: "5.0" })] }), _jsx(StarContainer, { children: renderStars(totalAverage) }), _jsxs(PeopleCountText, { children: [reviews.length, "\uBA85 \uCC38\uC5EC"] })] })] }), _jsxs(ScoreWrapper, { children: [_jsxs(GenderContainer, { children: [_jsx(GenderScoreText, { children: "\uB0A8\uC790" }), _jsxs(ScoreContainer, { children: [_jsx(MaleSvg, {}), _jsx(GenderScoreText, { children: maleAverage.toFixed(1) })] })] }), _jsxs(GenderContainer, { children: [_jsx(GenderScoreText, { children: "\uC5EC\uC790" }), _jsxs(ScoreContainer, { children: [_jsx(FemaleSvg, {}), _jsx(GenderScoreText, { children: femaleAverage.toFixed(1) })] })] })] })] }), _jsxs(GraphContainer, { children: [_jsx(TitleBorder, { children: "\uC810\uC218\uBCC4 \uBE44\uC728" }), _jsx(ScoreBarWrapper, { children: ratingsDistribution.map((dist, index) => (_jsxs(ScoreItemContainer, { children: [_jsx(ScoreText, { children: "\u2605" }), _jsx(ScoreText, { children: dist.score }), _jsx(ScoreBar, { percentage: dist.percentage }), _jsxs(PercentageText, { children: [dist.percentage.toFixed(1), "%"] })] }, index))) })] }), _jsxs(GraphContainer, { children: [_jsx(TitleBorder, { children: "\uC131\uBCC4 \uBE44\uC728" }), _jsx(CircleChart, { genderStats: { male: maleReviews.length, female: femaleReviews.length } })] })] }));
};
export default ReviewGraph;
