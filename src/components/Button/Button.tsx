import { FC } from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  width: 100%;
  padding: 10px 20px;
  cursor: pointer;
  outline: none;
  transition: background-color var(--transition-200);

  &:hover,
  &:focus-visible {
    background-color: var(--color-active);
  }
`;

type ButtonProps = {
  children: string;
  onClick?: () => void;
}

const Button: FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <StyledButton onClick={onClick}>
      {children}
    </StyledButton>
  )
}

export default Button;