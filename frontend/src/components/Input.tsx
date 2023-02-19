import styled from "styled-components";
const Field = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const Input = styled.input`
  border: none;
  padding: 0.5rem 1rem;
  margin: 0.25rem;
  text-align: center;
  border-radius: 0.5rem;
  &:focus {
    outline: none;
  }
  &:disabled {
    background-color: #ffffff50;
    color: #000000;
  }
`;
const Label = styled.label`
  font-weight: 700;
`;
interface InputProps {
  refInput?: React.RefObject<HTMLInputElement>;
  label?: string;
  type?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  name?: string;
  id?: string;
  className?: string;
  disabled?: boolean;
}

export default function StyledInput({
  refInput,
  label,
  type,
  value,
  onChange,
  onBlur,
  placeholder,
  name,
  id,
  className,
  disabled,
}: InputProps) {
  return (
    <Field>
      {label && <Label htmlFor={id}>{label}</Label>}
      <Input
        ref={refInput}
        className={className ? className : ""}
        type={type}
        defaultValue={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        name={name}
        id={id}
        disabled={disabled}
      />
    </Field>
  );
}
