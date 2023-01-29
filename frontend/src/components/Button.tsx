import styled from "styled-components";
const Button = styled.button`
  border: none;
  padding: 0.5rem 1rem;
  margin: 0.25rem;
  text-align: center;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
  }
`;
export default function StyledButton({
  label,
  onClick,
  className,
}: ButtonProps) {
  return (
    <Button className={className ? className : ""} onClick={onClick}>
      {label}
    </Button>
  );
}

interface ButtonProps {
  label?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}
