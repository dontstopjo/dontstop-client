import styled from "@emotion/styled";
import { colors } from "../styles/theme";

interface ButtonType {
  children: string;
  onClick?: () => void;
  backgroundColor?: string;
  color?: string;
}

export const Button = ({
  children,
  onClick,
  color = colors.gray[50],
  backgroundColor = colors.gray[900],
}: ButtonType) => {
  return (
    <StyledButton
      onClick={onClick}
      color={color}
      backgroundColor={backgroundColor}
    >
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button<Omit<ButtonType, "onClick" | "children">>`
  padding: 12px 30px;
  font-size: 16px;
  border-radius: 12px;
  font-weight: 500;
  cursor: pointer;

  color: ${({ color }) => color};
  background-color: ${({ backgroundColor }) => backgroundColor};
`;
