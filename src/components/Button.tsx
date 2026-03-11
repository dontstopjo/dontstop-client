import styled from "@emotion/styled";

interface ButtonType {
  text: string;
  isActive: boolean;
  onClick: () => void;
  className?: string;
}

const Button = ({ text, isActive, onClick, className }: ButtonType) => {
  return (
    <StyledButton
      isActive={isActive}
      onClick={isActive ? onClick : undefined}
      className={className}
    >
      {text}
    </StyledButton>
  );
};

const StyledButton = styled.button<{ isActive: boolean }>`
  width: 100%;
  height: 100%;
  font-size: 1em;
  border-radius: 10px;
  transition: opacity 0.2s;
  font-weight: 700;

  ${({ isActive }) =>
    isActive
      ? `
    background-color: #ffffff;
    color: #616161;
    border: 1.5px solid #616161;
    cursor: pointer;
    &:hover {
      opacity: 0.75;
    }
  `
      : `
    background-color: #CDCDCD;
    color: #ffffff;
    border: none;
    cursor: default;
  `}
`;

export default Button;
