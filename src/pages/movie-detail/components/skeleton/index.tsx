// pages/movie-detail/components/skeleton/index.tsx
import React from 'react';
import styled from 'styled-components';

// 공통 Pulse 애니메이션
const SkeletonBox = styled.div`
    background: #e0e0e0;
    animation: pulse 1.5s infinite;

    @keyframes pulse {
        0% {
            background-color: #e0e0e0;
        }
        50% {
            background-color: #f0f0f0;
        }
        100% {
            background-color: #e0e0e0;
        }
    }
`;

// YouTube 비하인드 영상 Skeleton 썸네일
export const Skeleton = styled(SkeletonBox)`
    width: 280px;
    height: 220px;
`;

// OST Skeleton 이미지
export const SkeletonImage = styled(SkeletonBox)`
    width: 48px;
    height: 48px;
    border-radius: 2px; // 실제 OST 이미지와 동일한 스타일
`;

// OST Skeleton 제목
export const SkeletonTitle = styled(SkeletonBox)`
    width: 100%; // 제목의 너비
    height: 16px;
    margin-top: 4px;
`;

// OST Skeleton 아티스트
export const SkeletonArtist = styled(SkeletonBox)`
    width: 100%;
    height: 14px;
    margin-top: 4px;
`;
