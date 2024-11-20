import styles from "./index.styles";

import Logo from "@assets/icons/logo.svg?react";

export interface HeaderProps {}

export function Header() {
  return (
    <header css={styles.headerContainer()}>
      <div>
        <Logo />
      </div>
      <div></div>
    </header>
  );
}
