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
import { LineReviewData } from '../review';

interface EditReviewModalProps {
    review: LineReviewData;
    onClose: () => void;
    onSave: (updatedReview: LineReviewData) => void;
}

const EditReviewModal = ({ review, onClose, onSave }: EditReviewModalProps) => {
    // const accessToken = localStorage.getItem("accessToken");
    const accessToken = "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MTMsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzMzOTY1NTE5LCJleHAiOjE3MzQwNTE5MTl9.0l58z2m5gbDOhBQfluWGZ8c5rJRhqZh_cAPx_8CxNWQ"
    const [toast, setToast] = useState<{ message: string; direction: 'none' | 'up' | 'down' } | null>(null);
    const [initialContext, setInitialContext] = useState(review.context); // 초기 감상평 값
    const [initialIsSpoiler, setInitialIsSpoiler] = useState(review.isSpoiler || false); // 초기 스포일러 여부

    const [context, setContext] = useState(review.context);
    const [isSpoiler, setIsSpoiler] = useState(review.isSpoiler || false);

    const handleSave = async () => {
        if (!context.trim()) {
            showToast("감상평을 입력해주세요.", "up");
            return;
        }

        try {
            const { data } = await axios.patch(
                `${import.meta.env.VITE_SERVER_URL}/api/v1/linereview/${review.id}`,
                {
                    context,
                    isSpoiler,
                },
                {
                    headers: { Authorization: `Bearer ${accessToken}` },
                }
            );

            onSave({ ...review, context: context, isSpoiler: isSpoiler });
            showToast("수정이 완료되었습니다.", "up");
        } catch (err) {
            showToast("수정 중 오류가 발생했습니다.", "down");
        }
    };

    const showToast = (message: string, direction: 'none' | 'up' | 'down') => {
        setToast({ message, direction });
        setTimeout(() => setToast(null), 2000);
    };

    const handleStarClick = () => {
        showToast('별점은 수정할 수 없습니다.', 'none'); // 별점 클릭 시 메시지 표시
    };

    const hasChanges = () => {
        return context !== initialContext || isSpoiler !== initialIsSpoiler;
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // 기본 Enter 키 동작 방지
            if (hasChanges()) {
                handleSave();
            }
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
                            // active={index < Math.round(rating)} // 활성화된 별의 수 표시
                            active={index < review.rating} // 현재 리뷰의 별점에 따라 색상 표시
                        >
                            ★
                        </Star>
                    ))}
                </div>
            </TitleContainer>
            <SpoilerContainer>
                <Text>감상평에 스포일러가 포함되어 있나요?</Text>
                <YesNoButtonContainer>
                    <YesNoButton onClick={() => setIsSpoiler(true)} active={isSpoiler === true}>
                        있음
                    </YesNoButton>
                    <YesNoButton onClick={() => setIsSpoiler(false)} active={isSpoiler === false}>
                        없음
                    </YesNoButton>
                </YesNoButtonContainer>
            </SpoilerContainer>
            <Wrapper>
                <ReviewInputContainer>
                    <ReviewInput
                        value={context}
                        onChange={(e) => setContext(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="한줄평을 작성해주세요."
                    />
                    <EditButton
                        onClick={handleSave}
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
                            <CountText>{context.length}</CountText>
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
