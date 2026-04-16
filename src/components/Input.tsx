import styled from '@emotion/styled';
import search_icon from '../assets/searchIcon.svg';
import { colors, Flex, Text } from '../styles/theme';

interface InputType {
  placeholder: string;
  type?: "text" | "search";
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  className?: string;
  value: string;
  label?: string;
  width?: string;
}

export const Input = ({
  label,
  placeholder,
  type,
  onChange,
  onKeyDown,
  className,
  width,
  value,
}: InputType) => {
  return (
    <Flex isColumn gap={8} width={width ? width : '100%'}>
      <Text fontSize={16} color={colors.gray[900]}>
        {label}
      </Text>
      <InputContainer width={width} className={className}>
        {type == 'search' && <SearchIcon src={search_icon} alt="검색" />}
        <StyledInput
          placeholder={placeholder}
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={value}
        />
      </InputContainer>
    </Flex>
  );
};

const InputContainer = styled.div<{ width: string | undefined }>`
  width: ${({ width }) => (width ? width : '100%')};
  font-size: 16px;
  background-color: #eeeded;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px;
`;

const SearchIcon = styled.img`
  width: 1.2em;
  height: 1.2em;
`;

const StyledInput = styled.input`
  width: 100%;
  height: 100%;
  background: none;
  border: none;
  :focus {
    outline: none;
  }
  ::placeholder {
    color: ${colors.gray[500]};
  }
  font-size: 1em;
  color: ${colors.gray[900]};
`;
