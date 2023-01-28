import styled from "styled-components";

export default function StyledButton({
  label,
  onClick,
  className,
}: ButtonProps) {
  const Button = styled.button`
    border: none;
    padding: 0.5rem 1rem;
    margin: 0.25rem;
    text-align: center;
    border-radius: 0.5rem;
  `;

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
