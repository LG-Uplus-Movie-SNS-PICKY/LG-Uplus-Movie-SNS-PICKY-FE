declare const useFocus: () => {
    isFocused: boolean;
    setIsFocused: React.Dispatch<React.SetStateAction<boolean>>;
    handleFocus: () => void;
    handleBlur: () => void;
};
export default useFocus;
