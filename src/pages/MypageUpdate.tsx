import { useState, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { Flex, Text, colors } from "../styles/theme";
import { Input, TextArea, Button } from "../components";
import { profileIcon, updateIcon } from "../assets";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getMe, updateMe } from "../apis/me";

export const MypageUpdate = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const { data: user } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
  });

  useEffect(() => {
    if (user) {
      setName(user.username);
      setDesc(user.description);
      setPreviewImage(user.profileImageURL);
    }
  }, [user]);

  const updateMutation = useMutation({
    mutationFn: () => {
      const formData = new FormData();
      formData.append("username", name);
      formData.append("description", desc);
      if (imageFile) {
        formData.append("file", imageFile);
      }
      return updateMe(formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
      navigate("/my");
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  return (
    <Flex
      width="100%"
      isColumn={true}
      gap={60}
      paddingBottom="200px"
      alignItems="center"
    >
      <Flex width="100%" justifyContent="flex-end" gap={8}>
        <Button
          children="저장"
          backgroundColor={colors.gray[900]}
          color={colors.gray[50]}
          onClick={() => updateMutation.mutate()}
        />
        <Button
          children="이전"
          backgroundColor={colors.gray[50]}
          color={colors.gray[900]}
          onClick={() => navigate("/my")}
        />
      </Flex>

      <Flex width="100%" isColumn={true} gap={80} alignItems="center">
        <Profile>
          <ProfileIcon
            src={previewImage || profileIcon}
            alt="프로필"
          />
          <UpdateButton onClick={() => fileInputRef.current?.click()}>
            <img src={updateIcon} alt="프로필 수정" />
          </UpdateButton>
          <HiddenFileInput
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </Profile>

        <Flex width="100%" isColumn={true} alignItems="center" gap={40}>
          <Flex isColumn={true} alignItems="flex-start" gap={8}>
            <Text fontSize={16} fontWeight={500}>
              이름
            </Text>
            <NameInput
              placeholder="이름을 입력해주세요."
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Flex>

          <Flex width="962px" isColumn={true} alignItems="flex-start" gap={8}>
            <TextArea
              label="설명"
              placeholder="설명을 입력해주세요."
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

const Profile = styled.div`
  width: 172px;
  height: 172px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.gray[100]};
  border-radius: 100%;
  position: relative;
`;
const ProfileIcon = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
`;
const UpdateButton = styled.button`
  width: 42px;
  height: 42px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.gray[200]};
  border-radius: 100%;
  position: absolute;
  bottom: 4px;
  right: 4px;

  img {
    width: 26px;
    height: 26px;
  }
`;
const NameInput = styled(Input)`
  width: 446px;
`;
const HiddenFileInput = styled.input`
  display: none;
`;
