import styles from "./index.styles";

interface MovieLogContentProps {
  data?: string;
}

function EmptyMovieLog() {
  return <></>;
}

function MovieLogContnent({ data }: MovieLogContentProps) {
  return (
    <div css={styles.container()} className={data?.length ? "" : "centered"}>
      {data?.length === 0 && <EmptyMovieLog />}
    </div>
  );
}

export default MovieLogContnent;
