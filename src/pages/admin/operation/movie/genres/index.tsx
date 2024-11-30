import Search from "@assets/icons/search_small.svg?react";
import AddCriclBtn from "@assets/icons/add_circle_small.svg?react";

import { useState } from "react";
import styles from "./index.styles";

function MovieGenreOpertionPage() {
  return (
    <>
      {/* Filter Container */}
      <div css={styles.filterContainer()}>
        {/* Filter Select Tag */}
        <div css={styles.filter()}>
          <div className="add-genre-btn">
            <AddCriclBtn /> 장르 추가
          </div>
        </div>

        {/* Search Input Tag */}
        <form
          css={styles.search()}
          onSubmit={(event) => event.preventDefault()}
        >
          <input type="text" />
          <button type="submit">
            <Search />
          </button>
        </form>
      </div>

      {/* Table Container */}
      <table css={styles.tableContainer()}>
        {/* Table Header */}
        <thead>
          <tr>
            <th>genre</th>
            <th>Included Movies</th>
            <th></th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          <tr>
            {/* 장르 이름 */}
            <td css={styles.tableBodyItem()}>
              <span className="title">Actions</span>
            </td>

            {/* 해당 장르에 포함된 영화 수 */}
            <td css={styles.tableBodyItem()}>2,312</td>

            {/* 삭제 수정 버튼 버튼 */}
            <td css={styles.tableBodyItem()}>
              <div className="buttons">
                <button>수정</button>
                <button>삭제</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default MovieGenreOpertionPage;
