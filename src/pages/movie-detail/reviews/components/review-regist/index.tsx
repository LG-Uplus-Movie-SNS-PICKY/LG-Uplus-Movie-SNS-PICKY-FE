// pages/MovieDetail/Reviews/components/ReviewRegist/index.tsx
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

const ReviewRegist = () => {
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const [spoiler, setSpoiler] = useState<boolean | null>(null);

    const handleRating = (index: number) => {
        setRating(index + 1);
    };

    const handleReviewChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length <= 50) {
            setReview(event.target.value);
        } else {
            alert("감상평은 최대 50자까지 입력 가능합니다.");
        }
    };

    const handleSubmit = () => {
        if (rating === 0 || spoiler === null || review.length === 0) {
            alert("모든 입력 필드를 채워주세요.");
        } else {
            console.log({ rating, review, spoiler });
            alert('관람평이 등록되었습니다.');
        }
    };

    return (
        <Container>
            <TitleContainer>
                <Badge>관람평</Badge>
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
        </Container>
    );
};

export default ReviewRegist;