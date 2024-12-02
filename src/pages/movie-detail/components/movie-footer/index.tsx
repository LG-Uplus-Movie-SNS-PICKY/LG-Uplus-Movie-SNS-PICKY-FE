// pages/MovieDetail/components/MovieFooter/index.tsx
import React from 'react';
import { FooterContainer, FooterItem, FooterTitle, FooterContent } from './index.styles';

interface MovieFooterProps {
    year: string;
    production: string;
    age: string;
    genre: string;
}

const MovieFooter = ({ year, production, age, genre }: MovieFooterProps) => {
  return (
    <FooterContainer>
      <FooterItem>
        <FooterTitle>제작 연도</FooterTitle>
        <FooterContent>{year}</FooterContent>
      </FooterItem>
      <FooterItem>
        <FooterTitle>제작사</FooterTitle>
        <FooterContent>{production}</FooterContent>
      </FooterItem>
      <FooterItem>
        <FooterTitle>연령 등급</FooterTitle>
        <FooterContent>{age}세</FooterContent>
      </FooterItem>
      <FooterItem>
        <FooterTitle>장르</FooterTitle>
        <FooterContent>{genre}</FooterContent>
      </FooterItem>
    </FooterContainer>
  );
}

export default MovieFooter;