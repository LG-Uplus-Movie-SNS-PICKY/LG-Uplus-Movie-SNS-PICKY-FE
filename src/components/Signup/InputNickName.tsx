import { useRecoilState } from "recoil";
import { userState, inputState } from "../../review/atoms";
import { Block, Input, Text } from "../../styles/ui";
// import { Warning, WarningDisabled } from "../../assets/svg";
import useFocus from "../hooks/useFocus";
import { useEffect } from "react";

export default function InputNickname() {
    const [userInfo, setUserInfo] = useRecoilState(userState);
    const [inputData, setInputData] = useRecoilState(inputState);
    const { isFocused, handleFocus, handleBlur } = useFocus();

    const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newData = e.target.value;

        setUserInfo((prev) => ({ ...prev, nickname: newData }));
        setInputData((prev) => ({ ...prev, nickname: newData }));
    };

    useEffect(() => {
        if (userInfo.nickname && inputData.nickname === "") {
            setInputData((prev) => ({ ...prev, nickname: userInfo.nickname }));
        }
    }, [userInfo.nickname, inputData.nickname, setInputData]);

    return (
        <>
            <Block.FlexBox width="20%" direction="column" gap="10px">
                <Text.FocusedMenu isFocused={isFocused}>닉네임</Text.FocusedMenu>
                <Input.InfoBox
                    value={userInfo.nickname || ""}
                    placeholder="닉네임을 입력해주세요"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChange={handleNicknameChange}
                />
                <Block.FlexBox alignItems="center" gap="10px">
                    {/* {isFocused ? <Warning width={16} /> : <WarningDisabled width={16} />} */}
                    <Text.FocusedWarning isFocused={isFocused}>
                        닉네임은 다른 사용자와 겹치지 않도록 입력해주세요
                    </Text.FocusedWarning>
                </Block.FlexBox>
            </Block.FlexBox>
        </>
    );
}