import styled from "@emotion/styled";
import { colors } from "../styles/theme";

interface ButtonType {
  children: React.ReactNode;
  onClick?: () => void;
  backgroundColor?: string;
  color?: string;
  width?: string;
}

export const Button = ({
  children,
  onClick,
  color = colors.gray[50],
  backgroundColor = colors.gray[900],
  width,
}: ButtonType) => {
  return (
    <StyledButton
      onClick={onClick}
      color={color}
      backgroundColor={backgroundColor}
      width={width}
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
  width: ${({ width }) => width ?? width};

  color: ${({ color }) => color};
  background-color: ${({ backgroundColor }) => backgroundColor};
`;
