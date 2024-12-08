import { FileInput } from "./";
const meta = {
    title: "GlobalComponent/FileInput",
    component: FileInput,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {},
};
export default meta;
// 이미지만 등록할 수 있는 File type Input 태그
export const BasicFileInput = {
    args: {
        type: "basic",
    },
};
// 이미지, 영상 파일 모두 등록할 수 있는 File type Input 태그
export const MediaFileInput = {
    args: {
        type: "media",
    },
};
