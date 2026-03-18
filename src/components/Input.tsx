import styled from '@emotion/styled';
import search_icon from '../assets/searchIcon.svg';

interface InputType {
  placeholder: string;
  type: 'text' | 'search';
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  value: string;
}

const Input = ({ placeholder, type, onChange, className }: InputType) => {
  return (
    <InputContainer className={className}>
      {type == 'search' && <SearchIcon src={search_icon} alt="검색" />}
      <StyledInput
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </InputContainer>
  );
};

const InputContainer = styled.div`
  width: 100%;
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
  font-size: 1em;
  color: #707070;
`;

export default Input;
