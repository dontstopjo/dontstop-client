import { Eye, HeartButton, SaveButton } from '../assets';
import { colors, Flex, Text } from '../styles/theme';

interface PostActionsType {
  postId?: number;
  type: 'heart' | 'save' | 'eye';
  number: number;
  isActive?: boolean;
  onToggle?: () => void;
}

export const PostActions = ({ number, postId, type, isActive, onToggle }: PostActionsType) => {
  return (
    <Flex isColumn gap={0} alignItems="center">
      {type === 'heart' && <HeartButton onClick={onToggle} isActive={isActive} />}
      {type === 'save' && <SaveButton onClick={onToggle} isActive={isActive} />}
      {type === 'eye' && <Eye />}
      <Text fontSize={8} fontWeight={600} color={colors.gray[500]}>
        {number}
      </Text>
    </Flex>
  );
};
