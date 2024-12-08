// pages/MovieDetail/Reviews/components/ReviewRegist/index.styles.tsx
import styled from '@emotion/styled';
export const Container = styled.div `
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px;
  gap: 16px;
  background-color: #FFFFFF;
`;
export const TitleContainer = styled.div `
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 8px;
`;
export const Badge = styled.div `
    color: #756262;
    font-size: 8px;
    font-weight: 400;
    border: 0.5px solid #756262;
    border-radius: 80px;
    width: 32px;
    height: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
`;
export const Text = styled.div `
    font-size: 12px;
    font-weight: 400;
`;
export const Star = styled.span `
  font-size: 24px;
  cursor: pointer;
  color: ${props => (props.active ? '#FFEB00' : '#C8C8C8')};
  width: 24px;
  height: 24px;
  line-height: 24px;
  display: inline-block;
  margin: 0 2px;
`;
export const SpoilerContainer = styled.div `
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 4px;
`;
export const YesNoButtonContainer = styled.div `
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 32px;
`;
export const YesNoButton = styled.div `
    display: flex;
    justify-content: center;
    align-items: center;
    width: 42px;
    height: 20px;
    font-size: 12px;
    color: ${props => (props.active ? '#756262' : '#9D9D9D')};
    font-weight: ${props => (props.active ? '600' : '400')};
    border-radius: 80px;
    border: ${props => (props.active ? '1px solid #756262' : '1px solid #D9D9D9')};
    background-color: ${props => (props.active ? 'rgba(117, 98, 98, 0.2)' : '#FFFFFF')};
`;
export const Wrapper = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    width: 100%;
`;
export const ReviewInputContainer = styled.div `
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;
export const ReviewInput = styled.input `
  flex: 1;
  padding: 8px;
  border: 1px solid #D9D9D9;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  font-size: 12px;
  height: 32px;
  color: #000000;

  &::placeholder {
    color: #D9D9D9;
  }
  &:focus {
    outline: none;
    border-color: #D9D9D9;
  }
`;
export const SubmitButton = styled.div `
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  padding: 8px 16px;
  color: #FFFFFF;
  background-color: #756262;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  height: 32px;
  cursor: pointer;
`;
export const WithinText = styled.div `
  display: flex;
  justify-content: flex-end;
  width: 100%;
  font-size: 10px;
  color: #D9D9D9;
`;
export const TextCountWrapper = styled.div `
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;
export const TextCountContainer = styled.div `
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;
export const CountText = styled.span `
  font-size: 10px;
  color: #000000;
  font-weight: 600;
  text-align: center;
`;
export const MaxText = styled.span `
  font-size: 10px;
  color: #9D9D9D;
  text-align: center;
`;
