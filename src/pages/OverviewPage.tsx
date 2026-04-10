import { useState } from "react";
import type { PostSchemaType } from "../types";
import { colors, Flex, Text } from "../styles/theme";
import styled from "@emotion/styled";
import FullLogo from "../assets/FullLogo.svg";
import chat from "../assets/chat.svg";
import { Post } from "../components";

export const OverviewPage = () => {
  const isLogged = true;

  const [datas, setDatas] = useState<PostSchemaType[]>([
    {
      id: 1,
      title: "집에서",
      keyword: ["ddd", "kkfk"],
      description: "12345678",
      views: 100,
      likes: 1000,
      authorName: "김소희",
      imgURL:
        "https://image.msscdn.net/cms/v2/content/file_1756347169119_43077299_tdh8ah.jpg",
    },
    {
      id: 1,
      title: "집에서",
      keyword: ["ddd", "kkfk"],
      description: "12345678",
      views: 100,
      likes: 1000,
      authorName: "김소희",
      imgURL:
        "https://image.msscdn.net/cms/v2/content/file_1756347169119_43077299_tdh8ah.jpg",
    },
    {
      id: 1,
      title: "집에서",
      keyword: ["ddd", "kkfk"],
      description: "12345678",
      views: 100,
      likes: 1000,
      authorName: "김소희",
      imgURL:
        "https://image.msscdn.net/cms/v2/content/file_1756347169119_43077299_tdh8ah.jpg",
    },
    {
      id: 1,
      title: "집에서",
      keyword: ["ddd", "kkfk"],
      description: "12345678",
      views: 100,
      likes: 1000,
      authorName: "김소희",
      imgURL:
        "https://image.msscdn.net/cms/v2/content/file_1756347169119_43077299_tdh8ah.jpg",
    },
    {
      id: 1,
      title: "집에서",
      keyword: ["#ddd", "#kkfk"],
      description: "12345678",
      views: 100,
      likes: 1000,
      authorName: "김소희",
      imgURL:
        "https://image.msscdn.net/cms/v2/content/file_1756347169119_43077299_tdh8ah.jpg",
    },
    {
      id: 1,
      title: "집에서",
      keyword: ["#ddd", "#kkfk"],
      description: "12345678",
      views: 100,
      likes: 1000,
      authorName: "김소희",
      imgURL:
        "https://image.msscdn.net/cms/v2/content/file_1756347169119_43077299_tdh8ah.jpg",
    },
    {
      id: 1,
      title: "집에서",
      keyword: ["#ddd", "#kkfk"],
      description: "12345678",
      views: 100,
      likes: 1000,
      authorName: "김소희",
      imgURL:
        "https://image.msscdn.net/cms/v2/content/file_1756347169119_43077299_tdh8ah.jpg",
    },
    {
      id: 1,
      title: "집에서",
      keyword: ["#ddd", "#kkfk"],
      description: "12345678",
      views: 100,
      likes: 1000,
      authorName: "김소희",
      imgURL:
        "https://image.msscdn.net/cms/v2/content/file_1756347169119_43077299_tdh8ah.jpg",
    },
    {
      id: 1,
      title: "집에서",
      keyword: ["#ddd", "#kkfk"],
      description: "12345678",
      views: 100,
      likes: 1000,
      authorName: "김소희",
      imgURL:
        "https://image.msscdn.net/cms/v2/content/file_1756347169119_43077299_tdh8ah.jpg",
    },
    {
      id: 1,
      title: "집에서",
      keyword: ["#ddd", "#kkfk"],
      description: "12345678",
      views: 100,
      likes: 1000,
      authorName: "김소희",
      imgURL:
        "https://image.msscdn.net/cms/v2/content/file_1756347169119_43077299_tdh8ah.jpg",
    },
    {
      id: 1,
      title: "집에서",
      keyword: ["#ddd", "#kkfk"],
      description: "12345678",
      views: 100,
      likes: 1000,
      authorName: "김소희",
      imgURL:
        "https://image.msscdn.net/cms/v2/content/file_1756347169119_43077299_tdh8ah.jpg",
    },
    {
      id: 1,
      title: "집에서",
      keyword: ["#ddd", "#kkfk"],
      description: "12345678",
      views: 100,
      likes: 1000,
      authorName: "김소희",
      imgURL:
        "https://image.msscdn.net/cms/v2/content/file_1756347169119_43077299_tdh8ah.jpg",
    },
    {
      id: 1,
      title: "집에서",
      keyword: ["#ddd", "#kkfk"],
      description: "12345678",
      views: 100,
      likes: 1000,
      authorName: "김소희",
      imgURL:
        "https://image.msscdn.net/cms/v2/content/file_1756347169119_43077299_tdh8ah.jpg",
    },
    {
      id: 1,
      title: "집에서",
      keyword: ["#ddd", "#kkfk"],
      description: "12345678",
      views: 100,
      likes: 1000,
      authorName: "김소희",
      imgURL:
        "https://image.msscdn.net/cms/v2/content/file_1756347169119_43077299_tdh8ah.jpg",
    },
    {
      id: 1,
      title: "집에서",
      keyword: ["#ddd", "#kkfk"],
      description: "12345678",
      views: 100,
      likes: 1000,
      authorName: "김소희",
      imgURL:
        "https://image.msscdn.net/cms/v2/content/file_1756347169119_43077299_tdh8ah.jpg",
    },
    {
      id: 1,
      title: "집에서",
      keyword: ["#ddd", "#kkfk"],
      description: "12345678",
      views: 100,
      likes: 1000,
      authorName: "김소희",
      imgURL:
        "https://image.msscdn.net/cms/v2/content/file_1756347169119_43077299_tdh8ah.jpg",
    },
    {
      id: 1,
      title: "집에서",
      keyword: ["#ddd", "#kkfk"],
      description: "12345678",
      views: 100,
      likes: 1000,
      authorName: "김소희",
      imgURL:
        "https://image.msscdn.net/cms/v2/content/file_1756347169119_43077299_tdh8ah.jpg",
    },
    {
      id: 1,
      title: "집에서",
      keyword: ["#ddd", "#kkfk"],
      description: "12345678",
      views: 100,
      likes: 1000,
      authorName: "김소희",
      imgURL:
        "https://image.msscdn.net/cms/v2/content/file_1756347169119_43077299_tdh8ah.jpg",
    },
    {
      id: 1,
      title: "집에서",
      keyword: ["#ddd", "#kkfk"],
      description: "12345678",
      views: 100,
      likes: 1000,
      authorName: "김소희",
      imgURL:
        "https://image.msscdn.net/cms/v2/content/file_1756347169119_43077299_tdh8ah.jpg",
    },
    {
      id: 1,
      title: "집에서",
      keyword: ["#ddd", "#kkfk"],
      description: "12345678",
      views: 100,
      likes: 1000,
      authorName: "김소희",
      imgURL:
        "https://image.msscdn.net/cms/v2/content/file_1756347169119_43077299_tdh8ah.jpg",
    },
    {
      id: 1,
      title: "집에서",
      keyword: ["#ddd", "#kkfk"],
      description: "12345678",
      views: 100,
      likes: 1000,
      authorName: "김소희",
      imgURL:
        "https://image.msscdn.net/cms/v2/content/file_1756347169119_43077299_tdh8ah.jpg",
    },
    {
      id: 1,
      title: "집에서",
      keyword: ["#ddd", "#kkfk"],
      description: "12345678",
      views: 100,
      likes: 1000,
      authorName: "김소희",
      imgURL:
        "https://image.msscdn.net/cms/v2/content/file_1756347169119_43077299_tdh8ah.jpg",
    },
    {
      id: 1,
      title: "집에서",
      keyword: ["#ddd", "#kkfk"],
      description: "12345678",
      views: 100,
      likes: 1000,
      authorName: "김소희",
      imgURL:
        "https://image.msscdn.net/cms/v2/content/file_1756347169119_43077299_tdh8ah.jpg",
    },
    {
      id: 1,
      title: "집에서",
      keyword: ["ddd", "kkfk"],
      description: "12345678",
      views: 100,
      likes: 1000,
      authorName: "김소희",
      imgURL:
        "https://image.msscdn.net/cms/v2/content/file_1756347169119_43077299_tdh8ah.jpg",
    },
  ]);

  return (
    <>
      <Flex alignItems="center" width="100%">
        <Flex width="fit-content" flexWrap="wrap" gap={24} height="fit-content">
          {datas.map((data) => (
            <Post
              title={data.title}
              authorName={data.authorName}
              keyword={data.keyword}
              views={data.views}
              likes={data.likes}
              imgURL={data.imgURL}
            />
          ))}
        </Flex>
      </Flex>

      {!isLogged && (
        <Overlay>
          <Modal>
            <Flex isColumn={true} width="100%" gap={20} alignItems="center">
              <img src={FullLogo} alt="OOTDrop" height={36} />
              <Text
                fontSize={20}
                fontWeight={400}
                color={`${colors.gray[500]}`}
              >
                로그인 후 더 많은 룩북을 확인해보세요
              </Text>
            </Flex>

            <KakaoButton>
              <img src={chat} />
              카카오 로그인
            </KakaoButton>
          </Modal>
        </Overlay>
      )}
    </>
  );
};

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const Modal = styled.div`
  width: 450px;
  background-color: #ffffff;
  border-radius: 20px;
  padding: 40px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 60px;
`;

const KakaoButton = styled.button`
  width: 100%;
  padding: 14px;
  background-color: #fee500;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;
