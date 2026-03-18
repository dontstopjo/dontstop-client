import styled from '@emotion/styled';
import { colors, Flex, Text } from '../styles/theme';
import { link } from '../assets';
import type { InformationSchemaType } from '../types';

export const InformationContent = ({
  title,
  linkUrl,
  img,
}: InformationSchemaType) => {
  return (
    <Flex isColumn gap={8}>
      {img ? <ImgWrapper src={img} /> : <NotImgWrapper></NotImgWrapper>}
      <Text fontSize={16} fontWeight={700} color={colors.gray[900]}>
        {title}
      </Text>
      <Flex gap={6} alignItems="center">
        <img src={link} alt="link-img" />
        <Text fontSize={12} fontWeight={500} color={colors.gray[900]}>
          {linkUrl}
        </Text>
      </Flex>
    </Flex>
  );
};

const ImgWrapper = styled.img`
  width: 207px;
  height: 207px;
  background-color: ${colors.gray[100]};
  border-radius: 20px;
  border: 1px solid ${colors.gray[50]};
`;

const NotImgWrapper = styled.div`
  width: 207px;
  height: 207px;
  background-color: ${colors.gray[100]};
  border-radius: 20px;
`;
