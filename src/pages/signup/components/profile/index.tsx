/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRecoilState } from "recoil";
import { inputState, userState } from "../../../../review/atoms";
import { Block, Text } from "../ui";
import useFocus from "../../../../components/hooks/useFocus";
import { DefaultImage} from "../../../../assets/svg";
import defaultUserImage from "../../../../assets/images/default_userImage.png";
import {FileInput, CustomFileLabel, ImageContainer, StyledImage, DefaultImageText} from "./index.styles"

export default function InputProfile() {
  const { isFocused } = useFocus();
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const [inputData, setInputData] = useRecoilState(inputState);

  const handleProfileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("파일 크기는 5MB를 초과할 수 없습니다.");
        return;
      }
      const imageUrl = URL.createObjectURL(file);
      setUserInfo((prev) => ({ ...prev, profileImage: imageUrl }));
      setInputData((prev) => ({ ...prev, profileImage: imageUrl }));

      return () => URL.revokeObjectURL(imageUrl);
    }
  };

  const setDefaultImage = () => {
    if (!userInfo.profileImage) {
      setUserInfo((prev) => ({ ...prev, profileImage: defaultUserImage }));
      setInputData((prev) => ({ ...prev, profileImage: defaultUserImage }));
      alert("기본 이미지가 설정되었습니다.");
    }
  };

  return (
    <>
      <Block.FlexBox
        $width="20%"
        $direction="column"
        $gap="10px"
        $alignItems="center"
      >
        <Text.FocusedMenu $isFocused={isFocused}>프로필 이미지</Text.FocusedMenu>
        <ImageContainer $hasImage={!!userInfo.profileImage}>
          {userInfo.profileImage ? (
            <StyledImage src={userInfo.profileImage} alt="프로필 미리보기" />
          ) : (
            <DefaultImage width="100%" height="100%" />
          )}
        </ImageContainer>

        <FileInput
          type="file"
          id="profile-upload"
          accept="image/*"
          onChange={handleProfileUpload}
        />
        <CustomFileLabel htmlFor="profile-upload">이미지 업로드</CustomFileLabel>

        {/* 기본 이미지 설정을 텍스트로 제공 */}
        {!userInfo.profileImage && (
          <DefaultImageText onClick={setDefaultImage
          }>
            기본 이미지 설정
          </DefaultImageText>
        )}
      </Block.FlexBox>
    </>
  );
}