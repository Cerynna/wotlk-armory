import styled from "styled-components";
const Button = styled.button`
  border: none;
  padding: 0.5rem 1rem;
  text-align: center;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
  }
  &[data-size="large"] {
    width: 100%;
  }
`;
interface ButtonProps {
  label?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  size?: string;
}

export default function StyledButton({
  label,
  onClick,
  className,
  size = "normal",
}: ButtonProps) {
  return (
    <Button
      className={className ? className : ""}
      onClick={onClick}
      data-size={size}
    >
      {label}
    </Button>
  );
}
