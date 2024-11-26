// pages/MovieDetail/index.tsx
import React, { useState } from 'react';
import MovieHeader from './components/MovieHeader';
import MoviePoster from './components/MoviePoster';
import MovieRating from './components/MovieRating';
import MovieInfo from './components/MovieInfo';
import MovieReview from './components/MovieReview';
import MovieFooter from './components/MovieFooter';
import { NavigaterBar } from '../../../src/stories/navigater-bar';
import {
    MovieDetailContainer,
    ReviewHeader,
    Title,
    ReviewCountContainer,
    ReviewCount,
    FixedNavBarContainer
} from './index.styles';
import { Button } from '../../stories/button';
import { useNavigate } from 'react-router-dom';
import PlusSvg from '../../assets/icons/plus.svg?react';

interface MovieDetailProps {
    imageUrl?: string;
    title?: string;
    year?: string;
    nation?: string;
    production?: string;
    age?: string;
    genre?: string;
    ott?: Array<{ name: string; url: string }>;
    rating?: number;
    content?: string;
    castData?: Array<{ name: string; role: string; image: string }>;
    reviews?: Array<{ rating: number; text: string; user: string; date: string; likes: number; dislikes: number }>;
}

function MovieDetail(props: MovieDetailProps) {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<string>('home');

    const handleTabChange = (event: React.MouseEvent<HTMLDivElement>, name: string) => {
        setActiveTab(name);
    };

    const handleReviewClick = () => {
        navigate('/movie/:id/reviews');
    }

    // 더미 데이터
    const dummyData = {
        imageUrl: "https://upload.wikimedia.org/wikipedia/ko/thumb/f/f2/%EC%96%B4%EB%B2%A4%EC%A0%B8%EC%8A%A4-_%EC%97%94%EB%93%9C%EA%B2%8C%EC%9E%84_%ED%8F%AC%EC%8A%A4%ED%84%B0.jpg/1200px-%EC%96%B4%EB%B2%A4%EC%A0%B8%EC%8A%A4-_%EC%97%94%EB%93%9C%EA%B2%8C%EC%9E%84_%ED%8F%AC%EC%8A%A4%ED%84%B0.jpg",
        title: "어벤져스: 엔드게임",
        year: "2019",
        nation: "미국",
        production: "MARVEL",
        age: "12",
        genre: "액션/모험/SF",
        ott: [
            { name: "Netflix", url: "https://yt3.googleusercontent.com/SXKyE4XgHJtX4qLS-9FKDuZt9EpBfeFPlGmNQdqsfxW2FDaKOjE53Mb20E43QuQfNDritLK1aw=s900-c-k-c0x00ffffff-no-rj" },
            { name: "DisneyPlus", url: "https://yt3.googleusercontent.com/y8xDKfp1aHjwej33BIhVNcaJnHgKke2jB6bHkrrpckJO7SxyFvvDpPRbIwO0kxGcZOnAOHkCfQ=s900-c-k-c0x00ffffff-no-rj" },
            { name: "Watcha", url: "https://yt3.googleusercontent.com/pCcTLy8Zj7gIuo3yfYkB6cT2f0jz2beWJC5E4-B4ju9VBLdfrVDi6yc0B0313N8EVLY1UBaxxA=s900-c-k-c0x00ffffff-no-rj" },
            // { name: "Wavve", url: "https://yt3.googleusercontent.com/AwhuiDrnSIKzxLyp48jc5dyxj7YVdpwrj42s11o0slC0_sAOVQDDASFU9q3fDwan8UKEJP0Wew=s900-c-k-c0x00ffffff-no-rj" },
            // { name: "Tving", url: "https://www.tving.com/img/tving-favicon-160@3x.png" },
            // { name: "CoupangPlay", url: "https://play-lh.googleusercontent.com/IPu4haF4Jl9sMQ8TUEYJ4zUtN9pHJuxLOZzGHQcRPeT5ud07Y4sgUlB6ITaaxtbsPVA" }
        ],
        rating: 4.0,
        content: "인피니티 워 이후 절반만 살아남은 지구, 마지막 희망이 된 어벤져스, 먼저 떠난 그들을 위해 모든 것을 걸었다. 위대한 어벤져스, 운명을 바꿀 최후의 전쟁이 펼쳐진다.",
        castData: [
            { name: "조 루소", role: "감독", image: "https://image.cine21.com/resize/cine21/still/2019/0418/14_25_08__5cb80a34c0dcf[X252,310].jpg" },
            { name: "안소니 루소", role: "감독", image: "https://image.cine21.com/resize/cine21/still/2019/0418/14_24_12__5cb809fc6dad1[X252,310].jpg" },
            { name: "로버트 다우니 주니어", role: "주연 | 토니 스타크/아이언맨", image: "https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/201604/21/htm_20160421164314998976.jpg" },
            { name: "크리스 에반스", role: "주연 | 스티브 로저스/ 캡틴 아메리카", image: "https://i.namu.wiki/i/6vKIsA4CfvqF59ZciHoKZjZwhMj9LOG2FTQv22cOgl1e5lfRrKvgpSHbwbhNORT_auVb9gLDc2Vy29uwhTUWqg.webp" },
            { name: "크리스 헴스워스", role: "주연 | 토르", image: "https://i.namu.wiki/i/RF2bnphJY00BhrytswngMDRsL_whNOouWTEXlAuQjtYWjzXsVfV_4iwF_CVC-zkujGe9yK0jGPVVihDOG7SBWw.webp" },
            { name: "스칼렛 요한슨", role: "주연 | 나타샤 로마노프/블랙 위도우", image: "https://fpost.co.kr/board/data/editor/2106/e0692777cc11265ef2fe7df0e9519ef5_1624928133_7986.jpg" },
        ],
        reviews: [  // Add this reviews array
            {
                rating: 4.0,
                text: "이 시절 마블 그리워요!!",
                user: "jaes****",
                date: "2022.12.24",
                likes: 18,
                dislikes: 0
            },
            {
                rating: 4.0,
                text: "이 시절 마블 그리워요!!",
                user: "kimy****",
                date: "2022.12.25",
                likes: 12,
                dislikes: 2
            },
            {
                rating: 5.0,
                text: "이 시절 마블 그리워요!!",
                user: "parkj****",
                date: "2022.12.26",
                likes: 30,
                dislikes: 3
            }
        ]
    };

    return (
        <div className='page'>
            <MovieHeader />
            <MovieDetailContainer>
                <MoviePoster
                    imageUrl={dummyData.imageUrl}
                    title={dummyData.title}
                    year={dummyData.year}
                    nation={dummyData.nation}
                    genre={dummyData.genre}
                    ott={dummyData.ott}
                />
                <MovieRating rating={dummyData.rating} />
                <MovieInfo content={dummyData.content} castData={dummyData.castData} />
                <ReviewHeader>
                    <Title>관람평</Title>
                    <ReviewCountContainer>
                        <ReviewCount>{dummyData.reviews.length}</ReviewCount>
                        <PlusSvg />
                    </ReviewCountContainer>
                </ReviewHeader>
                <MovieReview reviews={dummyData.reviews} />
                <Button btnType="More" label="모두 보기" onClick={handleReviewClick} />
                <MovieFooter
                    year={dummyData.year}
                    production={dummyData.nation}
                    age={dummyData.age}
                    genre={dummyData.genre}
                />
            </MovieDetailContainer>
            <FixedNavBarContainer>
                <NavigaterBar state={activeTab} handleTabChange={handleTabChange} />
            </FixedNavBarContainer>
        </div>
    );
}

export default MovieDetail;
