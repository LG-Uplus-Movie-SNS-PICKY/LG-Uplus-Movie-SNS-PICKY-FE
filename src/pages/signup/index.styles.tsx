import styled from "styled-components";
import { Block} from "../../styles/ui";

export const ProgressBarContainer = styled.div`
  width: 100%;
  height: 10px;
  background-color: #f3f3f3;
  margin-bottom: 20px;

  @media (max-width: 76px) {
    height: 8px;
  }

  @media (max-width: 48px) {
    height: 6px;
    margin-bottom: 15px;
  }
`;

export const Progress = styled.div<{ progress: number }>`
  width: ${({ progress }) => progress}%;
  height: 100%;
  background-color: #ff084a;
  transition: width 0.3s ease-in-out;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
`;

export const ResponsiveFlexBox = styled(Block.FlexBox)`
  @media (max-width: 768px) {
    width: 90%;
    padding: 0 20px;
  }

  @media (max-width: 480px) {
    gap: 15px;
  }
`;

export  const ResponsiveButtonWrapper = styled.div`
  max-width: 768px;
  width: 100%;
  display: flex;
  position: fixed;
  bottom: 20px;
  left: 50;
  padding: 12px 16px;

  @media (max-width: 768px) {
    button {
      width: 90%;
      font-size: 14px;
      padding: 10px;
    }
  }

  @media (max-width: 480px) {
    button {
      width: 100%;
      font-size: 12px;
      padding: 8px;
    }
  }
`;

export const BackButton = styled.button`
  position: absolute;
  top: 20px;
  /* left: 20px; */
  background-color: transparent;
  border: none;
  color: #ff084a;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export const LogoContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 24px 32px;
`;