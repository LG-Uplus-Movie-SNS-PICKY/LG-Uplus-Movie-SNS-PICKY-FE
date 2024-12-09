// pages/movie-detail/reviews/components/review-regist/index.tsx
import { useState } from 'react';
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
    SubmitButton,
    WithinText,
    TextCountWrapper,
    TextCountContainer,
    CountText,
    MaxText
} from './index.styles';
import { Toast } from '@stories/toast'

const ReviewRegist = ({ refetch }: { refetch: () => void }) => {
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

    // const handleSubmit = () => {
    //     if (rating === 0 || spoiler === null || review.length === 0) {
    //         showToast("모든 입력 필드를 채워주세요.", 'up');
    //     } else {
    //         console.log({ rating, review, spoiler });
    //         showToast("관람평이 등록되었습니다.", 'up');
    //     }
    // };

    const handleSubmit = async () => {
        if (rating === 0 || spoiler === null || review.length === 0) {
          showToast("모든 입력 필드를 채워주세요.", 'up');
          return;
        }
    
        const reviewData = {
          userId: 7, // 테스트용 User ID (실제 로그인 정보를 기반으로 대체 필요)
          writerNickname: "먹식이", // 테스트용 닉네임
          movieId: 1, // 영화 ID (고정)
          rating,
          content: review,
          isSpoler: spoiler,
        };
    
        try {
          console.log("보낼 데이터:", reviewData);
    
          const response = await axios.post(
            `${import.meta.env.VITE_SERVER_URL}/api/v1/linereview/create`,
            reviewData,
            {
              headers: {
                Authorization: "123", // 테스트용 토큰
              },
            }
          );
    
          console.log("등록 성공:", response.data);
          showToast("한줄평 등록이 완료되었습니다.", 'up');
          refetch(); // 등록 후 리뷰 목록 새로고침
        } catch (error) {
          console.error("등록 실패:", error);
          showToast("한줄평 등록에 실패했습니다.", 'down');
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