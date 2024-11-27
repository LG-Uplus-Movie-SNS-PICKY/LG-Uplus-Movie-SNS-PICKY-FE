import styled from "styled-components";

export const FileInput = styled.input`
  display: none;
`;

export const CustomFileLabel = styled.label`
  display: inline-block;
  padding: 10px 20px;
  background-color: #ff084a;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e0073f;
  }
`;

export const ImageContainer = styled.div<{ $hasImage: boolean }>`
  width: 240px;
  height: 240px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ $hasImage }) =>
    $hasImage ? "transparent" : "#f3f3f3"};
  border-radius: 10%; /* 원형으로 변경 */
  overflow: hidden;
  /* border: ${({ $hasImage }) =>
    $hasImage ? "2px solid #ff084a" : " dashed #ffffff"}; */
`;

export const DefaultImageText = styled.div`
  color: #9d9d9d;
  font-size: 14px;
  text-decoration: underline;
  margin-top: 10px;
  cursor: pointer;

  &:hover {
    color: #9d9d9d;
  }
`;

export const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  justify-content: center;
  align-items: center;
`;