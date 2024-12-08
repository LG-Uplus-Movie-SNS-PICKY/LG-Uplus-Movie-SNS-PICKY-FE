import { useState } from "react";
const useFocus = () => {
    const [isFocused, setIsFocused] = useState(false);
    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);
    return {
        isFocused,
        setIsFocused,
        handleFocus,
        handleBlur,
    };
};
export default useFocus;
