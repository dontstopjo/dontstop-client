import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import {
  DropDown,
  ImgSelector,
  SubStyleSelector,
  TextArea,
  Toggle,
} from '../components';
import type { CreatePostSchemaType } from '../types';
import { colors, Flex, Text } from '../styles/theme';
import { Input } from '../components/Input';
import { mainStyles } from '../types/styleType';
import { Button } from '../components/Button';
import { Plus } from '../assets';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { getPostDetail, updatePost } from '../apis/posts';

const IMG_COUNT = 4;

export const EditViewPage = () => {
  const { id } = useParams<{ id: string }>();
  const postId = Number(id);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: post } = useQuery({
    queryKey: ['posts', postId],
    queryFn: () => getPostDetail(postId),
    enabled: !!postId,
  });

  const [datas, setDatas] = useState<CreatePostSchemaType>({
    img: [],
    title: '',
    description: '',
    mainKeyword: '',
    subkeyword: [],
    link: [{ id: crypto.randomUUID(), title: '', link: '', keyword: '' }],
    isPrivate: false,
  });

  const [files, setFiles] = useState<(File | null)[]>(Array(IMG_COUNT).fill(null));
  const [previews, setPreviews] = useState<(string | null)[]>(Array(IMG_COUNT).fill(null));
  const [subStyleSelected, setSubStyleSelected] = useState<string[]>([]);

  // 기존 게시글 데이터 세팅
  useEffect(() => {
    if (post) {
      setDatas({
        img: post.imageURLs,
        title: post.title,
        description: post.content,
        mainKeyword: post.mainStyle,
        subkeyword: post.subStyles,
        link: post.links.length > 0
          ? post.links.map((l) => ({
              id: crypto.randomUUID(),
              title: l.description,
              link: l.link,
              keyword: l.category,
            }))
          : [{ id: crypto.randomUUID(), title: '', link: '', keyword: '' }],
        isPrivate: false,
      });
      setSubStyleSelected(post.subStyles);
      setPreviews(
        post.imageURLs
          .slice(0, IMG_COUNT)
          .concat(Array(IMG_COUNT).fill(null))
          .slice(0, IMG_COUNT),
      );
    }
  }, [post]);

  const updateMutation = useMutation({
    mutationFn: () => {
      const validFiles = files.filter((f): f is File => f !== null);
      const existingImageURLs = (post?.imageURLs ?? []).map((url, i) => ({
        url,
        order: i,
      }));
      const newFileOrders = validFiles.map((_, i) => existingImageURLs.length + i);
      const links = (datas.link ?? []).map((item) => ({
        category: item.keyword || 'TOP',
        description: item.title,
        link: item.link,
      }));
      return updatePost({
        postId,
        title: datas.title,
        content: datas.description,
        mainStyle: datas.mainKeyword,
        subStyles: datas.subkeyword ?? [],
        links,
        isPublic: !datas.isPrivate,
        files: validFiles,
        imageURLs: existingImageURLs,
        newFileOrders,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['posts', postId] });
      navigate(`/detail/${postId}`);
    },
  });

  const handleImageAdd = (index: number, file: File, preview: string) => {
    setFiles((prev) => {
      const next = [...prev];
      next[index] = file;
      return next;
    });
    setPreviews((prev) => {
      const next = [...prev];
      next[index] = preview;
      return next;
    });
  };

  const handleImageDelete = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index).concat([null]));
    setPreviews((prev) => prev.filter((_, i) => i !== index).concat([null]));
  };

  const handleMainStyleChange = (value: string) => {
    setDatas((prev) => ({ ...prev, mainKeyword: value }));
  };

  const handleSubStyleChange: React.Dispatch<React.SetStateAction<string[]>> = (value) => {
    const next = typeof value === 'function' ? value(subStyleSelected) : value;
    setSubStyleSelected(next);
    setDatas((prev) => ({ ...prev, subkeyword: next }));
  };

  const handleInputChange = (name: string, e: string) => {
    setDatas((prev) => ({ ...prev, [name]: e }));
  };

  const handleTextAreaChange = (name: string, e: string) => {
    setDatas((prev) => ({ ...prev, [name]: e }));
  };

  const handleLinkChange = (id: string, field: 'title' | 'link', value: string) => {
    setDatas((prev) => ({
      ...prev,
      link: (prev.link ?? []).map((item) =>
        item.id === id ? { ...item, [field]: value } : item,
      ),
    }));
  };

  const handleLinkAdd = () => {
    setDatas((prev) => ({
      ...prev,
      link: [
        ...(prev.link ?? []),
        { id: crypto.randomUUID(), title: '', link: '', keyword: '' },
      ],
    }));
  };

  const handleLinkDelete = (id: string) => {
    setDatas((prev) => ({
      ...prev,
      link: (prev.link ?? []).filter((item) => item.id !== id),
    }));
  };

  return (
    <Flex isColumn width="100%" gap={80}>
      <Flex alignItems="center" gap={32} width="100%" justifyContent="end">
        <Toggle
          label="비공개"
          onChange={(value) => setDatas((prev) => ({ ...prev, isPrivate: value }))}
        />
        <Flex alignItems="center" gap={8}>
          <Button onClick={() => updateMutation.mutate()}>수정</Button>
          <Button backgroundColor={colors.gray[50]} color={colors.gray[900]} onClick={() => navigate(-1)}>
            이전
          </Button>
        </Flex>
      </Flex>
      <Flex width="100%" isColumn gap={40} alignItems="center">
        <Flex gap={32}>
          {Array.from({ length: IMG_COUNT }, (_, i) => (
            <ImgSelector
              key={i}
              index={i}
              preview={previews[i]}
              onAdd={handleImageAdd}
              onDelete={handleImageDelete}
            />
          ))}
        </Flex>
        <Flex isColumn width="100%" gap={52}>
          <Input
            type="text"
            onChange={(e) => handleInputChange('title', e.target.value)}
            label="제목"
            placeholder="제목을 입력하세요"
            value={datas.title}
          />
          <TextArea
            label="설명"
            placeholder="설명을 입력하세요"
            value={datas.description}
            onChange={(e) => handleTextAreaChange('description', e.target.value)}
          />
          <DropDown
            options={mainStyles}
            label="메인스타일"
            onChange={handleMainStyleChange}
          />
          <SubStyleSelector
            selectedSubs={subStyleSelected}
            setSelectedSubs={handleSubStyleChange}
          />
          <Flex isColumn gap={12} width="100%">
            <Text fontSize={16} color={colors.gray[900]}>
              룩 정보
            </Text>
            <Flex isColumn gap={10} width="100%">
              {(datas.link ?? []).map((item) => (
                <Flex key={item.id} gap={10} width="100%" alignItems="center">
                  <Input
                    width="327px"
                    placeholder="룩정보명을 입력하세요"
                    value={item.title}
                    onChange={(e) => handleLinkChange(item.id, 'title', e.target.value)}
                  />
                  <Input
                    placeholder="링크를 입력하세요"
                    value={item.link}
                    onChange={(e) => handleLinkChange(item.id, 'link', e.target.value)}
                  />
                  {(datas.link ?? []).length > 1 && (
                    <DeleteButton onClick={() => handleLinkDelete(item.id)}>✕</DeleteButton>
                  )}
                </Flex>
              ))}
            </Flex>
            <Button width="100%" onClick={handleLinkAdd}>
              <img src={Plus} alt="plus" />
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

const DeleteButton = styled.button`
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background-color: ${colors.gray[100]};
  color: ${colors.gray[500]};
  font-size: 13px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.15s, color 0.15s;

  &:hover {
    background-color: ${colors.gray[200]};
    color: ${colors.gray[900]};
  }
`;
