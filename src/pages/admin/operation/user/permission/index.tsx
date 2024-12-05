import Search from "@assets/icons/search_small.svg?react";

import { useState } from "react";
import styles from "./index.styles";

function UserPermissionOpertionPage() {
  const [filterValue, setFilterValue] = useState("all");

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
            <th>name</th>
            <th>email</th>
            <th>role</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          <tr>
            {/* 사용자 이름과 프로필 */}
            <td css={styles.tableBodyItem()}>
              <div className="profile">
                <div className="profile-image">
                  <img src="" alt="" />
                </div>

                <span>Amanda</span>
              </div>
            </td>

            {/* 사용자 이메일 */}
            <td css={styles.tableBodyItem()}>amanda@gmail.com</td>

            {/* 사용자 권한 수정 Select Box */}
            <td css={styles.tableBodyItem()}>
              <select className="roleSelect">
                <option value="user">User</option>
                <option value="critic">Criric</option>
                <option value="admin">Admin</option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default UserPermissionOpertionPage;
