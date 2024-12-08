import { jsx as _jsx } from "@emotion/react/jsx-runtime";
import { useEffect, useState } from "react";
import styles from "./index.styles";
export function Toast({ message, direction = 'none' }) {
    const [style, setStyle] = useState({
        opacity: 1,
        transform: direction === "up"
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
    return (_jsx("div", { css: styles.toastMessage(direction), style: style, children: message }));
}
