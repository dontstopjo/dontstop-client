import styled from '@emotion/styled';
import { useState } from 'react';
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
import { mainStyles, mainStyleToApi, subStyleToApi } from '../types/styleType';
import { Button } from '../components/Button';
import { Plus } from '../assets';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../apis/posts';

const IMG_COUNT = 4;

export const CreateViewPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

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
  const [_mainStyleSelected, setMainStyleSelected] = useState<string>('');
  const [subStyleSelected, setSubStyleSelected] = useState<string[]>([]);

  const createMutation = useMutation({
    mutationFn: () => {
      const validFiles = files.filter((f): f is File => f !== null);
      const links = (datas.link ?? []).map((item) => ({
        category: item.keyword || 'TOP',
        description: item.title,
        link: item.link,
      }));
      return createPost({
        title: datas.title,
        content: datas.description,
        mainStyle: mainStyleToApi[datas.mainKeyword as keyof typeof mainStyleToApi] ?? datas.mainKeyword,
        subStyles: (datas.subkeyword ?? []).map((s) => subStyleToApi[s] ?? s),
        links,
        isPublic: !datas.isPrivate,
        files: validFiles,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      navigate('/');
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
    setDatas((prev) => {
      const next = [...(prev.img ?? [])] as File[];
      next[index] = file;
      return { ...prev, img: next };
    });
  };

  const handleImageDelete = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index).concat([null]));
    setPreviews((prev) => prev.filter((_, i) => i !== index).concat([null]));
    setDatas((prev) => {
      const next = (prev.img ?? []).filter((_, i) => i !== index);
      return { ...prev, img: next };
    });
  };

  const handleMainStyleChange = (value: string) => {
    setMainStyleSelected(value);
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
          <Button onClick={() => createMutation.mutate()}>게시</Button>
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
