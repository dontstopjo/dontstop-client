import styled from '@emotion/styled';
import { colors, Flex, Text } from '../styles/theme';
import type { CommentSchemaType } from '../types';

export const CommentContent = ({
  authorName,
  comment,
  img,
}: CommentSchemaType) => {
  return (
    <Flex gap={12}>
      <ProfileContent src={img} alt={authorName}></ProfileContent>
      <Flex isColumn gap={12}>
        <Text fontSize={16} fontWeight={600} color={colors.gray[1000]}>
          {authorName}
        </Text>
        <Text fontSize={16} fontWeight={500} color={colors.gray[900]}>
          {comment}
        </Text>
      </Flex>
    </Flex>
  );
};

const ProfileContent = styled.img`
  width: 28px;
  height: 28px;
  border-radius: 14px;
  background-color: ${colors.gray[400]};
`;
