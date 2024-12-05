import Search from "@assets/icons/search_small.svg?react";

import { useState } from "react";
import styles from "./index.styles";

function ReviewsOpertionPage() {
  const [filterValue, setFilterValue] = useState("all");
  const [toggled, setToggled] = useState(false);

  return (
    <>
      {/* Filter Container */}
      <div css={styles.filterContainer()}>
        {/* Filter Select Tag */}
        <div css={styles.filter()}>
          <label htmlFor="filter">Filter By: </label>
          <select
            id="filter"
            value={filterValue}
            onChange={(event) => setFilterValue(event.target.value)}
          >
            <option value="all">All</option>
            <option value="user">User</option>
            <option value="critic">Critic</option>
            <option value="admin">Admin</option>
          </select>
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
            <th>movie</th>
            <th>user</th>
            <th>reviews</th>
            <th>hide</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          <tr>
            {/* 사용자 이름과 프로필 */}
            <td css={styles.tableBodyItem()}>
              <div className="movie-info">
                <div className="movie-info_thumbnail">
                  <img src="" alt="" />
                </div>

                <div className="movie-info_detail">
                  <span className="title">Eternal Sunshine</span>
                  <span className="genre">Romance</span>
                </div>
              </div>
            </td>

            {/* 사용자 이메일 */}
            <td css={styles.tableBodyItem()}>Amanda</td>

            {/* 사용자 권한 수정 Select Box */}
            <td css={styles.tableBodyItem()}>
              모두 기억 잃고 다시 기억 되살아나는 재미없는 영화..
            </td>

            {/* 숨김 처리 버튼 */}
            <td css={styles.tableBodyItem()}>
              <button
                css={styles.toggleBtn()}
                onClick={() => setToggled(!toggled)}
                className={toggled ? "toggled" : ""}
              >
                <div className="thumb" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default ReviewsOpertionPage;
