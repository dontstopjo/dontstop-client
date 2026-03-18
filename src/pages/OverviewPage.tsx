import { useState } from 'react';
import Post from '../components/Post';
import type { PostSchemaType } from '../types';
import { Flex } from '../styles/theme';
import Input from '../components/Input';

export const OverviewPage = () => {
  const [datas, setDatas] = useState<PostSchemaType[]>([
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
      keyword: ['ddd', 'kkfk'],
      description: '12345678',
      views: 100,
      likes: 1000,
      authorName: '김소희',
      imgURL:
        'https://image.msscdn.net/cms/v2/content/file_1756347169119_43077299_tdh8ah.jpg',
    },
  ]);

  const [searchValue, setSearchValue] = useState<string>('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  return (
    <Flex
      paddingTop="28px"
      paddingLeft="28px"
      paddingRight="28px"
      alignItems="center"
      isColumn
      gap={28}
      width="100%"
    >
      <Input
        value={searchValue}
        onChange={handleSearchChange}
        type="search"
        placeholder="검색..."
      />
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
  );
};
