import { useEffect, useState } from "react";
import styles from "./index.styles";

interface ToastProps {
  message: string;
  direction?: 'none' | 'up' | 'down';
}


export function Toast({
  message,
  direction = 'none'
}: ToastProps) {
  const [style, setStyle] = useState({
    opacity: 1, 
    transform:
      direction === "up"
        ? "translate(-50%, 0)"
        : direction === "down"
        ? "translate(-50%, 0)"
        : "translate(-50%, -50%)",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setStyle({
        opacity: 0,
        transform: `translate(-50%, ${direction === 'up' ? '-100%' : direction === 'down' ? '100%' : '-50%'})`
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [direction]);

  return (
    <div css={styles.toastMessage(direction)} style={style}>
      {message}
    </div>
  );
}
