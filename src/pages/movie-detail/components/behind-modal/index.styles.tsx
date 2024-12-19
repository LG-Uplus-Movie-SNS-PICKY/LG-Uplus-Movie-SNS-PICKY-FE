// pages/MovieDetail/components/BehindModal/index.styles.tsx
import styled from '@emotion/styled';

// 모달 컨테이너
export const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(1px);
`;

// 닫기 버튼
export const CloseButton = styled.div`
  position: absolute;
  top: -12px;
  right: -12px;
  border-radius: 50px;
  display: flex;
  z-index: 10;
  box-shadow: 0px 0px 4px rgba(255, 255, 255, 0.25);
`;

// 내용 컨테이너
export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  position: relative;
  width: 90%;
  max-width: 398px;
  background-color: #FFFFFF;
  border-radius: 12px;
  box-sizing: border-box;
  border: 1.5px solid #9D9D9D;
  box-shadow: 0 0 4px rgba(255, 255, 255, 0.25);
`;

export const YoutubeSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 12px;
    padding: 20px;
    width: 100%;
`;

export const OstSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 12px;
    padding: 20px;
    width: 100%;
    height: 270px;
    overflow: hidden;
`;

export const YoutubeLogo = styled.div`
    display: flex;
    gap: 4px;
    align-items: flex-start;
    justify-content: center;  
`;

// 제목
export const Title = styled.div`
  font-size: 20px;
  font-weight: 600;
  text-align: center;
`;

export const YoutubeContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 12px;
    width: 100%;
    overflow-x: auto;
`;

export const BehindContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const OstPlayist = styled.div`
    display: flex;
    width: 100%;
    /* height: 200px; */
    flex-direction: column;
    overflow: hidden;
    overflow-y: auto;
    gap: 8px;
`;

export const OstContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    width: 100%;
    cursor: pointer;
    /* overflow-y: auto; */
`;

export const OstInfoContainer = styled.div`
    display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 4px;
  padding: 4px;
  border-bottom: 0.5px solid #D9D9D9;
  flex: 1;
  min-width: 0; /* 텍스트 잘림 처리를 위해 필수 */
  width: 100%;
  height: 56px;
`;

// OST 앨범 커버
export const OstImage = styled.img`
    width: 48px;
    height: 48px;
    border-radius: 2px;
`;

// OST 제목
export const OstTitle = styled.span`
  font-size: 16px;
  font-weight: 400;
  white-space: nowrap; /* 한 줄로 표시 */
  overflow: hidden; /* 넘치는 내용 숨기기 */
  text-overflow: ellipsis; /* ... 처리 */
  width: 100%; /* 부모 컨테이너 너비 기준으로 동작 */
`;

// OST 아티스트
export const OstArtist = styled.span`
  font-size: 16px;
  font-weight: 400;
  color: #9d9d9d;
  white-space: nowrap; /* 한 줄로 표시 */
  overflow: hidden; /* 넘치는 내용 숨기기 */
  text-overflow: ellipsis; /* ... 처리 */
  width: 100%; /* 부모 컨테이너 너비 기준으로 동작 */
`;  