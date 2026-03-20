import styled from "@emotion/styled";
import search_icon from "../assets/searchIcon.svg";
import { colors } from "../styles/theme";

interface InputType {
  placeholder: string;
  type: "text" | "search";
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  className?: string;
  value: string;
  isTextarea?: boolean;
}

const Input = ({ placeholder, type, onChange, className, value, isTextarea }: InputType) => {
  return (
    <InputContainer className={className}>
      {type == "search" && <SearchIcon src={search_icon} alt="검색" />}
      {isTextarea ? (
        <StyledTextarea placeholder={placeholder} onChange={onChange} value={value} />
      ) : (
        <StyledInput placeholder={placeholder} onChange={onChange as (e: React.ChangeEvent<HTMLInputElement>) => void} value={value} />
      )}
    </InputContainer>
  );
};

const InputContainer = styled.div`
  width: 100%;
  font-size: 16px;
  color: ${colors.gray[900]};
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

const StyledTextarea = styled.textarea`
  width: 100%;
  height: 100%;
  background: none;
  border: none;
  resize: none;
  :focus {
    outline: none;
  }
  ::placeholder {
    color: ${colors.gray[500]};
  }
  font-size: 1em;
  color: ${colors.gray[900]};
`;

export default Input;
