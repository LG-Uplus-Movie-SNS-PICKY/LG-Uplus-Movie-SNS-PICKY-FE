import styles from "./index.styles";

export interface HeaderProps {}

export function Header() {
  return (
    <header css={styles.headerContainer()}>
      <div></div>
      <div></div>
    </header>
  );
}
