import styled from '@emotion/styled';
import { colors, Flex, Text } from '../styles/theme';
import { link } from '../assets';
import type { FashionLinkType } from '../types';

export const InformationContent = ({
  description,
  link: linkUrl,
  imageURL,
}: FashionLinkType) => {
  return (
    <Flex isColumn gap={8}>
      {imageURL ? <ImgWrapper src={imageURL} /> : <NotImgWrapper />}
      <Text fontSize={16} fontWeight={700} color={colors.gray[900]}>
        {description}
      </Text>
      <Flex gap={6} alignItems="center">
        <img src={link} alt="link-img" />
        <Link href={linkUrl} target="_blank">
          {linkUrl}
        </Link>
      </Flex>
    </Flex>
  );
};

const Link = styled.a`
  font-size: 12px;
  font-weight: 500;
  color: ${colors.gray[900]};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 180px;
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
