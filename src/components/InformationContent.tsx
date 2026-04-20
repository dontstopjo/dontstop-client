import styled from '@emotion/styled';
import { colors, Flex, Text } from '../styles/theme';
import { link } from '../assets';
import type { FashionLinkType } from '../types';

const categoryKo: Record<string, string> = {
  TOP: '상의',
  BOTTOM: '하의',
  OUTERWEAR: '아우터',
  LAYERING: '레이어링',
  HAT: '모자',
  SHOES: '신발',
  BAG: '가방',
  ACCESSORY: '악세서리',
  MAKEUP: '메이크업',
};

export const InformationContent = ({
  description,
  link: linkUrl,
  category,
  imageURL,
}: FashionLinkType) => {
  return (
    <Flex isColumn gap={10}>
      {imageURL ? <ImgWrapper src={imageURL} /> : <NotImgWrapper />}
      <Flex isColumn gap={4}>
        {category && (
          <CategoryBadge>{categoryKo[category] ?? category}</CategoryBadge>
        )}
        <Text fontSize={15} fontWeight={700} color={colors.gray[900]}>
          {description}
        </Text>
      </Flex>
      <Flex gap={6} alignItems="center">
        <img src={link} alt="link-img" />
        <Link href={linkUrl} target="_blank" rel="noopener noreferrer">
          {linkUrl}
        </Link>
      </Flex>
    </Flex>
  );
};

const Link = styled.a`
  font-size: 12px;
  font-weight: 500;
  color: ${colors.gray[600]};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 180px;
  text-decoration: none;

  &:hover {
    color: ${colors.gray[900]};
    text-decoration: underline;
  }
`;

const ImgWrapper = styled.img`
  width: 207px;
  height: 207px;
  background-color: ${colors.gray[100]};
  border-radius: 20px;
  border: 1px solid ${colors.gray[50]};
  object-fit: cover;
`;

const NotImgWrapper = styled.div`
  width: 207px;
  height: 207px;
  background-color: ${colors.gray[100]};
  border-radius: 20px;
`;

const CategoryBadge = styled.div`
  display: inline-flex;
  padding: 3px 10px;
  border-radius: 99px;
  background-color: ${colors.gray[100]};
  font-size: 12px;
  font-weight: 500;
  color: ${colors.gray[600]};
  width: fit-content;
`;
