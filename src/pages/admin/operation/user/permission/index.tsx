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
          <button>Search</button>
        </form>
      </div>

      {/* Table Container */}
    </>
  );
}

export default UserPermissionOpertionPage;
