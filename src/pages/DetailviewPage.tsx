import styled from '@emotion/styled';
import { colors, Flex, Text } from '../styles/theme';
import { useState } from 'react';
import type {
  CommentSchemaType,
  InformationSchemaType,
  PostSchemaType,
} from '../types';
import Input from '../components/Input';
import { CommentContent, InformationContent } from '../components';
import Post from '../components/Post';
import { SendIcon } from '../assets';

export const DetailviewPage = () => {
  const [datas, setDatas] = useState<PostSchemaType>({
    id: 1,
    title: '집에서',
    keyword: ['#ddd', '#kkfk'],
    description: '12345678',
    views: 100,
    likes: 1000,
    authorName: '김소희',
    imgURL:
      'https://image.msscdn.net/cms/v2/content/file_1756347169119_43077299_tdh8ah.jpg',
  });

  const [commentValue, setCommentValue] = useState<string>('');

  const [commentDatas, setCommentDatas] = useState<CommentSchemaType[]>([
    {
      id: 1,
      authorName: '김소희',
      comment: '안녕하세요',
      img: '',
    },
    {
      id: 1,
      authorName: '김소희',
      comment: '안녕하세요',
      img: '',
    },
  ]);

  const [outfitInfoDatas, setOutfitInfoDatas] = useState<
    InformationSchemaType[]
  >([
    {
      id: 1,
      title: '상의',
      linkUrl: 'https://applink.a-bly.com/pjb6on',
      img: 'https://d3ha2047wt6x28.cloudfront.net/b5uU3LiEIOI/pr:GOODS_DETAIL/czM6Ly9hYmx5LWltYWdlLWxlZ2FjeS9kYXRhL2dvb2RzLzIwMjUxMjI5XzE3NjcwMTU2NDc3Mjk3NTFtLmpwZWc',
    },
    {
      id: 1,
      title: '상의',
      linkUrl: 'https://applink.a-bly.com/pjb6on',
      img: 'https://d3ha2047wt6x28.cloudfront.net/b5uU3LiEIOI/pr:GOODS_DETAIL/czM6Ly9hYmx5LWltYWdlLWxlZ2FjeS9kYXRhL2dvb2RzLzIwMjUxMjI5XzE3NjcwMTU2NDc3Mjk3NTFtLmpwZWc',
    },
    {
      id: 1,
      title: '상의',
      linkUrl: 'https://applink.a-bly.com/pjb6on',
      img: 'https://d3ha2047wt6x28.cloudfront.net/b5uU3LiEIOI/pr:GOODS_DETAIL/czM6Ly9hYmx5LWltYWdlLWxlZ2FjeS9kYXRhL2dvb2RzLzIwMjUxMjI5XzE3NjcwMTU2NDc3Mjk3NTFtLmpwZWc',
    },
    {
      id: 1,
      title: '상의',
      linkUrl: 'https://applink.a-bly.com/pjb6on',
      img: 'https://d3ha2047wt6x28.cloudfront.net/b5uU3LiEIOI/pr:GOODS_DETAIL/czM6Ly9hYmx5LWltYWdlLWxlZ2FjeS9kYXRhL2dvb2RzLzIwMjUxMjI5XzE3NjcwMTU2NDc3Mjk3NTFtLmpwZWc',
    },
    {
      id: 1,
      title: '상의',
      linkUrl: 'https://applink.a-bly.com/pjb6on',
      img: 'https://d3ha2047wt6x28.cloudfront.net/b5uU3LiEIOI/pr:GOODS_DETAIL/czM6Ly9hYmx5LWltYWdlLWxlZ2FjeS9kYXRhL2dvb2RzLzIwMjUxMjI5XzE3NjcwMTU2NDc3Mjk3NTFtLmpwZWc',
    },
  ]);

  const [anotherPostdatas, setAnotherPostDatas] = useState<PostSchemaType[]>([
    {
      id: 1,
      title: '집에서',
      keyword: ['ddd', 'kkfk'],
      description: '12345678',
      views: 100,
      likes: 1000,
      authorName: '김소희',
      imgURL:
        'https://image.msscdn.net/cms/v2/content/file_1756347169119_43077299_tdh8ah.jpg',
    },
    {
      id: 1,
      title: '집에서',
      keyword: ['#ddd', '#kkfk'],
      description: '12345678',
      views: 100,
      likes: 1000,
      authorName: '김소희',
      imgURL:
        'https://image.msscdn.net/cms/v2/content/file_1756347169119_43077299_tdh8ah.jpg',
    },
    {
      id: 1,
      title: '집에서',
      keyword: ['#ddd', '#kkfk'],
      description: '12345678',
      views: 100,
      likes: 1000,
      authorName: '김소희',
      imgURL:
        'https://image.msscdn.net/cms/v2/content/file_1756347169119_43077299_tdh8ah.jpg',
    },
    {
      id: 1,
      title: '집에서',
      keyword: ['#ddd', '#kkfk'],
      description: '12345678',
      views: 100,
      likes: 1000,
      authorName: '김소희',
      imgURL:
        'https://image.msscdn.net/cms/v2/content/file_1756347169119_43077299_tdh8ah.jpg',
    },
    {
      id: 1,
      title: '집에서',
      keyword: ['#ddd', '#kkfk'],
      description: '12345678',
      views: 100,
      likes: 1000,
      authorName: '김소희',
      imgURL:
        'https://image.msscdn.net/cms/v2/content/file_1756347169119_43077299_tdh8ah.jpg',
    },
    {
      id: 1,
      title: '집에서',
      keyword: ['#ddd', '#kkfk'],
      description: '12345678',
      views: 100,
      likes: 1000,
      authorName: '김소희',
      imgURL:
        'https://image.msscdn.net/cms/v2/content/file_1756347169119_43077299_tdh8ah.jpg',
    },
    {
      id: 1,
      title: '집에서',
      keyword: ['#ddd', '#kkfk'],
      description: '12345678',
      views: 100,
      likes: 1000,
      authorName: '김소희',
      imgURL:
        'https://image.msscdn.net/cms/v2/content/file_1756347169119_43077299_tdh8ah.jpg',
    },
    {
      id: 1,
      title: '집에서',
      keyword: ['#ddd', '#kkfk'],
      description: '12345678',
      views: 100,
      likes: 1000,
      authorName: '김소희',
      imgURL:
        'https://image.msscdn.net/cms/v2/content/file_1756347169119_43077299_tdh8ah.jpg',
    },
    {
      id: 1,
      title: '집에서',
      keyword: ['#ddd', '#kkfk'],
      description: '12345678',
      views: 100,
      likes: 1000,
      authorName: '김소희',
      imgURL:
        'https://image.msscdn.net/cms/v2/content/file_1756347169119_43077299_tdh8ah.jpg',
    },
    {
      id: 1,
      title: '집에서',
      keyword: ['#ddd', '#kkfk'],
      description: '12345678',
      views: 100,
      likes: 1000,
      authorName: '김소희',
      imgURL:
        'https://image.msscdn.net/cms/v2/content/file_1756347169119_43077299_tdh8ah.jpg',
    },
    {
      id: 1,
      title: '집에서',
      keyword: ['#ddd', '#kkfk'],
      description: '12345678',
      views: 100,
      likes: 1000,
      authorName: '김소희',
      imgURL:
        'https://image.msscdn.net/cms/v2/content/file_1756347169119_43077299_tdh8ah.jpg',
    },
    {
      id: 1,
      title: '집에서',
      keyword: ['#ddd', '#kkfk'],
      description: '12345678',
      views: 100,
      likes: 1000,
      authorName: '김소희',
      imgURL:
        'https://image.msscdn.net/cms/v2/content/file_1756347169119_43077299_tdh8ah.jpg',
    },
    {
      id: 1,
      title: '집에서',
      keyword: ['#ddd', '#kkfk'],
      description: '12345678',
      views: 100,
      likes: 1000,
      authorName: '김소희',
      imgURL:
        'https://image.msscdn.net/cms/v2/content/file_1756347169119_43077299_tdh8ah.jpg',
    },
    {
      id: 1,
      title: '집에서',
      keyword: ['#ddd', '#kkfk'],
      description: '12345678',
      views: 100,
      likes: 1000,
      authorName: '김소희',
      imgURL:
        'https://image.msscdn.net/cms/v2/content/file_1756347169119_43077299_tdh8ah.jpg',
    },
  ]);

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentValue(e.target.value);
  };

  return (
    <Flex gap={70}>
      <ContentWrapper>
        <ImgWrapper />
        <Flex isColumn gap={24}>
          <Flex isColumn gap={12}>
            <Flex alignItems="center" gap={12}>
              <ProfileContent></ProfileContent>
              <Text fontSize={16} fontWeight={600} color={colors.gray[1000]}>
                {datas.authorName}
              </Text>
            </Flex>
            <Flex
              width="100%"
              justifyContent="space-between"
              alignItems="center"
            >
              <Text fontSize={20} fontWeight={600}>
                {datas.title}
              </Text>
            </Flex>
            <Text fontSize={16} fontWeight={400} color={colors.gray[400]}>
              {datas.description}
            </Text>
          </Flex>
          <Flex gap={12}>
            {datas.keyword.map((data) => (
              <Text fontSize={14} fontWeight={600} color={colors.gray[800]}>
                #{data}
              </Text>
            ))}
          </Flex>
        </Flex>
        <CommentWrapper>
          <Flex gap={8} alignItems="center">
            <Input
              onChange={handleCommentChange}
              value={commentValue}
              type="text"
              placeholder="댓글을 입력하세요.."
            />
            <SendButton>
              <img src={SendIcon} alt="send" />
            </SendButton>
          </Flex>
          <Flex isColumn gap={20}>
            {commentDatas.map((data) => (
              <CommentContent
                key={data.id}
                authorName={data.authorName}
                comment={data.comment}
                img={data.img}
              />
            ))}
          </Flex>
        </CommentWrapper>
        <Flex gapX={44} gapY={28} width="100%" flexWrap="wrap">
          {outfitInfoDatas.map((data) => (
            <InformationContent
              title={data.title}
              img={data.img}
              key={data.id}
              linkUrl={data.linkUrl}
            />
          ))}
        </Flex>
      </ContentWrapper>
      <Flex>
        <Flex width="fit-content" flexWrap="wrap" gap={24} height="fit-content">
          {anotherPostdatas.map((data) => (
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
  );
};

const SendButton = styled.button`
  min-width: 47px;
  height: 47px;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.gray[900]};
  cursor: pointer;
`;

const CommentWrapper = styled.div`
  width: 100%;
  border-radius: 16px;
  background-color: ${colors.gray[50]};
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const ProfileContent = styled.img`
  width: 28px;
  height: 28px;
  border-radius: 14px;
  background-color: ${colors.gray[400]};
`;

const ImgWrapper = styled.img`
  width: 461px;
  height: 615px;
  border-radius: 20px;
  background-color: ${colors.gray[100]};
`;

const ContentWrapper = styled.div`
  width: fit-content;
  padding: 36px 60px;
  max-width: 584px;
  width: 100%;
  border-radius: 40px;
  border: 1px solid ${colors.gray[100]};
  background-color: ${colors.gray[0]};
  display: flex;
  flex-direction: column;
  gap: 40px;
`;
