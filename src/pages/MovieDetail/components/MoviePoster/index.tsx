// pages/MovieDetail/components/MoviePoster/index.tsx
import {
    PosterContainer,
    PosterImage,
    MovieInfoContainer,
    InfoTextWrapper,
    Title,
    InfoTextContainer,
    Year,
    Nation,
    Genre,
    OttWrapper,
    Ott,
    OttContainer,
} from './index.styles';

interface MoviePosterProps {
    imageUrl: string;
    title: string;
    year: string;
    nation: string;
    genre: string;
    ott: Array<{ name: string; url: string }>;
}

const MoviePoster = ({ imageUrl, title, year, nation, genre, ott }: MoviePosterProps) => {
    return (
        <PosterContainer>
            <PosterImage src={imageUrl} />
            <MovieInfoContainer>
                <InfoTextWrapper>
                    <Title>{title}</Title>
                    <InfoTextContainer>
                        <Year>{year}</Year>|<Nation>{nation}</Nation>|<Genre>{genre}</Genre>
                    </InfoTextContainer>
                </InfoTextWrapper>
                <OttWrapper>
                    <Ott>감상 가능한 곳</Ott>
                    <OttContainer>
                        {ott.map((item, index) => (
                            <img key={index} src={item.url} />
                        ))}
                    </OttContainer>
                </OttWrapper>
            </MovieInfoContainer>
        </PosterContainer>
    );
}

export default MoviePoster;