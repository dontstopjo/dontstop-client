import { useState } from "react";
import styled from "@emotion/styled";
import { colors, Flex, Text } from "../styles/theme";
import profile from "../assets/profile.svg";
import update_icon from "../assets/update_icon.svg";
import Post from "../components/Post";
import type { PostSchemaType } from "../types";

type LookbookTab = "saved" | "public" | "private";

const tabs: { key: LookbookTab; label: string }[] = [
  { key: "saved", label: "저장한 룩북" },
  { key: "public", label: "나의 공개 룩북" },
  { key: "private", label: "나의 비공개 룩북" },
];

export const Mypage = () => {
  const [activeTab, setActiveTab] = useState<LookbookTab>("saved");

  // TODO: API 연동 시 activeTab에 따라 데이터 fetch
  // ex) useEffect(() => { fetchLookbooks(activeTab); }, [activeTab]);

  const isMine = true;

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
    <Flex width="100%" isColumn={true} paddingTop="62px" gap={72}>
      <Flex gap={40} alignItems="center">
        <Profile>
          <img src={profile} alt="프로필" />
          <UpdateButton>
            <img src={update_icon} alt="프로필 수정" />
          </UpdateButton>
        </Profile>

        <Flex isColumn={true} gap={12}>
          <Text fontSize={24} fontWeight={600}>
            라면왕 슈
          </Text>
          <Text fontSize={20} fontWeight={400} color={`${colors.gray[500]}`}>
            안녕하세요. 전 패셔니스타 슈에요
          </Text>
        </Flex>
      </Flex>

      <Flex isColumn={true} gap={24}>
        <Text fontSize={24} fontWeight={600} color={`${colors.gray[900]}`}>
          룩북 컬렉션
        </Text>

        {isMine && (
          <Flex gap={20} alignItems="center">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.key;
              return (
                <Flex
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  paddingTop="8px"
                  paddingBottom="8px"
                  paddingLeft="18px"
                  paddingRight="18px"
                  borderRadius="12px"
                  backgroundColor={isActive ? colors.gray[100] : "transparent"}
                  style={{
                    cursor: "pointer",
                    transition: "background-color 0.2s ease",
                  }}
                >
                  <Text fontSize={20} fontWeight={500} color={colors.gray[900]}>
                    {tab.label}
                  </Text>
                </Flex>
              );
            })}
          </Flex>
        )}

        <Flex alignItems="center" width="100%">
          <Flex
            width="fit-content"
            flexWrap="wrap"
            gap={24}
            height="fit-content"
          >
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
      </Flex>
    </Flex>
  );
};

const Profile = styled.div`
  width: 110px;
  height: 110px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.gray[100]};
  border-radius: 100%;
  position: relative;
`;
const UpdateButton = styled.button`
  width: 27px;
  height: 27px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.gray[200]};
  border-radius: 100%;
  position: absolute;
  bottom: 4px;
  right: 4px;
`;
