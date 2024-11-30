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
    FilterContainer,
    SortContainer,
    SortOption,
    SpoilerToggleContainer,
    SpoilerToggleText,
    SpoilerToggleButton
} from './index.styles';
import SpoilerToggleSvg from '../../../../../assets/icons/spoiler_toggle.svg?react';
import SpoilerToggleActiveSvg from '../../../../../assets/icons/spoiler_toggle_active.svg?react';

interface ReviewRegistProps {
    includeSpoilers: boolean;
    setIncludeSpoilers: React.Dispatch<React.SetStateAction<boolean>>;
}

const ReviewRegist: React.FC<ReviewRegistProps> = ({ includeSpoilers, setIncludeSpoilers }) => {
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const [spoiler, setSpoiler] = useState<boolean | null>(null);
    const [sortBy, setSortBy] = useState('');

    const handleToggleSpoilers = () => {
        setIncludeSpoilers(!includeSpoilers);
    };

    const handleRating = (index: number) => {
        setRating(index + 1);
    };

    const handleSubmit = () => {
        console.log({ rating, review, spoiler });
        alert('관람평이 등록되었습니다.');
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
                        onChange={(e) => setReview(e.target.value)}
                        placeholder="감상평을 작성해주세요."
                    />
                    <SubmitButton onClick={handleSubmit}>등록</SubmitButton>
                </ReviewInputContainer>
                <FilterContainer>
                    <SortContainer>
                        <SortOption onClick={() => setSortBy('popular')} active={sortBy === 'popular'}>
                            공감순
                        </SortOption>
                        <SortOption onClick={() => setSortBy('recent')} active={sortBy === 'recent'}>
                            최신순
                        </SortOption>
                    </SortContainer>
                    <SpoilerToggleContainer>
                        <SpoilerToggleText>스포일러 포함</SpoilerToggleText>
                        <SpoilerToggleButton onClick={handleToggleSpoilers}>
                            {includeSpoilers ? <SpoilerToggleActiveSvg /> : <SpoilerToggleSvg />}
                        </SpoilerToggleButton>
                    </SpoilerToggleContainer>
                </FilterContainer>
            </Wrapper>
        </Container>
    );
};

export default ReviewRegist;