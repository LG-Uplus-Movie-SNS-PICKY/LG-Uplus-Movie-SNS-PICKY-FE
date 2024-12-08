import React from 'react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/scrollbar';
interface CastMember {
    name: string;
    role: string;
    image: string;
}
interface MovieInfoProps {
    content: string;
    castData: CastMember[];
}
declare const MovieInfo: React.FC<MovieInfoProps>;
export default MovieInfo;
