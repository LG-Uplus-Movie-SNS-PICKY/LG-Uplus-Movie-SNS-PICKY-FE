

// pages/movie-detail/reviews/components/review-regist/index.tsx
import { useState } from 'react';
import {
    Container,
    TitleContainer,
    Badge,
    Text,
    Star,
    SpoilerContainer,
    YesNoButtonContainer,
    YesNoButton,
    Wrapper,
    ReviewInputContainer,
    ReviewInput,
    SubmitButton,
    WithinText,
    TextCountWrapper,
    TextCountContainer,
    CountText,
    MaxText
} from './index.styles';
import { Toast } from '@stories/toast'
import { createLineReview } from '@api/linereview';
import { getCookie } from '@util/cookie';

interface Review {
    id: number;
    writerNickname: string;
    userId: number;
    movieId: number;
    rating: number;
    context: string;
    isSpoiler: boolean;
    likes: number;
    dislikes: number;
    createdAt: string;
}

interface ReviewRegistProps {
    refetch: () => void; // 리뷰 목록 새로고침 함수
    movieId: number; // 동적으로 전달되는 movieId
    onAddReview: (newReview: Review) => void; // 새로운 리뷰 추가 콜백
}

const ReviewRegist = ({ refetch, movieId, onAddReview }: ReviewRegistProps) => {
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const [spoiler, setSpoiler] = useState<boolean | null>(null);
    const [toast, setToast] = useState<{ message: string; direction: 'none' | 'up' | 'down' } | null>(null);

    const handleRating = (index: number) => {
        setRating(index + 1);
    };

    const showToast = (message: string, direction: 'none' | 'up' | 'down') => {
        setToast({ message, direction });
        setTimeout(() => setToast(null), 2000);
    };


    const handleReviewChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length <= 50) {
            setReview(event.target.value);
        } else {
            showToast("감상평은 최대 50자까지 입력 가능합니다.", 'none');
        }
    };

    const handleSubmit = async () => {
        if (rating === 0 || spoiler === null || review.length === 0) {
            showToast("모든 입력 필드를 채워주세요.", "up");
            return;
        }

        // 사용자 정보 가져오기
        const userInfo = getCookie("user") || {};

        // userInfo 검증
        if (!userInfo || !userInfo.localJwtDto || !userInfo.user) {
            showToast("사용자 정보를 가져올 수 없습니다. 다시 로그인 해주세요.", "up");
            return;
        }

        console.log("userInfo:", userInfo.localJwtDto.accessToken);
        console.log("userInfo:", userInfo.user.nickname);

        const newReview = {
            id: Date.now(), // 임시 ID
            userId: userInfo.localJwtDto.accessToken, // userId를 userInfo에서 추출
            writerNickname: userInfo.user.nickname, // writerNickname을 userInfo에서 추출
            movieId,
            rating,
            context: review,
            isSpoiler: spoiler,
            likes: 0,
            dislikes: 0,
            createdAt: new Date().toISOString(),
        };

        try {
            const response = await createLineReview(newReview);
            console.log("등록 성공:", response);

            // 새 리뷰 추가
            onAddReview(newReview);

            showToast("한줄평 등록이 완료되었습니다.", "up");
            setRating(0);
            setReview("");
            setSpoiler(null);
        } catch (error) {
            console.error("등록 실패:", error);
            showToast("한줄평 등록에 실패했습니다.", "down");
        }
    };

    return (
        <Container>
            <TitleContainer>
                <Badge>한줄평</Badge>
                <Text>별점을 선택해주세요.</Text>
                <div>
                    {Array.from({ length: 5 }, (_, index) => (
                        <Star key={index} onClick={() => handleRating(index)} active={index < rating}>
                            ★
                        </Star>
                    ))}
                </div>
            </TitleContainer>
            <SpoilerContainer>
                <Text>감상평에 스포일러가 포함되어 있나요?</Text>
                <YesNoButtonContainer>
                    <YesNoButton onClick={() => setSpoiler(true)} active={spoiler === true}>
                        있음
                    </YesNoButton>
                    <YesNoButton onClick={() => setSpoiler(false)} active={spoiler === false}>
                        없음
                    </YesNoButton>
                </YesNoButtonContainer>
            </SpoilerContainer>
            <Wrapper>
                <ReviewInputContainer>
                    <ReviewInput
                        value={review}
                        onChange={handleReviewChange}
                        placeholder="감상평을 작성해주세요."
                    />
                    <SubmitButton onClick={handleSubmit}>등록</SubmitButton>
                </ReviewInputContainer>
                {review.length === 0 ? (
                    <WithinText>50자 이내</WithinText>
                ) : (
                    <TextCountWrapper>
                        <TextCountContainer>
                            <CountText>{review.length}</CountText>
                            <MaxText>/50</MaxText>
                        </TextCountContainer>
                    </TextCountWrapper>
                )}
            </Wrapper>
            {toast && <Toast message={toast.message} direction={toast.direction} />} {/* Toast 메시지 렌더링 */}
        </Container>
    );
};

export default ReviewRegist;