import { useState } from 'react';
import Post from '../components/Post';
import type { PostSchemaType } from '../types';
import { Flex } from '../styles/theme';

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
  ]);

  return (
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
  );
};
