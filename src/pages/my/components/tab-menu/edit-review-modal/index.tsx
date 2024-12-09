// pages/my/components/tab-menu/edit-review-modal/index.tsx
import { useEffect, useState } from 'react';
import axios from 'axios';
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
    EditButton,
    WithinText,
    TextCountWrapper,
    TextCountContainer,
    CountText,
    MaxText
} from './index.styles';
import { Toast } from '@stories/toast'

interface EditReviewModalProps {
    reviewId: number | null; // 수정할 리뷰 ID
    onClose: () => void; // 모달 닫기 함수
    onSave: (updatedReview: { content: string; isSpoiler: boolean }) => void; // 저장 후 호출
}

// 더미 데이터
const DUMMY_REVIEWS: Record<number, { rating: number; content: string; isSpoiler: boolean }> = {
    1: { rating: 4.5, content: "타이타닉 진짜 제 인생 영화입니다!!! 진짜 한 5번은 본 것 같아요!! 진짜 미쳤어요!!", isSpoiler: false },
    2: { rating: 3.0, content: "약간 지루했어요.", isSpoiler: true },
    3: { rating: 5.0, content: "최고의 영화!", isSpoiler: false },
};

const EditReviewModal = ({ reviewId, onClose, onSave }: EditReviewModalProps) => {
    const [rating, setRating] = useState(0); // 수정 불가능한 별점 데이터
    const [review, setReview] = useState('');
    const [spoiler, setSpoiler] = useState<boolean | null>(null);
    const [toast, setToast] = useState<{ message: string; direction: 'none' | 'up' | 'down' } | null>(null);
    const [initialReview, setInitialReview] = useState('');
    const [initialSpoiler, setInitialSpoiler] = useState<boolean | null>(null);

    useEffect(() => {
        // 더미 데이터를 사용하여 초기화
        if (reviewId && DUMMY_REVIEWS[reviewId]) {
            const data = DUMMY_REVIEWS[reviewId];
            setRating(data.rating); // 별점 데이터 설정
            setReview(data.content);
            setSpoiler(data.isSpoiler);
            setInitialReview(data.content); // 초기값 저장
            setInitialSpoiler(data.isSpoiler);
        }
    }, [reviewId]);

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

    const handleStarClick = () => {
        showToast('별점은 수정할 수 없습니다.', 'none'); // 별점 클릭 시 메시지 표시
    };

    const hasChanges = () => {
        return review !== initialReview || spoiler !== initialSpoiler;
    };

    const handleSubmit = () => {
        if (spoiler === null || review.length === 0) {
            showToast('모든 입력 필드를 채워주세요.', 'up');
            return;
        }

        const updatedReview = {
            content: review,
            isSpoiler: spoiler,
        };

        // 더미 데이터 업데이트 (실제 API 연동 시 API 호출로 대체)
        if (reviewId) {
            DUMMY_REVIEWS[reviewId] = { ...DUMMY_REVIEWS[reviewId], ...updatedReview };
            showToast('한줄평 수정이 완료되었습니다.', 'up');
            onSave(updatedReview);
            onClose();
        }
    };

    return (
        <Container>
            <TitleContainer>
                <Badge>한줄평</Badge>
                <Text>별점을 선택해주세요.</Text>
                <div>
                    {Array.from({ length: 5 }, (_, index) => (
                        <Star
                            key={index}
                            onClick={handleStarClick} // 별점 클릭 시 메시지 표시
                            active={index < Math.round(rating)} // 활성화된 별의 수 표시
                        >
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
                    <EditButton
                        onClick={handleSubmit}
                        active={hasChanges()} // 스타일 조정
                    >
                        수정
                    </EditButton>
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

export default EditReviewModal;