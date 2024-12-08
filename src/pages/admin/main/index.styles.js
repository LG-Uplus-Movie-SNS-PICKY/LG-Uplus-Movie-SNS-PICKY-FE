import { css } from "@emotion/react";
export default {
    dashboardWrapper() {
        return css `
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;

      gap: 8px;

      & > .dashboard-title {
        font-size: 14px;
        font-weight: 600;
        color: #9e9e9e;
        text-transform: uppercase;
      }
    `;
    },
    dashboardContainer() {
        return css `
      display: flex;
      flex-wrap: wrap;
      gap: 18px;
    `;
    },
};
