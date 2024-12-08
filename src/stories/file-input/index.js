import { jsx as _jsx } from "@emotion/react/jsx-runtime";
import MediaType from "./components/media";
import BasicType from "./components/basic";
export function FileInput({ type }) {
    const defaultAcceptFileExtension = "image/jpg, image/jpeg";
    return type === "basic" ? (_jsx(BasicType, { access: defaultAcceptFileExtension })) : (_jsx(MediaType, { access: `${defaultAcceptFileExtension}, video/mp4` }));
}
