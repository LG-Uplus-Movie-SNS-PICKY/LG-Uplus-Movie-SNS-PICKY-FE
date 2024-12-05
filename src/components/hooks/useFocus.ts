import { useState } from "react";

const useFocus = (): {
    isFocused: boolean;
    setIsFocused: React.Dispatch<React.SetStateAction<boolean>>;
    handleFocus: () => void;
    handleBlur: () => void;
} => {
    const [isFocused, setIsFocused] = useState<boolean>(false);

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
