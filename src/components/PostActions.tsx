import { Eye, HeartButton, SaveButton } from '../assets';
import { colors, Flex, Text } from '../styles/theme';

interface PostActionsType {
  id?: number;
  type: 'heart' | 'save' | 'eye';
  number: number;
}

export const PostActions = ({ number, id, type }: PostActionsType) => {
  const handleHeartClick = () => {
    //하트 수정 api
    console.log(id);
  };

  const handleSaveClick = () => {
    //저장 수정 api
  };

  //isClick은 데이터 받아오는거 api 보내기
  return (
    <Flex isColumn gap={0} alignItems="center">
      {type === 'heart' && <HeartButton onClick={handleHeartClick} />}
      {type === 'save' && <SaveButton onClick={handleSaveClick} />}
      {type === 'eye' && <Eye />}
      <Text fontSize={8} fontWeight={600} color={colors.gray[500]}>
        {number}
      </Text>
    </Flex>
  );
};
