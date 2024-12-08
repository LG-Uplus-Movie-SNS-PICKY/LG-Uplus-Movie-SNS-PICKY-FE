import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
// pages/MovieDetail/Reviews/components/ReviewRegist/index.tsx
import { useState } from 'react';
import { Container, TitleContainer, Badge, Text, Star, SpoilerContainer, YesNoButtonContainer, YesNoButton, Wrapper, ReviewInputContainer, ReviewInput, SubmitButton, WithinText, TextCountWrapper, TextCountContainer, CountText, MaxText } from './index.styles';
import { Toast } from '@stories/toast';
const ReviewRegist = () => {
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const [spoiler, setSpoiler] = useState(null);
    const [toast, setToast] = useState(null);
    const handleRating = (index) => {
        setRating(index + 1);
    };
    const showToast = (message, direction) => {
        setToast({ message, direction });
        setTimeout(() => setToast(null), 2000);
    };
    const handleReviewChange = (event) => {
        if (event.target.value.length <= 50) {
            setReview(event.target.value);
        }
        else {
            showToast("감상평은 최대 50자까지 입력 가능합니다.", 'none');
        }
    };
    const handleSubmit = () => {
        if (rating === 0 || spoiler === null || review.length === 0) {
            showToast("모든 입력 필드를 채워주세요.", 'up');
        }
        else {
            console.log({ rating, review, spoiler });
            showToast("관람평이 등록되었습니다.", 'up');
        }
    };
    return (_jsxs(Container, { children: [_jsxs(TitleContainer, { children: [_jsx(Badge, { children: "\uAD00\uB78C\uD3C9" }), _jsx(Text, { children: "\uBCC4\uC810\uC744 \uC120\uD0DD\uD574\uC8FC\uC138\uC694." }), _jsx("div", { children: Array.from({ length: 5 }, (_, index) => (_jsx(Star, { onClick: () => handleRating(index), active: index < rating, children: "\u2605" }, index))) })] }), _jsxs(SpoilerContainer, { children: [_jsx(Text, { children: "\uAC10\uC0C1\uD3C9\uC5D0 \uC2A4\uD3EC\uC77C\uB7EC\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uB098\uC694?" }), _jsxs(YesNoButtonContainer, { children: [_jsx(YesNoButton, { onClick: () => setSpoiler(true), active: spoiler === true, children: "\uC788\uC74C" }), _jsx(YesNoButton, { onClick: () => setSpoiler(false), active: spoiler === false, children: "\uC5C6\uC74C" })] })] }), _jsxs(Wrapper, { children: [_jsxs(ReviewInputContainer, { children: [_jsx(ReviewInput, { value: review, onChange: handleReviewChange, placeholder: "\uAC10\uC0C1\uD3C9\uC744 \uC791\uC131\uD574\uC8FC\uC138\uC694." }), _jsx(SubmitButton, { onClick: handleSubmit, children: "\uB4F1\uB85D" })] }), review.length === 0 ? (_jsx(WithinText, { children: "50\uC790 \uC774\uB0B4" })) : (_jsx(TextCountWrapper, { children: _jsxs(TextCountContainer, { children: [_jsx(CountText, { children: review.length }), _jsx(MaxText, { children: "/50" })] }) }))] }), toast && _jsx(Toast, { message: toast.message, direction: toast.direction }), " "] }));
};
export default ReviewRegist;
