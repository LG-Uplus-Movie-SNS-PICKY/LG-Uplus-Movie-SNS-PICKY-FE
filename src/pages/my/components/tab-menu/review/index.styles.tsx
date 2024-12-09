import { css, SerializedStyles } from "@emotion/react";
import styled from "@emotion/styled";

export const StarContainer = styled.div`
  display: flex;
  gap: 4px;
`;

export const Star = styled.span<{ filled: boolean }>`
  color: ${(props) => (props.filled ? "#FC4C4E" : "#C8C8C8")};
  &::before {
    content: "★";
    display: block;
    width: 12px;
    height: 12px;
    font-size: 12px;
    line-height: 12px;
    text-align: center;
  }
`;

export const StarRating = styled.span`
  font-size: 12px;
  font-weight: 600;
  align-self: center;
`;

export default {
  container(): SerializedStyles {
    return css`
      width: 100%;
      height: 100%;

      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;

      gap: 16px;
      padding: 16px 0;

      &.centered {
        justify-content: center;
        gap: 12px;

        font-size: 24px;
        font-weight: 600;
        color: #191919;
      }
    `;
  },

  reviewCard(): SerializedStyles {
    return css`
      position: relative;

      width: 100%;
      display: flex;
      gap: 8px;

      & > .poster {
        width: 60px;
        border-radius: 4px;
        overflow: hidden;

        & > img {
          width: 100%;
          height: 100%;
        }
      }
    `;
  },

  reviewInfo(): SerializedStyles {
    return css`
      flex: 1;

      display: flex;
      flex-direction: column;
      justify-content: space-around;
      gap: 4px;

      padding: 8px 4px;

      & > .line-review-info {
        font-size: 12px;

        display: flex;
        align-items: center;
        gap: 8px;

        & > div {
          width: 32px;
          height: 16px;
          border-radius: 80px;

          font-size: 8px;
          color: #756262;

          border: 1px solid #d9d9d9;

          display: flex;
          justify-content: center;
          align-items: center;
        }
      }

      & > .sub-info {
        display: flex;
        align-items: center;
        gap: 4px;

        font-size: 10px;
        color: #756262;

        & > .round {
          width: 2px;
          height: 2px;
          border-radius: 50%;
          background-color: #d9d9d9;
        }
      }

      & > .reaction-info {
        display: flex;
        gap: 8px;

        & > .reaction-buttons {
          padding: 2px 6px;

          display: flex;
          align-items: center;
          gap: 4px;

          border: 1px solid #d9d9d9;
          border-radius: 80px;

          font-size: 10px;
          color: #756262;
        }
      }

      border-bottom: 1px solid #d9d9d9;
    `;
  },

  // reviewDeleteBtn(): SerializedStyles {
  //   return css`
  //     position: absolute;

  //     top: 1px;
  //     right: 4px;

  //     padding: 0 8px;

  //     & > svg {
  //       cursor: pointer;
  //       transition: all 0.3s;

  //       &:hover path {
  //         fill: #191919;
  //       }
  //     }
  //   `;
  // },

  reviewBtnContainer(): SerializedStyles {
    return css`
      position: absolute;
      top: 4px;
      right: 4px;
    `;
  },

  reviewEditBtn(): SerializedStyles {
    return css`
      text-align: center;
      color: #FFFFFF;
      font-size: 10px;
      font-weight: 600;
      border-radius: 4px;
      background-color: #FF084A;
      padding: 2px 4px;
      margin-bottom: 8px;
    `;
  },

  reviewDeleteBtn(): SerializedStyles {
    return css`
      text-align: center;
      color: #FF084A;
      font-size: 10px;
      font-weight: 600;
      border-radius: 4px;
      background-color: #FFFFFF;
      padding: 2px 4px;
      border: 1px solid #FF084A;
    `;
  },
};
